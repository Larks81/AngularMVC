angular.module('AngularMVCApp')
.directive('filteredlist', function ($controller) {
    return {
        restrict: 'E',        
        scope: {
            modeltype: '@modeltype',
            selected: '=',
            eventexecname: '@eventexecname'
        },
        templateUrl: function(elem, attrs) {
            return '/Scripts/app/directives/business/' + attrs.modeltype + '/' + attrs.modeltype + 'FilteredList.html';
        },        
        controller: function ($scope, $sce) {
            
            $controller($scope.modeltype + 'Controller', { $scope: $scope });

            $scope.getFiltred = function (query) {
                
                $scope.get(query)
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

            $scope.highlight = function (text, search) {                
                if (!search) {
                    return $sce.trustAsHtml(text);
                }                
                return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
            };
        }
    };
});