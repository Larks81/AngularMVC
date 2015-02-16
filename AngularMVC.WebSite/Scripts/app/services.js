var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Person', [
    '$resource', 'configs',
    function($resource, configs) {
        return $resource(configs.baseWebApiUrl + 'api/persons/:id:query', {}, {
            update: {
                method: 'PUT',
                params: { id: '@id' },                
            },
            query: { method: 'GET', isArray: true }
        });
    }
]);

appServices.factory('Lookups', [
    '$resource', 'configs',
    function ($resource, configs) {       
        return $resource(configs.baseWebApiUrl + 'api/lookups/:query', {}, {
            get: { method: 'GET', cache :true }
        });
    }
]);

appServices.service('LookupCache', function (Lookups) {

    this.lookups = [];    
    
    var parseLookups = function (obj) {
        var lookups = [];
        for (var key in obj) {
            try {
                if (obj[key][0].Name != null) {
                    for (var k = 0; k < obj[key].length; k++) {
                        lookups.push(obj[key][k]);
                    }
                }
            } catch (err) {

            }
        }        
        return lookups;
    };   
    

    return {
        isInitialized: this.isInitialized,
        lookups: this.lookups,
        init: function () {
            return Lookups.get().$promise
                    .then(function(data) {
                        lookups = parseLookups(data);                        
                    });            
        },
        getLookup: function (lookupName) {
            for (var key in lookups) {
                if (lookups[key].Name == lookupName) {
                    return lookups[key].Items;
                }
            }
        }
    };

});

//appServices.service('lookupService', function (Lookups) {

//    this.lookups = [];

//    var parseLookups = function (obj) {
//        var lookups = [];
//        for (var key in obj) {
//            try {
//                if (obj[key][0].Name != null) {
//                    for (var k = 0; k < obj[key].length; k++) {
//                        lookups.push(obj[key][k]);
//                    }
//                }
//            } catch (err) {

//            }
//        }
//        return lookups;
//    };

//    var promise = Lookups.get().$promise
//        .then(function (data) {
//            this.lookups = parseLookups(data);
//            alert("lookup initialized");
//        });

//    return {
//        init: promise,
//        getLookup: function (lookupName) {
//            for (var key in this.lookups) {
//                if (this.lookups[key].Name == lookupName) {
//                    return this.lookups[key].Items;
//                }
//            }
//        }
//    };

//});