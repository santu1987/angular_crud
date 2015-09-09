angular.module("AngularApp")
	.controller("MainController",function($scope,$http){
		$scope.persona = {};
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
		//--Metodo para realizar el registro en la bd...
		$scope.guardarPersona = function(){
			$scope.accion = "guardar";
			$http.post("./modulos/usuarios/usuariosController.php",
				{
					'nombres' : $scope.persona.nombres,
					'cedula': $scope.persona.cedula,
					'id':$scope.persona.id,
					'accion': $scope.accion
				}).success(function(data, status, headers, config){

					console.log(data);
					$scope.mensaje.resultado = data['mensaje'];
					//---
					if(data["mensaje"]=="Registro Exitoso")
					{
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
							$scope.mensaje.opcion = false;
						});
					},3000);
				}).error(function(data,status){
					$scope.mensaje.resultado = '';
					$scope.mensaje.errores = data['mensaje'];
					$scope.mensaje.imagen = "fa fa-exclamation-circle";
					$scope.tipo_alerta = 'alert-danger';
					console.log(data);
				});
		}
		//--
	})