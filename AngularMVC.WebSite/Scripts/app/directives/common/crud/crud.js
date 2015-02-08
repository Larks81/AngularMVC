angular.module('AngularMVCApp')
.directive('crud', function ($controller) {
    return {
        restrict: 'E',
        scope: {
            modeltype: '@modeltype',
            model: '=',
            eventexecname: '@eventexecname'
        },
        templateUrl: function(elem,attrs) {
            return '/Scripts/app/directives/business/' + attrs.modeltype + '/' + attrs.modeltype + 'Crud.html';
        },
        controller: function ($scope) {

            //Base controller with typed crud actions
            $controller($scope.modeltype + 'Ctrl', { $scope: $scope });

            //Internal copy of model
            $scope.item = null;

            //Rollback copy of item
            $scope.rollbackItem = null;
            
            $scope.$watch('model', function () {
                $scope.item = angular.copy($scope.model);
                if ($scope.item != null && $scope.item.ID == null) {
                    $scope.transactionStateItem = TransationStateEnum.EDIT;
                } else if ($scope.item != null && $scope.item.ID != null) {
                    $scope.transactionStateItem = TransationStateEnum.VIEW;
                }
                
            });                            
            
            //------------------------------------------------------------------
            //---------------------- crud actions ------------------------------
            //------------------------------------------------------------------

            $scope.insertItem = function (itemToInsert) {
                var idInserted;
                $scope.insert(itemToInsert)
                    .then(function (data) {
                        idInserted = data.ID;
                        if (idInserted > 0) {
                            $scope.item.ID = idInserted;
                            angular.copy($scope.item ,$scope.model);                            
                            sendEvent(ActionExecutedEnum.INSERTED);
                        }
                    })
                    .catch(function (data) {
                        alert("error");
                    });                
            };

            $scope.updateItem = function (itemToUpdate) {
                $scope.update(itemToUpdate)
                    .then(function (data) {
                        sendEvent(ActionExecutedEnum.MODIFIED);
                    })
                    .catch(function (data) {
                        alert("error");
                    });                                
            };

            $scope.deleteItem = function (itemToDelete) {
                $scope.delete(itemToDelete)
                    .then(function(data) {
                        $scope.model = null;
                        sendEvent(ActionExecutedEnum.DELETED);
                    })
                    .catch(function (data) {
                        alert("error");
                    });                                         
            };

            //Send broadcast event that an action has been executed by name of 
            //eventexecname parameter
            function sendEvent(actionExecuted)
            {
                $scope.$parent.$broadcast($scope.eventexecname, actionExecuted);
            }


            //------------------------------------------------------------------
            //-------------------- actionBar events ----------------------------
            //------------------------------------------------------------------

            $scope.statechanged = function(state) {
                return true;
            };

            $scope.initupd = function() {
                $scope.rollbackItem = angular.copy($scope.item);
                return true;
            };

            $scope.validatedupd = function() {

                if ($scope.item.ID != null) {
                    $scope.updateItem($scope.item);                    
                    $scope.rollbackItem = null;
                } else {                    
                    $scope.insertItem($scope.item);                    
                }
                angular.copy($scope.item, $scope.model);
                return true;
            };

            $scope.validateddel = function() {
                if (confirm("Do you want really delete this?")) {
                    $scope.deleteItem($scope.model);
                    return true;
                } else {
                    return false;
                }
            };

            $scope.validatedundo = function () {                
                if ($scope.rollbackItem != null) {
                    if ($scope.model.ID == null) {
                        $scope.model = null;
                        $scope.rollbackItem = null;
                    }else{
                        angular.copy($scope.rollbackItem, $scope.item);
                        $scope.rollbackItem = null;
                    }
                }
                return true;
            };


            //------------------------------------------------------------------
            //------------------ self manipulate item --------------------------
            //------------------------------------------------------------------

            $scope.addNew = function (object) {
                object.push(new Object());
            };

            $scope.remove = function (object) {
                removeObjectByHashKey($scope.item, object.$$hashKey);
            };

            function removeObjectByHashKey(theObject, hashKey, parentObject) {
                var result = null;
                if (theObject instanceof Array) {
                    for (var i = 0; i < theObject.length; i++) {
                        removeObjectByHashKey(theObject[i], hashKey,theObject);
                    }
                }
                else {
                    for (var prop in theObject) {
                        console.log(prop + ': ' + theObject[prop]);
                        if (prop == '$$hashKey') {
                            if (theObject[prop] == hashKey) {
                                var index = parentObject.indexOf(theObject);
                                parentObject.splice(index, 1);
                            }
                        }
                        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
                            result = removeObjectByHashKey(theObject[prop], hashKey, theObject);
                    }
                }
                return result;
            }
        }
    };
});