angular.module('AnagraficaApp')
.directive('maskedfield', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            enablestate: '=',
            state: '=',
            mask: '='
        },
        templateUrl: '/Scripts/app/templates/maskedField.html',
        controller: function ($scope) {            
            
        }
    };
});