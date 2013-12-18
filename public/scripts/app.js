'use strict';

var app = angular.module('contactserverApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'ContactListCtrl',
        templateUrl: 'views/view_contact_list.html'
    }).when('/view/:contactId', {
        controller: 'ContactCtrl',
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

app.controller('ContactCtrl', ['$scope', '$http', '$route', function($scope, $http, $route) {
    $http.get('/contacts/' + $route.current.params.contactId).success(function(data, status, headers, config) {
        $scope.contact = data;
    });
}]);