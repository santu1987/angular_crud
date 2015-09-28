angular.module("AngularApp")
//----------------------------------------------------------------------------------------------------------------------------------------
	.controller("MainController",function($scope,$http,ubicacionFactory,tipoUsFactory,mensajesFactory,objetosFactory,upload){
		$scope.persona = {};
		$scope.estados = [];
		$scope.municipios = [];
		$scope.parroquias = [];
		$scope.super_json=[];
		$scope.titulo_sistema = "App desarrollada en Angular";
		$scope.sub_titulo = "Cargando Personas";
		$scope.esta = { 'id':'', 'name':''};
		$scope.mun = { 'id':'','name':''};
		$scope.par = {'id':'','name':''};
		$scope.mensaje = {}				
		$scope.tipo_alerta = '';
		$scope.respuesta = '';
		$scope.tipoUs = [];
		$scope.newObject = {};
		$scope.name = '';
		//-- Método al hacer change en la fecha
		$scope.cargar_fecha = function(){
		//--	
			console.log("Ejem:"+$scope.fecha);
		//--	
		}
		//-- Método al hacer change en estado-
		$scope.change_estados = function(){
			$scope.mun = { 'id':'','name':''};
			$scope.par = { 'id':'','name':''};
			$scope.carga_de_municipios();
		}
		
		//-- Método al hacer change en municipios
		$scope.change_municipios = function(){
			$scope.carga_de_parroquias();
		}
		
		//--LLama al factory de cargar estados
		$scope.carga_de_estados = function (){
			ubicacionFactory.cargar_estados(function(data){
				$scope.estados = data;	
			});
		}

		//--Llama al factory que carga municipios
		$scope.carga_de_municipios = function (){
			ubicacionFactory.valor_id_estado($scope.esta.id);
			ubicacionFactory.cargar_municipios(function(data){
				$scope.municipios = data;
			});
		}
		
		//--Llama al factory que carga parroquias
		$scope.carga_de_parroquias = function (){
			if($scope.mun){
				ubicacionFactory.valor_id_municipio($scope.mun.id);
			}
			ubicacionFactory.cargar_parroquias(function(data){
				$scope.parroquias = data;
			});
		}	

		//-- Llama al factory que trae los tipos de usuarios
		$scope.carga_tipos_usuarios = function(){
			tipoUsFactory.cargar_tipos_us(function(data){
				$scope.tipoUs = data;
			});
		}
		//------------------------------------------------------------------------------------------------
		//--Cargo los estados
		$scope.carga_de_estados();
		//--Cargo los municipios
		//$scope.carga_de_municipios();
		//--Cargo las parroquias
		//$scope.carga_de_parroquias();
		//--Cargo los check
		$scope.carga_tipos_usuarios();
		//------------------------------------------------------------------------------------------------
		//--Metodo para realizar el registro en la bd...
		
		$scope.guardarPersona = function(){
			$scope.pre_loader();
			if($scope.validar_registro() == true)
			{
				//--
				console.log($scope.persona.fecha);
				$scope.accion = "guardar";
				$scope.mensaje = mensajesFactory;
				$http.post("./modulos/usuarios/usuariosController.php",
				{
					'nombres' : $scope.persona.nombres,
					'cedula': $scope.persona.cedula,
					'id':$scope.persona.id,
					'accion': $scope.accion,
					'estado':$scope.esta.id,
					'municipio':$scope.mun.id,
					'parroquia':$scope.par.id,
					'fecha':$scope.persona.fecha
				}).success(function(data, status, headers, config){
					if(data["mensaje"]=="Registro Exitoso"){
						//--Si el registro fue exitoso, registro a tipo_usuarios
						$scope.registrar_tipoUs(data["id"]);
						//-------------------------------------------------------
						//Para subir fotos
						$scope.uploadFile();
						//-------------------------------------------------------
					}else{
						$scope.mensaje = mensajesFactory.mensajeError();
						$scope.mensaje.resultado = data['mensaje'];
						$scope.mensaje.opcion = true;
						$scope.limpiar_msgrror();	
					}
					$scope.mensaje.errores = '';
					
				}).error(function(data,status){
						//$scope.mensaje_error();
						console.log(data);
				});
				//--
			}	
		}
		$scope.subir= function (){
			$scope.file="";
			console.log($scope.file);
		}
		//--Metodo para subir acrhivos
		$scope.uploadFile = function(){
			var file = $scope.file;
			var name = $scope.persona.cedula;
			$scope.name = name;
			console.log(file);
			//-
			upload.uploadFile(file,name).then(function(res){
				console.log(res);
				console.log(res.data);
				if(res.data!="error_tipo_archivo"){
					$scope.actualizar_persona_foto();
				}else{
					$scope.mensaje = mensajesFactory.mensajeError();
					$scope.mensaje.resultado = "Error #5 : Error al subir tipo de archivo, solo puede subir imagenes .jpg";
					$scope.mensaje.opcion = true;
				}
				//--------------------------------
				$scope.limpiar_msgrror();	
			});
			//-
		}
		//--Metodo para actualizar archivos....
		$scope.actualizar_persona_foto = function (){
		//-----------------------------------------------------------------------	
			$scope.accion = "actualizar_foto";
			$scope.mensaje = mensajesFactory;
			console.log($scope.accion+"-"+$scope.persona.cedula+"-"+$scope.name);
			$http.post("./modulos/usuarios/usuariosController.php",
			{
				'accion': $scope.accion,
				'cedula': $scope.persona.cedula,
				'imagen': $scope.name
			}).success(function(data, status, headers, config){
				console.log("Devolvió esto:"+data);
				if(data["mensaje"]=="Registro Exitoso"){
					//--Si el registro fue exitoso, registro a tipo_usuarios
					$scope.mensaje = mensajesFactory.mensajeSuccess();
					$scope.mensaje.resultado = data['mensaje'];
				}else{
					$scope.mensaje = mensajesFactory.mensajeError();
					$scope.mensaje.resultado = data['mensaje'];
				}
				$scope.mensaje.opcion = true;
				$scope.mensaje.errores = '';
				//--
				setTimeout(function(){
					$scope.$apply(function(){
						$scope.limpiar_campos();
					});
				},3000);
			}).error(function(data,status){
					$scope.mensaje.resultado = data['mensaje'];
					$scope.mensaje_error();
					console.log(data);
			});
		//----------------------------------------------------------------------	
		}
		//--Metodo para registrar tipo Usuario...
		$scope.registrar_tipoUs = function(id){
			$scope.accion = "guardar";
			$http.post("./modulos/tipos_usuarios/tiposUsController.php",
			{
				'accion': $scope.accion,
				'id': id,
				'checkbox': $scope.newObject
			})
			.success(function(data, status, headers, config){
				//console.log(data);
			}).error(function(data,status){
				$scope.mensaje_error();
			});
		}
		
		//-- Metodo para limpiar campos
		$scope.limpiar_campos = function(){
			$scope.mensaje.opcion = false;
			$scope.persona = {};
			$scope.newObject = {};
			$scope.esta = "";
			$scope.mun = "";
			$scope.par = "";
			$scope.file = "";

		}
		//-- Metodo que limpia los mensajes de error...
		$scope.limpiar_msgrror =  function(){
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.mensaje.opcion = false;
				});
			},3000);
		}
		//-- Metodo para validar campos antes de guardar
		$scope.validar_registro = function (){
			var size_check = objetosFactory.size($scope.newObject);
			console.log($scope.persona.file);
			//--Nombres
			if(($scope.persona.nombres == undefined)||($scope.persona.nombres == "")){
				$scope.mensaje_temp("Debe incluir nombre");
			}else
			//--Cedula
			if(($scope.persona.cedula == undefined)||($scope.persona.cedula == "")){
				$scope.mensaje_temp("Debe incluir su cédula"); 
			}else
			//--Estados
			if(($scope.esta.id == undefined)||($scope.esta.id == "")){
				$scope.mensaje_temp("Debe seleccionar un estado");
			}else
			//-- Municipios
			if(($scope.mun.id == undefined)||($scope.mun.id == "")){
				$scope.mensaje_temp("Debe seleccionar un municipio");
			}else
			//-- Parroquias
			if(($scope.par.id == undefined)||($scope.par.id == "")){
				$scope.mensaje_temp("Debe seleccionar una parroquia");
			}else
			//--para checkbox de Tipo Usuario
			if(size_check==0){
				$scope.mensaje_temp("Debe seleccionar al menos un tipo de usuario");
			}else
			//--para el file
			if(($scope.file == undefined)||($scope.file=="")){
				$scope.mensaje_temp("Debe incluir una imagen en formato jpg");
			}
			else
				return true;
		}
		//--Para mensajes temporales
		$scope.mensaje_temp = function(elMensaje){
			$scope.mensaje = mensajesFactory.mensajeError();
			$scope.mensaje.resultado = elMensaje;
			$scope.mensaje.opcion = true;
			setTimeout(function(){
						$scope.$apply(function(){
							$scope.mensaje.opcion = false;
						});
			},3000);
			return false;
		}
		//--Metodo para el pre loader
		$scope.pre_loader = function(){
			$scope.mensaje = mensajesFactory.pre_loader();
			$scope.mensaje.resultado = "Espere unos segundos mientras se ejecuta el proceso...";
		}
		//--
	})
