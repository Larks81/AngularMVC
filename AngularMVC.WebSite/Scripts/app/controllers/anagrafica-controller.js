

angular.module('AnagraficaApp')
.controller('AnagraficaCtrl', ['$scope', 'Anagrafica',
    function ($scope, Anagrafica) {
        
        $scope.title = "loading question...";
        $scope.anagrafiche = [];                      
        $scope.newPerson = new Anagrafica();
        $scope.selectedPerson = null;
        $scope.rollbackPerson = null;        
                
        $scope.getAnagrafiche = function () {            
            $scope.title = "loading anagrafiche...";            
            $scope.anagrafiche = Anagrafica.query();            
        };

        $scope.selectPersona = function (persona) {
            $scope.selectedPerson = persona;
            $scope.statoTransazione = TransationStateEnum.VIEW;
        };

        $scope.insertAnagrafica = function (persona) {            
            Anagrafica.save(persona, function () {
                $scope.getAnagrafiche();
            });            
        };

        $scope.updateAnagrafica = function (persona) {            
            $scope.working = true;
            $scope.answered = true;            
            Anagrafica.update({ id: persona.ID }, persona, function () {
                $scope.getAnagrafiche();
            });
        };

        $scope.deleteAnagrafica = function (persona) {
            $scope.working = true;
            $scope.answered = true;
            Anagrafica.delete({ id: persona.ID }, function () {
                $scope.getAnagrafiche();
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
            $scope.insertAnagrafica($scope.selectedPerson);
            return true;
        }

        $scope.validatedupd = function () {
            $scope.updateAnagrafica($scope.selectedPerson);
            $scope.rollbackPerson = null;
            return true;
        }

        $scope.validateddel = function () {
            if (confirm("Vuoi realmente eliminare questa persona?")) {
                $scope.deleteAnagrafica($scope.selectedPerson);
                return true;
            } else {
                return false;
            }            
        }

        $scope.validatedundo = function () {
            alert("undo");
            if ($scope.rollbackPerson != null) {
                $scope.selectedPerson = angular.copy($scope.rollbackPerson);                
                $scope.rollbackPerson = null;
            }
            return true;
        }        

    }]);
