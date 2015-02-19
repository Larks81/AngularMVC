

var appServices = angular.module('appServices', ['ngResource']);
	
appServices.factory('Persons', ['$resource','configs', 
			function ($resource, configs) {
return $resource(configs.baseWebApiUrl+'api/persons/:id', {}, {
'query': { method: 'GET', params: { firstName : '@firstName', lastName : '@lastName' }, isArray:true },
'get': { method: 'GET', params: { id : '@id' }, isArray:false },
'save': { method: 'POST', params: {  }, isArray:false },
'update': { method: 'PUT', params: { id : '@id' }, isArray:false },
'delete': { method: 'DELETE', params: { id : '@id' }, isArray:false },
})}]);
