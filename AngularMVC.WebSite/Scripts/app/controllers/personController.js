
/*Person is the var to change in code*/
angular.module('AngularMVCApp')
.controller('personController', ['$scope', 'Person',
    function ($scope, Person) {
                        
        $scope.get = function (query) {
            
            return Person.query(query).$promise;
        };

        $scope.getNew = function () {
            return new Person();
        };

        $scope.insert = function (person) {            
            return Person.save(person).$promise;
        };

        $scope.update = function (person) {
            return Person.update({ id: person.ID }, person).$promise;            
        };

        $scope.delete = function (person) {            
            return Person.delete({ id: person.ID }).$promise;
        };
                
    }]);
