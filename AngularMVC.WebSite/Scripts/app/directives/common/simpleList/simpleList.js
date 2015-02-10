angular.module('AngularMVCApp')
.directive('simplelist', function ($controller) {
    return {
        restrict: 'E',        
        scope: {
            modeltype: '@modeltype',
            selected: '=',
            eventexecname: '@eventexecname'
        },
        templateUrl: function(elem, attrs) {
            return '/Scripts/app/directives/business/' + attrs.modeltype + '/' + attrs.modeltype + 'SimpleList.html';
        },
        //'/Scripts/app/templates/baseCrud/person/personList.html',
        controller: function ($scope) {
            
            $controller($scope.modeltype + 'Controller', { $scope: $scope });
            getAll();

            function getAll() {
                $scope.get()
                    .then(function (data) {                       
                        $scope.items = data;
                    })
                    .catch(function (data) {
                        alert("error");
                    });                
            };
            
            $scope.select = function (item) {
                $scope.selected = item;
            };

            $scope.new = function() {
                $scope.selected = $scope.getNew();
            };

            $scope.$on($scope.eventexecname, function (e, data) {                
                switch(data) {
                    case ActionExecutedEnum.INSERTED:
                        $scope.items.push($scope.selected);
                        break;
                    case ActionExecutedEnum.MODIFIED:                        
                        break;
                    case ActionExecutedEnum.DELETED:
                        var index = $scope.items.indexOf($scope.selected);
                        $scope.items.splice(index, 1);
                        break;
                }
            });
        }
    };
});