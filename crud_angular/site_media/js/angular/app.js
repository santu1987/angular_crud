angular.module("AngularApp",["ngRoute"])
.config(function($routeProvider){
	$routeProvider
		.when("/",{
			controller: "MainController",
			templateUrl: "site_media/templates/PanelUs.html"
		})
		.when("/crud_angular/consultar_personas",{
			controller :"consultaUsController",
			templateUrl: "site_media/templates/consultaUs.html"
		})
});