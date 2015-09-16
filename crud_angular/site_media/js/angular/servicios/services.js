angular.module("AngularApp")
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
//--