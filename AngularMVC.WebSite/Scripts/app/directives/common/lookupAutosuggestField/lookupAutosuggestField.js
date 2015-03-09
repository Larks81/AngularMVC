angular.module('AngularMVCApp')
.directive('lookupautosuggestfield', ['LookupCache', function (LookupCache) {
    return {
        restrict: 'E',
        scope: {
            lookupname: '@lookupname',
            selected: '=',
            enablestate: '=',
            state: '=',
            size: '@size'
        },
        templateUrl: '/Scripts/app/directives/common/lookupAutosuggestField/lookupAutosuggestField.html',        
        link: function (scope, element, attrs) {
            scope.items = LookupCache.getLookup(scope.lookupname);            
        } 
    };
}]);