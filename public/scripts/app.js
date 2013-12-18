'use strict';

var app = angular.module('contactserverApp', ['ngRoute', 'contactserverApp.services']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'ContactListCtrl',
        resolve: {
            contacts: function(MultiContactLoader) {
                return MultiContactLoader();
            }
        },
        templateUrl: 'views/view_contact_list.html'
    }).when('/view/:contactId', {
        controller: 'ContactViewCtrl',
        resolve: {
            contact: function(ContactLoader) {
                return ContactLoader();
            }
        },
        templateUrl: 'views/view_contact.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);

app.controller('ContactListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/contacts').success(function(data, status, headers, config) {
        $scope.contacts = data;
    });
}]);

app.controller('ContactViewCtrl', ['$scope', 'contact', function($scope, contact) {
    $scope.contact = contact;
}]);