angular.module("AngularApp")
//-- Para tipo de usuarios
	.factory("tipoUsFactory",['$http', function($http){
		return{
			cargar_tipos_us : function (callback){
				$http.post("./modulos/tipos_usuarios/tiposUsController.php",{ accion:'consultar' }).success(callback);		
			}
		}	
	}])
//-- Para ubicaciones: Estados/municipios/parroquias...	
	.factory("ubicacionFactory",['$http', function($http){
	/*	return{
			cargar_estados : function(){
				accion = "consultar";
				$http.post("./modulos/estados/estadosController.php",
				{
				  	'accion':accion	
				}).success(function(data, status, headers, config){
					estados = data;
				}).error(function(error,status){
					estados = "error";	
				});
			}
		}*/
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
	
