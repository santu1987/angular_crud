angular.module("AngularApp",["ngRoute"])
.config(function($routeProvider){
	$routeProvider
		.when("/",{
			controller: "MainController",
			templateUrl: "site_media/templates/PanelUs.html"
		})
});