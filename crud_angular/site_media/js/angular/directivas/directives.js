angular.module("AngularApp")
//--------------------------------------------------------------------------------------------------------------
//--Directiva de datepicker:
	.directive('datepicker',function()
	{
		/*return{
			restrict: 'A',
			scope: false,
 		    require: "ngModel",
			//template:"<div>Your name is : {{fecha}}</div>"+"<div class='form-group'><div class='col-lg-12'><input class='form-control' id='fecha' ng-model='fecha' ng-change='cargar_fecha()' name='fecha' onkeyup='this.value=formateafecha(this.value);' placeholder='Fecha: dd-mm-aaaa'></div></div>",
			link: function(scope, elem, attr, ngModelCtrl){
				//--
				var updateModel = function (dateText) {
                    // call $apply to bring stuff to angular model
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(dateText);
                    });
                };
				//--
				//$("#fecha").datetimepicker({ 
				var options = { 
				    lang:'es',
				    timepicker:false,
				    format:'d-m-Y',
				    formatDate:'Y-m-d',
				    lang:'es',
				    onSelect:function (dateText, inst) {
                    scope.$apply(function(scope){
                        // Change binded variable
                        ngModel.assign(scope, dateText);
                    });
               }
				};
                $("#fecha").datetimepicker(options);
				/*scope.isOn = false;
				elem.bind("blur", function()
				{
					console.log("Ejem:"+scope.fecha);

				});*/
			//}
		//};
		//----------------------------------------------------------------------------------
		return {
	        restrict: 'A',
			//template:"<div>Your name is : {{fecha}}</div>"+"<div class='form-group'><div class='col-lg-12'><input class='form-control' id='fecha' ng-model='fecha' ng-change='cargar_fecha()' name='fecha' onkeyup='this.value=formateafecha(this.value);' placeholder='Fecha: dd-mm-aaaa'></div></div>",
   	        require : 'ngModel',
	        link : function (scope, element, attrs, ngModelCtrl) {
	            $(function(){
	                $("#fecha").datepicker({
	                    dateFormat:'dd/mm/yy',
	                    onSelect:function (date) {
	                        scope.$apply(function () {
	                            ngModelCtrl.$setViewValue(date);
	                        });
	                    }
	                });
	            });
	        }
    	};
		//-----------------------------------------------------------------------------------
	})
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
//------------------------------------------------------------------------------------------------
//--Directiva Subir archivos
	.directive("uploaderModel",["$parse",function($parse){
		return {
			restrict : 'A',
			link: function(scope, iElement, iAttrs){
				iElement.on("change",function(e){
					$parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
				});	
			}
		}
	}])
//------------------------------------------------------------------------------------------------
	.directive ('transcludeTrueExample', function(){
	   return {
	      restrict : 'A',
	      transclude : true,
	      template : '<div><p ng-transclude></p></div>'
	   };
	})
//------------------------------------------------------------------------------------------------
//-- Directiva para generar ventanas modales
	.directive("modalMensajes",function (){
		return {
					restrict: 'E',
					//transclude : true,
					//replace : true,
					//scope: { cuerpo_msj:'='},
					scope: true, 
					templateUrl: './site_media/templates/modal-mensaje-persona.html',
				};
	})
//------------------------------------------------------------------------------------------------