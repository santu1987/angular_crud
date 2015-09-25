angular.module("AngularApp")
//------------------------------------------------------------------------
//--Servicio para cargar imagenes...	
	.service("upload",["$http","$q",function ($http, $q)
	{
		//----------------------------------------------------------------
		this.uploadFile = function (file, name)
		{
			var deferred = $q.defer();
			var formData = new FormData();
			formData.append("name", name);
			formData.append("file",file);
			//--
			console.log("formData-nombre:"+formData.name+"formData-file:"+formData.file);
			//--
			return $http.post("../crud_angular/core/server.php", formData,{
				headers:{
							"Content-type": undefined
				},
				transformRequest : formData
			})
			.success(function(res){
				deferred.resolve(res);
			})
			.error(function(msg, code){
				deferred.reject(msg);
			})
			return deferred.promise;
		}
		//-----------------------------------------------------------------
	}])
//-------------------------------------------------------------------------	
//-- Para tipo de usuarios
	.factory("tipoUsFactory",['$http', function($http){
		return{
			cargar_tipos_us : function (callback){
				$http.post("./modulos/tipos_usuarios/tiposUsController.php",{ accion:'consultar' }).success(callback);		
			}
		}	
	}])
//--Para mensajes de la App	
	.factory("mensajesFactory",[function(){
		return {

					mensajeError : function(){
						mensaje = {
										'opcion':'',
										'resultado':'',
										'errores':'',
										'imagen':'fa fa-exclamation-circle',
										'tipo_alerta':'alert-danger'
									};
						return mensaje;			
					},
					mensajeSuccess : function(){
						mensaje = {
									'opcion':'',
									'resultado':'',
									'errores':'',
									'imagen':'fa fa-check',
									'tipo_alerta': 'alert-success'	
						};
						return mensaje;
					},
					pre_loader : function(){
						mensaje = {
									'opcion':'true',
									'resultado':'',
									'errores':'',
									'imagen':'fa fa-cog fa-spin',
									'tipo_alerta': 'alert-info'	
						};
						return mensaje			
				}
		}
	}])
//-- Para ubicaciones: Estados/municipios/parroquias...	
	.factory("ubicacionFactory",['$http', function($http){
		var id_estado ='';
		var id_municipio ='';
		return{
			valor_id_estado : function (id){
				if(id!="")
					id_estado = id;
			},
			valor_id_municipio : function (id){
				if(id!="")
					id_municipio = id;
			},
			cargar_estados : function (callback){
				$http.post("./modulos/estados/estadosController.php",{ accion:'consultar' }).success(callback);		
			},
			cargar_municipios : function (callback){
				$http.post("./modulos/municipios/municipiosController.php", { accion:'consultar', estado: id_estado}).success(callback);
			},
			cargar_parroquias : function(callback){
				$http.post("./modulos/parroquias/parroquiasController.php",{ accion:'consultar', municipio: id_municipio }).success(callback);
			}
		}
	}])
//--Para ejecutar métodos a un objeto...
	.factory("objetosFactory",[function(){
		return{
			size : function(obj) {
		    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			}
		}		
	}])	
//--Factoria para la paginación
	.factory("paginacionFactory",[function(){
	//--	
		return{
			//--Metodo para calcular limites de paginacion
			calculo_limites : function(offset,cuantos_son,tipo){
				
				inicio_tabla = offset;
				valor = offset+20;
				//--
				if(valor > cuantos_son){
					fin_tabla = cuantos_son;
				}else{
					fin_tabla = valor-1;
				}
				//--
				if(cuantos_son == 0){
					inicio_tabla = 0;
				}
				dic_tabla = {
								"inicio_tabla" : inicio_tabla,
								"fin_tabla" : fin_tabla
				}
				return dic_tabla;
			},
			//--Metodo para crear paginacion
			armar_paginacion : function(cuantos_son,vector){
				//----
				if((vector["cuantos_son"] == 0)||(vector["tipo"]==3)){
					cuantos_tabla = cuantos_son.replace(/"/g," ");
				}else{
					cuantos_son_tabla = vector["cuantos_son"].replace(/"/g," ");
				}
				//----Calculo a que pagina debe ir:------------------------------------------------
				switch(vector["tipo"]){
					case 0:
						offset = 0;
						//Calculo de Límites
						dic_tabla = this.calculo_limites(offset,cuantos_son_tabla,1);
					break;
					case 1:
						offset = vector["actual"]+vector["cuantos_x_pagina"];
						//Calculo de Límites
						dic_tabla = this.calculo_limites(offset,cuantos_son_tabla,1);
					break;
					case 2:
						offset = vector["actual"]-vector["cuantos_x_pagina"];
						//Calculo de Límites
						dic_tabla = this.calculo_limites(offset,cuantos_son_tabla,2);
					break;
					case 3:
						offset = vector["actual"];
						//--
							if(vector[0]==cuantos_son_tabla)
								offset=0;
							dic_tabla = this.calculo_limites(offset,cuantos_son_tabla,1);
						//--
					break;				
				}
				//------------------------------------------------------------------------------------
				//--Para armar clases
				offset_sig = offset+vector["cuantos_x_pagina"];
				clase_sig = "";
				if((parseInt(offset_sig) == parseInt(cuantos_son_tabla))||(parseInt(offset_sig) > parseInt(cuantos_son_tabla))){
					clase_sig = "disabled";
				}
				//--Para ocultar anterior
				if(offset == 1)
					clase_ant = "disabled";
				else
					clase_ant = "";
				//-- 
				if(cuantos_son_tabla>0){
					clase_tabla = "show";
					clase_tickets = "hide";
				}else{
					clase_tabla = "hide";
					clase_tickets = "show";
				}
				pag = {
						"clase_paginador_siguiente":clase_sig,
						"clase_paginador_anterior":clase_ant,
						"offset_tabla":offset,
						"cuantos_tabla":cuantos_son_tabla.replace(/"/g," "),
						"inicio_tabla":dic_tabla["inicio_tabla"],
						"fin_tabla":dic_tabla["fin_tabla"],
						"otra_ahi" :offset_sig+"*"+cuantos_son_tabla+"***"+offset_sig+"*"+cuantos_son_tabla
					  }
				return pag;			
				//------------------------------------------------------------------------------------

			}
			//---Fin: armar_paginacion
		}
	//--	
	}])	
//--