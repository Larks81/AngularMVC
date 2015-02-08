

var appServices = angular.module('appServices', ['ngResource']);
	
appServices.factory('PersonsController', ['$resource','configs', function ($resource, configs) {
return $resource(configs.baseWebApiUrl+'api/persons/:id', {}, {
: { method: 'GET', params: {  } }
: { method: 'GET', params: {  } }
: { method: 'POST', params: {  } }
: { method: 'PUT', params: {  } }
: { method: 'DELETE', params: {  } }
}});
