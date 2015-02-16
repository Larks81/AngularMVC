angular.module('AngularMVCApp')
.directive('lookupfield', function () {
    return {
        restrict: 'E',
        scope: {
            lookupname: '@lookupname',
            selected: '=',
            enablestate: '=',
            state: '=',
            size: '@size'
        },
        templateUrl: '/Scripts/app/directives/common/lookupField/lookupField.html',
        controller: function ($scope, LookupCache) {
            //alert($scope.lookupname);
            $scope.items = LookupCache.getLookup($scope.lookupname);
            //alert($scope.items.lenght);
        }
    };
});