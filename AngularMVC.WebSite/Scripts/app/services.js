var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Person', ['$resource','configs',
    function ($resource, configs) {
        return $resource(configs.baseWebApiUrl+'api/persons/:id:query', {}, {            
            update: {
                method: 'PUT',
                params: { id: '@id' },
                query: { method: 'GET', isArray: true }
            }
        });
    }
])