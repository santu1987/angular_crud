angular.module("AngularApp")
//----------------------------------------------------------------------------------------------------------------------------------------
	.controller("MainController",function($scope,$http,ubicacionFactory,tipoUsFactory,mensajesFactory,objetosFactory){
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
		//-- Método al hacer change en estado
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
					'parroquia':$scope.par.id
				}).success(function(data, status, headers, config){
						//console.log($scope.esta.id);
						//console.log(data);
						if(data["mensaje"]=="Registro Exitoso"){
							//--Si el registro fue exitoso, registro a tipo_usuarios
							$scope.registrar_tipoUs(data["id"]);
							$scope.mensaje = mensajesFactory.mensajeSuccess();
							$scope.mensaje.resultado = data['mensaje'];
						}else
						{
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
						//$scope.mensaje_error();
						console.log(data);
				});
				//--
			}	
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

		}
		//-- Metodo para validar campos antes de guardar
		$scope.validar_registro = function (){
			var size_check = objetosFactory.size($scope.newObject);
			console.log("Size:"+size_check);
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
		$scope.personaCn = {
						nombres:'',
						cedula : '',
						estado:'',
						municipio:'',
						parroquia:''
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
		$scope.consultarPersona = function(id){
			$scope.accion = "consultar";
			$http.post("./modulos/usuarios/usuariosController.php",
			{
					'accion' : $scope.accion
			})
			.success(function(data, status, headers, config){
				console.log(data);
				$scope.personaCn = data;
			})
			.error(function(data,status){
				$scope.mensaje = mensajesFactory.mensajeError();
				$scope.mensaje.resultado = "Error #03: Proceso de consulta fallido";
			});
		}
		$scope.armarPaginacion =function (){
			$scope.accion = "consultar_cuantos_son";
			$http.post("./modulos/usuarios/usuariosController.php",
			{
				'accion' :$scope.accion
			})
			.success(function(data, status, headers, config){
				$scope.cuantos_son = data;
				console.log($scope.cuantos_son);
				$scope.paginador = {
						"paginador_siguiente":"$scope.ir_tabla(0,"+$scope.cuantos_son +",20,1);",
						"paginador_anterior":"$scope.ir_tabla(0,"+$scope.cuantos_son+",20,2);",
						"clase_paginador_siguiente":paginacionFactory.pag.clase_paginador_siguiente,
						"clase_paginador_anterior":paginacionFactory.pag.paginador_anterior,
						"offset_tabla":offset,
						"cuantos_tabla":$scope.cuantos_son_tabla,
						"inicio_tabla":paginacionFactory.pag.inicio_tabla,
						"fin_tabla":paginacionFactory.pag.fin_tabla,
						"clase_tabla":paginacionFactory.pag.clase_tabla,
						"clase_tickets":paginacionFactory.pag.clase_tickets
					}				
			})
			.error(function(data,status){
				$scope.mensaje = mensajesFactory.mensajeError();
				$scope.mensaje.resultado = data;
			});
		}
	//--
	$scope.consultarPersona();
	$scope.armarPaginacion();	
	})

//----------------------------------------------------------------------------------------------------------------