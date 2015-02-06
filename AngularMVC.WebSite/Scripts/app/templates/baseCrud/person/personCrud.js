angular.module('AngularMVCApp')
.directive('personcrud', function (Person) {
    return {
        restrict: 'E',
        scope: {
            model: '='            
        },
        templateUrl: '/Scripts/app/templates/baseCrud/person/personCrud.html',
        controller: function ($scope) {
            $scope.item = null;

            $scope.$watch('model', function () {
                $scope.item = angular.copy($scope.model);
                $scope.transactionStateItem = TransationStateEnum.VIEW;
            });                            

            $scope.rollbackItem = null;                                    

            $scope.insertItem = function (person) {
                Person.save(person, function (retValue) {
                    alert("ritorno "+ retValue.value);
                    //$scope.getPersons();
                });
            };

            $scope.updateItem = function (person) {               
                Person.update({ id: person.ID }, person, function () {
                    $scope.getPersons();
                });
            };

            $scope.deleteItem = function (person) {                
                Person.delete({ id: person.ID }, function () {
                    $scope.model = null;
                });
            };

            // actionBar events

            $scope.statechanged = function (state) {
                return true;
            }            

            $scope.initupd = function () {
                $scope.rollbackItem = angular.copy($scope.item);
                return true;
            }
            
            $scope.validatedupd = function () {

                if ($scope.item.ID != null) {
                    $scope.updateItem($scope.item);
                    angular.copy($scope.item, $scope.model);
                    $scope.rollbackItem = null;
                } else {
                    alert($scope.item.ID);
                    var a = $scope.insertItem($scope.item)
                    alert(a);
                    
                }

                return true;
            }

            $scope.validateddel = function () {
                if (confirm("Do you want really delete this?")) {
                    $scope.deleteItem($scope.model);
                    return true;
                } else {
                    return false;
                }
            }

            $scope.validatedundo = function () {                
                if ($scope.rollbackItem != null) {                    
                    angular.copy($scope.rollbackItem, $scope.item);
                    $scope.rollbackItem = null;
                }
                return true;
            }

            
        }
    };
});