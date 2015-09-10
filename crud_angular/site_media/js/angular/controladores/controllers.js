angular.module("AngularApp")
	.controller("MainController",function($scope,$http){
		$scope.persona = {};
		$scope.estados = [];
		$scope.titulo_sistema = "App desarrollada en Angular";
		$scope.sub_titulo = "Cargando Personas";
		//--
		$scope.mensaje = {
							'opcion':'',
							'resultado':'',
							'errores':'',
							'imagen':''
						};
		$scope.tipo_alerta = '';
		var equis = "Herah";

		$scope.cargar_estados = function(){
			/*$scope.accion = "consultar";
			$http.post("./modulos/estados/estadosController.php",
				{
					'accion':$scope.accion	
				}).success(function(data, status, headers, config){
					console.log(data);
					$scope.estados = data;
					//--
					console.log($scope.estados);
			}).error(function(data,status){
				$scope.mensaje_error();
			});*/
		$scope.estados = {
						opciones:[	
									{id:"4", name: "Caracas"},
									{id:"3", name: "Here to stay"},
									{id:"2", name: "High way to hell"}
						]
				};
		$scope.esta = "";
		}
		//------------------------------------------------------------------------------------------------
		//--Cargo los estados
		$scope.cargar_estados();
		//------------------------------------------------------------------------------------------------
		//--Metodo para realizar el registro en la bd...
		$scope.guardarPersona = function(){
			$scope.accion = "guardar";
			$scope.estado = '1';
			$http.post("./modulos/usuarios/usuariosController.php",
				{
					'nombres' : $scope.persona.nombres,
					'cedula': $scope.persona.cedula,
					'id':$scope.persona.id,
					'accion': $scope.accion,
					'estado':$scope.esta.id
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