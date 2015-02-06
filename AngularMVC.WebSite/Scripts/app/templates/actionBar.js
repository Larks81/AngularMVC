angular.module('AngularMVCApp')
.directive('actionbar', function () {
    return {
        restrict: 'E',
        scope: {
            state: '=',
            statechanged : "&",            
            validatedupd: "&",
            validateddel: "&",
            validatedundo: "&",            
            initupd: "&"
        },
        templateUrl: '/Scripts/app/templates/actionBar.html',
        controller: function ($scope) {
            
            setState(TransationStateEnum.SEARCH);
            
            $scope.btnconfOnClick = function () {                                

                if ($scope.state == TransationStateEnum.INSERT && $scope.validatedins() == true) {
                    setState(TransationStateEnum.VIEW);
                }
                else if ($scope.state == TransationStateEnum.EDIT && $scope.validatedupd() == true) {
                    setState(TransationStateEnum.VIEW);
                } 
            }
            
            $scope.btnupdOnClick = function () {
                if ($scope.initupd()) {
                    setState(TransationStateEnum.EDIT);
                }
            }
            $scope.btndelOnClick = function () {
                if ($scope.validateddel() == true) {
                    setState(TransationStateEnum.VIEW);
                }
            }
            $scope.btnundoOnClick = function () {
                if ($scope.validatedundo() == true) {
                    setState(TransationStateEnum.VIEW);
                }
            }

            $scope.$watch('state', function () {                
                setState($scope.state);                
            });
    

            function setState(stateStr) {
                $scope.state = stateStr;

                switch (stateStr) {                    
                    case TransationStateEnum.EDIT:
                        $scope.btnconfEnabled = true;
                        $scope.btninsEnabled = false;
                        $scope.btnupdEnabled = false;
                        $scope.btndelEnabled = true;
                        $scope.btnundoEnabled = true;
                        break;                    
                    case TransationStateEnum.SEARCH:
                        $scope.btnconfEnabled = true;
                        $scope.btninsEnabled = true;
                        $scope.btnupdEnabled = false;
                        $scope.btndelEnabled = false;
                        $scope.btnundoEnabled = true;
                        break;
                    case TransationStateEnum.VIEW:
                        $scope.btnconfEnabled = false;
                        $scope.btninsEnabled = true;
                        $scope.btnupdEnabled = true;
                        $scope.btndelEnabled = true;
                        $scope.btnundoEnabled = false;
                        break;
                    default:
                        $scope.btnconfEnabled = false;
                        $scope.btninsEnabled = true;
                        $scope.btnupdEnabled = true;
                        $scope.btndelEnabled = true;
                        $scope.btnundoEnabled = false;
                        break;
                }

                $scope.statechanged({ state: stateStr });                

            }

        }
    };
});