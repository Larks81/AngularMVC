angular.module('AngularMVCApp')
.controller('mainController', function ($scope) {
    $scope.sayHello = function() {
        alert("hello");
    };
})