'use strict';

var app = angular.module('contactserverApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'ContactListCtrl',
        templateUrl: 'views/list.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);

app.controller('ContactListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/contacts').success(function(data, status, headers, config) {
        $scope.contacts = data;
    });
}]);