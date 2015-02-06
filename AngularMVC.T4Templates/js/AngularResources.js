

var appServices = angular.module('appServices', ['ngResource']);
	
appServices.factory('PersonsController', ['$resource','configs', function ($resource, configs) {
return $resource(configs.baseWebApiUrl+'api/persons/:id', {}, {
: { method: 'GET', params: {  } }
: { method: 'GET', params: {  } }
: { method: 'POST', params: {  } }
: { method: 'PUT', params: {  } }
: { method: 'DELETE', params: {  } }
: { method: 'GET_CONFIGURATION', params: {  } }
: { method: 'SET_CONFIGURATION', params: {  } }
: { method: 'GET_CONTROLLERCONTEXT', params: {  } }
: { method: 'SET_CONTROLLERCONTEXT', params: {  } }
: { method: 'GET_ACTIONCONTEXT', params: {  } }
: { method: 'SET_ACTIONCONTEXT', params: {  } }
: { method: 'GET_MODELSTATE', params: {  } }
: { method: 'GET_REQUEST', params: {  } }
: { method: 'SET_REQUEST', params: {  } }
: { method: 'GET_REQUESTCONTEXT', params: {  } }
: { method: 'SET_REQUESTCONTEXT', params: {  } }
: { method: 'GET_URL', params: {  } }
: { method: 'SET_URL', params: {  } }
: { method: 'GET_USER', params: {  } }
: { method: 'SET_USER', params: {  } }
: { method: 'EXECUTEASYNC', params: {  } }
: { method: 'VALIDATE', params: {  } }
: { method: 'VALIDATE', params: {  } }
: { method: 'DISPOSE', params: {  } }
: { method: 'TOSTRING', params: {  } }
: { method: 'EQUALS', params: {  } }
: { method: 'GETHASHCODE', params: {  } }
: { method: 'GETTYPE', params: {  } }
}});
