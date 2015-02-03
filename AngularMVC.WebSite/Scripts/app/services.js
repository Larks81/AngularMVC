var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Anagrafica', ['$resource','configs',
    function ($resource, configs) {
        return $resource(configs.baseWebApiUrl+'api/anagrafica/:id', {}, {            
            update: { method: 'PUT', params: { id: '@id' } }
        });
    }
])