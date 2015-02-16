angular.module('AngularMVCApp')
.directive('datefield', function () {
    return {
        restrict: 'E',
        scope: {
            value: '=',
            enablestate: '=',
            state: '=',
            format: '@format',
            size: '@size'
        },
        templateUrl: '/Scripts/app/directives/common/dateField/dateField.html',
        controller: function ($scope) {            
            $scope.$watch('value', function (newValue) {

                //if (newValue != $scope.value) {
                    //alert("newValue= " + newValue);
                    //var a = Date.parse(newValue);
                    //alert(a + " trasform to " + $scope.format);
                    //var b = $filter('date')(a, $scope.format);
                    //if (b != $scope.value)
                    //    $scope.value = b;
                    //alert($scope.value);
                //}
            });
        }
    };
});

//angular.module('AngularMVCApp').directive('datepicker', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {
//            alert("dddd");
//            //element.datepicker({
//            //    dateFormat: 'DD, d  MM, yy',
//            //    onSelect: function (date) {
//            //        scope.date = date;
//            //        scope.$apply();
//            //    }
//            //});
//        }
//    };
//});


//angular.module('AngularMVCApp').directive('datepicker', function () {
//    return function (scope, element, attrs) {
//        alert("datepick");
//        element.datepicker({
//            //inline: true,
//            //dateFormat: function() {
//            //    alert(attrs['format']);
//            //    return attrs['format'];
//            //},
//            onselect: function () {
//                alert("onselect");
                
//            }
//            //onselect: function (dateText) {
//            //    alert("onselect");
//            //    var modelPath = $(this).attr('ng-model');
                
//            //    dateText = "test";
//            //    putObject(modelPath, scope, dateText);
//            //    scope.$apply();
//            //}
//        });
//    };
//});

angular.module('AngularMVCApp').directive('calendar', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ngModel) {
            $(el).datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (dateText) {
                    alert("test");
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
})