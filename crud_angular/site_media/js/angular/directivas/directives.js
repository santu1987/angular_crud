angular.module("AngularApp")
	.directive('dirdatapicker',function()
	{
		return{
			restrict: 'E',
			scope : {
						myDirectiveVar : '=',
			},
			template:"<div class='form-group'><div class='col-lg-12'><input class='form-control' id='fecha' ng-model='myDirectiveVar' name='fecha' onkeyup='this.value=formateafecha(this.value);' placeholder='Fecha: dd-mm-aaaa'></div></div>",
			replace: true,
			link: function($scope, elem, attr, ctrl){
				$("#fecha").datetimepicker({ 
				    lang:'es',
				    timepicker:false,
				    format:'d-m-Y',
				    formatDate:'Y-m-d',
				    lang:'es',
				});
			}
		};
		
	});
	/*.directive('holamundo', function() {
	    var directiva = { }
	    directiva.restrict = 'E';
	    directiva.template = "Hola Mundo !!!"
	    return directiva;
	});*/
/*.directive('dirTemplate', function ()
{
	return {
		restrict: 'E',//<dir-template></dir-template> hace referencia a un elemento/etiqueta html
		template: '<div class="dirClass"><h1>Directivas con AngularJS</h1>' +
		'<ul><li ng-repeat="value in values">{{value}}</li></ul></div>',
		link: function (scope,element)
		{
		//element hace referencia al div que contiene la directiva
		//en la función link añadimos algo de css con jQuery
		$(".dirClass").css({'background' : 'orange', 'color' : 'white'});
		//y creamos una variable de alcance con scope que contiene un array
		scope.values = ["simple","directiva","con","clases","en","angularjs"];
		}
	};
});*/