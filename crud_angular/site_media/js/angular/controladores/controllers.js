angular.module("AngularApp")
	.controller("MainController",function($scope,$http,ubicacionFactory){
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
		//--
		$scope.mensaje = {
							'opcion':'',
							'resultado':'',
							'errores':'',
							'imagen':''
						};
		$scope.tipo_alerta = '';
		$scope.respuesta = '';
		//-- Método al hacer change en estado
		$scope.change_estados = function(){
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

		//-- Método para cargar municipios
		/*/$scope.cargar_municipios = function(){
			$scope.accion = "consultar";
			$http.post("./modulos/municipios/municipiosController.php",
			{
				'accion':$scope.accion,
				'estado':$scope.esta.id
			}).success(function(data,status,headers,config){
					$scope.municipios =  data;
					//--
					//console.log($scope.municipios);
				}).error(function(data,status){
					$scope.mensaje_error();
				});
		}*/
		//-- Método para cargar parroquias
		/*$scope.cargar_parroquias = function(){
			$scope.accion = "consultar";
			$http.post("./modulos/parroquias/parroquiasController.php",
			{
				'accion':$scope.accion,
				'municipio':$scope.mun.id 	
			}).success(function(data,status,headers,config){
				//console.log(data);
				$scope.parroquias = data;
				console.log($scope.parroquias);
			}).error(function(data,status){
				$scope.mensaje_error();
			});
		}*/
		//------------------------------------------------------------------------------------------------
		//--Cargo los estados
		$scope.carga_de_estados();
		//--Cargo los municipios
		$scope.carga_de_municipios();
		//--Cargo las parroquias
		$scope.carga_de_parroquias();
		//------------------------------------------------------------------------------------------------
		//--Metodo para realizar el registro en la bd...
		$scope.guardarPersona = function(){
			$scope.accion = "guardar";
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
					
					console.log($scope.esta.id);
					console.log(data);
					$scope.mensaje.resultado = data['mensaje'];
					//---
					if(data["mensaje"]=="Registro Exitoso"){
						$scope.mensaje.imagen = "fa fa-check";
						$scope.tipo_alerta = 'alert-success';
					}else
					{
						$scope.mensaje.imagen = "fa fa-exclamation-circle";
						$scope.tipo_alerta = 'alert-danger';
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
					$scope.mensaje_error();
				});
		}
		//--
		$scope.limpiar_campos = function(){
			$scope.mensaje.opcion = false;
			$scope.persona = {};
			$scope.esta = "";
			$scope.mun = "";
			$scope.par = "";
		}

		$scope.mensaje_error = function(){
			$scope.mensaje.resultado = '';
			$scope.mensaje.errores = data['mensaje'];
			$scope.mensaje.imagen = "fa fa-exclamation-circle";
			$scope.tipo_alerta = 'alert-danger';
			console.log(data);
		}
	})

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