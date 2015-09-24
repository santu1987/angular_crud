app = angular.module 'AngularApp', ['ng-bootstrap-datepicker']

AppCtrl = ($scope)->
  $scope.datepickerOptions =
    format: 'yyyy-mm-dd'
    language: 'fr'
    autoclose: true
    weekStart: 0
    
  $scope.date = '2000-03-12'

app.controller 'AppCtrl', AppCtrl    
angular.bootstrap document, ['AngularApp']