//------------------------------------------------------------------
//---Ejemplo de como armas un select estático.....
	/*.controller("selectController",['$scope',function($scope){
		$scope.estados = {
				opciones:[	{id:"0", name: "--Seleccione--"},
							{id:"4", name: "Caracas"},
							{id:"3", name: "Here to stay"},
							{id:"2", name: "High way to hell"}
				]
		};
		$scope.esta = $scope.estados.opciones[0];
	}]);*/
//------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
	.controller("consultaUsController", function($scope, $http, mensajesFactory,paginacionFactory){
		$scope.cuantos_son ='';
		$scope.filtro = {
							"nombres":"",
							"cedula":""
						}
		$scope.personaCn = {
						nombres:'',
						cedula : '',
						estado:'',
						municipio:'',
						parroquia:'',
						imagen:'',
				}
		$scope.paginador = {
						"paginador_siguiente":"",
						"paginador_anterior":"",
						"clase_paginador_siguiente":"",
						"clase_paginador_anterior":"",
						"offset_tabla":"",
						"cuantos_tabla":"",
						"inicio_tabla":"",
						"fin_tabla":"",
						"clase_tabla":"",
						"clase_tickets":""
					}

		$scope.vect_tabla ={
								"actual": 1,
								"cuantos_son":$scope.cuantos_son,
								"cuantos_x_pagina":20,
								"tipo": ""
		}
			
		$scope.consultarPersona = function(offset,limit){
			$scope.accion = "consultar";
			$http.post("./modulos/usuarios/usuariosController.php",
			{
					'accion' : $scope.accion,
					'offset':offset,
					'limit':limit,
					'nombres': $scope.filtro.nombres,
					'cedula':$scope.filtro.cedula
			})
			.success(function(data, status, headers, config){
				console.log("Data:"+data);
				console.log(offset+"-"+limit);
				if(data == 'null')
					$scope.personaCn = "";
				else
				{
					$scope.personaCn = data;
				}
			})
			.error(function(data,status){
				$scope.mensaje = mensajesFactory.mensajeError();
				$scope.mensaje.resultado = "Error #03: Proceso de consulta fallido";
			});
		}
        //-------------------------------------------------------------------------------
        $scope.consultar_modal = function(){
			
		}
		//-------------------------------------------------------------------------------
		$scope.armarPaginacion = function (){
			$scope.accion = "consultar_cuantos_son";
			$http.post("./modulos/usuarios/usuariosController.php",
			{
				'accion' :$scope.accion,
				'nombres':$scope.filtro.nombres,
				'cedula':$scope.filtro.cedula
			})
			.success(function(data, status, headers, config){
				$scope.cuantos_son = data;
				var clase_sig = '';
				var cuant = $scope.cuantos_son.replace(/"/g," ");
				if(cuant<20){
					fin_tbl = cuant;
					clase_sig = "btn btn-primary pag_btn disabled";
				}else{
					fin_tbl = 20;
					clase_sig = "btn btn-primary pag_btn";
				}
				console.log($scope.cuantos_son);
				$scope.paginador = {
						"clase_paginador_siguiente":clase_sig,
						"clase_paginador_anterior":"btn btn-primary pag_btn disabled",
						"offset_tabla":"0",
						"cuantos_tabla":cuant,
						"inicio_tabla":"1",
						"fin_tabla":fin_tbl
				}				
			})
			.error(function(data,status){
				$scope.mensaje = mensajesFactory.mensajeError();
				$scope.mensaje.resultado = data;
			});
		}
	
		$scope.ir_tabla = function(tipo){
			$scope.vect_tabla.cuantos_son = $scope.cuantos_son;
			$scope.vect_tabla.tipo = tipo;
			//console.log(" Actual:"+$scope.vect_tabla.actual+" Cuantos_son:"+$scope.vect_tabla.cuantos_son+" cuantos_x_pagina:"+$scope.vect_tabla.cuantos_x_pagina+" tipo:"+$scope.vect_tabla.tipo);
			//--Armo la estructura de la páginación
			$scope.paginador = paginacionFactory.armar_paginacion($scope.cuantos_son,$scope.vect_tabla);
			//console.log($scope.paginador);
			//--Actualizo el vect_tabla
			$scope.vect_tabla.actual = $scope.paginador.inicio_tabla;
			$scope.vect_tabla.cuantos_son = $scope.paginador.cuantos_son_tabla;
			$scope.vect_tabla.cuantos_x_pagina = 20;
			$scope.vect_tabla.tipo = tipo;
			//--Consulto
			//$scope.armarPaginacion2();	
			$scope.consultarPersona($scope.vect_tabla.actual,$scope.vect_tabla.cuantos_x_pagina );
			console.log($scope.vect_tabla.actual+"*"+$scope.vect_tabla.cuantos_x_pagina);
			//--
		}

		$scope.ir_tabla_filtros = function (){
			$scope.ir_tabla(1);
			$scope.armarPaginacion();
		}
	//--
	$scope.consultarPersona(0,20);
	$scope.armarPaginacion();	
	})
//----------------------------------------------------------------------------------------------------------------