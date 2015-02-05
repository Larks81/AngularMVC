
/*Person is the var to change in code*/
angular.module('AngularMVCApp')
.controller('PersonCtrl', ['$scope', 'Person',
    function ($scope, Person) {
        
        $scope.title = "loading question...";
        $scope.persons = [];                      
        $scope.newPerson = new Person();
        $scope.selectedPerson = null;
        $scope.rollbackPerson = null;
        $scope.transactionState = TransationStateEnum.SEARCH;
                
        $scope.getPersons = function () {            
            $scope.title = "loading anagrafiche...";            
            $scope.persons = Person.query();            
        };

        $scope.selectPerson = function (person) {
            $scope.selectedPerson = person;
            $scope.transactionState = TransationStateEnum.VIEW;
        };

        $scope.insertPerson = function (person) {            
            Person.save(person, function () {
                $scope.getPersons();
            });            
        };

        $scope.updatePerson = function (person) {            
            $scope.working = true;
            $scope.answered = true;            
            Person.update({ id: person.ID }, person, function () {
                $scope.getPersons();
            });
        };

        $scope.deletePerson = function (person) {
            $scope.working = true;
            $scope.answered = true;
            Person.delete({ id: person.ID }, function () {
                $scope.getPersons();
            });
        };
        
        $scope.statechanged = function (state) {            
            return true;
        }

        $scope.initins = function () {            
            return true;            
        }

        $scope.initupd = function () {
            $scope.rollbackPerson = angular.copy($scope.selectedPerson);            
            return true;
        }

        $scope.validatedins = function(){
            $scope.insertPerson($scope.selectedPerson);
            return true;
        }

        $scope.validatedupd = function () {
            $scope.updatePerson($scope.selectedPerson);
            $scope.rollbackPerson = null;
            return true;
        }

        $scope.validateddel = function () {
            if (confirm("Do you want really delete this?")) {
                $scope.deletePerson($scope.selectedPerson);
                return true;
            } else {
                return false;
            }            
        }

        $scope.validatedundo = function () {            
            if ($scope.rollbackPerson != null) {
                $scope.selectedPerson = angular.copy($scope.rollbackPerson);                
                $scope.rollbackPerson = null;
            }
            return true;
        }        

    }]);
