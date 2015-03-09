angular.module('AngularMVCApp')
.directive('lookupcomboboxfield', function () {
    return {
        restrict: 'E',
        scope: {
            lookupname: '@lookupname',
            selected: '=',
            enablestate: '=',
            state: '=',
            size: '@size'
        },
        templateUrl: '/Scripts/app/directives/common/lookupComboboxField/lookupComboboxField.html',
        controller: function ($scope, LookupCache) {            
            $scope.items = LookupCache.getLookup($scope.lookupname);            
        }
    };
});