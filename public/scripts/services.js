'use strict';

var services = angular.module('contactserverApp.services', ['ngResource']);

services.factory('Contact', ['$resource',

function($resource) {
    return $resource('/contacts/:id', {
        id: '@id'
    });
}]);

services.factory('MultiContactLoader', ['Contact', '$q',

function(Contact, $q) {
    return function() {
        var delay = $q.defer();
        Contact.query(function(contacts) {
            delay.resolve(contacts);
        }, function() {
            delay.reject('Unable to fetch contacts');
        });
        return delay.promise;
    };
}]);

services.factory('ContactLoader', ['Contact', '$route', '$q',

function(Contact, $route, $q) {
    return function() {
        var delay = $q.defer();
        Contact.get({
            id: $route.current.params.contactId
        }, function(contact) {
            delay.resolve(contact);
        }, function() {
            delay.reject('Unable to fetch contact ' + $route.current.params.contactId);
        });
        return delay.promise;
    };
}]);