angular.module("AngularApp")
	.directive('dirdatapicker',function()
	{
		return{
			restrict: 'E',
			template:"<div class='form-group'><div class='col-lg-12'><input class='form-control' id='fecha' name='fecha' onkeyup='this.value=formateafecha(this.value);' placeholder='Fecha: dd-mm-aaaa'></div></div>",
			//template: '<div class="dirClass"><h1>Directivas con AngularJS</h1></div>',
			link: function(scope, element){
				//$(".dirClass").css({'background' : 'orange', 'color' : 'white'});
				$("#fecha").datetimepicker({ 
				    lang:'es',
				    minDate:0,
				    timepicker:true,
				    format:'d-m-Y',
				    formatDate:'Y-m-d',
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