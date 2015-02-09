

var appServices = angular.module('appServices', ['ngResource']);
	
appServices.factory('PersonsController', ['$resource','configs', 
			function ($resource, configs) {
return $resource(configs.baseWebApiUrl+'api/persons/:id', {}, {
'getAll': { method: 'GET', params: {  }, isArray:true },
'get': { method: 'GET', params: { id : '@id' }, isArray:false },
'post': { method: 'POST', params: {  }, isArray:false },
'put': { method: 'PUT', params: { id : '@id' }, isArray:false },
'delete': { method: 'DELETE', params: { id : '@id' }, isArray:false },
})}]);
