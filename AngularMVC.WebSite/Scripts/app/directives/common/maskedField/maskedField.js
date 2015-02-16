angular.module('AngularMVCApp')
.directive('maskedfield', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            enablestate: '=',
            state: '=',
            mask: '=',
            size: '@size'
        },
        templateUrl: '/Scripts/app/directives/common/maskedField/maskedField.html',
        controller: function ($scope) {                        
        }
    };
});