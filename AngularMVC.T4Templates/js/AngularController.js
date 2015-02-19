
angular.module('AngularMVCApp')
.controller('personsController', ['$scope', 'Persons',
    function ($scope, Persons) {
		$scope.getNew = function () {
            return new Person();
        };

				            
        $scope.get = function (query) {            
            return Person.query(query).$promise;
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