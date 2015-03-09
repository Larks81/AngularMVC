var app = angular.module('AngularMVCApp', ['ngResource', 'appServices', 'ngRoute', 'ui.bootstrap']);

app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        // Specify the three simple routes ('/', '/About', and '/Contact')
        $routeProvider.when('/home', {
            templateUrl: '/Home/Home',
            controller: 'mainController',
            resolve: {'allLookup' : 
                function (LookupCache)
                {                    
                    return LookupCache.init();
                }
            }
        });
        $routeProvider.when('/about', {
            templateUrl: '/Home/About',
            controller: 'mainController',
        });
        $routeProvider.when('/Contact', {
            templateUrl: '/Home/Contact',
            controller: 'contactCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        // Specify HTML5 mode (using the History APIs) or HashBang syntax.
        $locationProvider.html5Mode(true).hashPrefix('!');

    }]);
//app.run(function (LookupCache) {

//    LookupCache.init();

//});