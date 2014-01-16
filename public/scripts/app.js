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
        templateUrl: 'views/contact_list.html'
    }).when('/view/:contactId', {
        controller: 'ContactViewCtrl',
        resolve: {
            contact: function(ContactLoader) {
                return ContactLoader();
            }
        },
        templateUrl: 'views/contact.html'
    }).when('/edit/:contactId', {
        controller: 'ContactEditCtrl',
        resolve: {
            contact: function(ContactLoader) {
                return ContactLoader();
            }
        },
        templateUrl: 'views/contact_form.html'
    }).when('/new', {
        controller: 'ContactNewCtrl',
        templateUrl: 'views/contact_form.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);

app.controller('ContactListCtrl', ['$scope', 'contacts', function($scope, contacts) {
    $scope.contacts = contacts;
}]);

app.controller('ContactViewCtrl', ['$scope', '$location', 'contact', function($scope, $location, contact) {
    $scope.contact = contact;
    
    $scope.edit = function() {
        $location.path('/edit/' + contact._id);
    };
    
    $scope.backToList = function() {
        $location.path('/');
    }
}]);

app.controller('ContactEditCtrl', ['$scope', '$location', 'contact', function($scope, $location, contact) {
    $scope.contact = contact;
    
    $scope.save = function() {
        $scope.contact.$save(function(contact) {
            $location.path('/view/' + contact._id);
        });
    };
    
    $scope.remove = function() {
        delete $scope.contact;
        $location.path('/');
    };
}]);

app.controller('ContactNewCtrl', ['$scope', '$location', 'Contact', function($scope, $location, Contact) {
    $scope.contact = new Contact();
    
    $scope.save = function() {
        $scope.contact.$save(function(contact) {
            $location.path('/view/' + contact._id);
        });
    };
}]);