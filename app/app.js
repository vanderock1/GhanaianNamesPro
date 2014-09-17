'use strict';

// Declare app level module which depends on views, and components


var parentPage = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]);


parentPage.service('LoginService', function() {
    this.status = function($scope){

        FB.getLoginStatus(function(response) {
            console.log('status run');
            if (response.status == 'connected') {
                FB.api('/me',  function(response) {
                    $scope.Loginstate = 'Hello, '+response.first_name;
                    $scope.logMeth = 'logoutfb()';
                    $scope.LogAction = 'Logout';
                    console.log('status in');
                });
            }else{
                $scope.Loginstate = 'Logged out';
            }
        });

    };

    this.login = function($scope){
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                FB.api('/me', function(response) {
                    console.log('call inside login');
                    console.log(response);
                    $scope.Loginstate = 'Hello, '+response.first_name;
                    console.log('Hello, '+response.first_name);
                });
                console.log('Logged in.');
            }
            else {
                FB.login(function(response){
                    console.log(response);
                    if (response.status == 'connected') {
                        FB.api('/me', function(response) {
                            console.log('API call after log in');
                            $scope.Loginstate = 'Hello, '+response.first_name;
                        });
                        console.log('Logged in.');
                    }
                }, {scope: 'public_profile,email',return_scopes: true});
            }

            console.log('From  FB.getLoginStatus ');
            console.log(response);
        });
    };

    this.logout = function ($scope){
        FB.logout(function(response) {
            $scope.Loginstate = 'Logged out';
        });
    };
});


parentPage.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
    //when view1 load facebook
}]);

parentPage.controller('fbLoginController',function($scope,LoginService){

    $scope.Loginstate = 'Logged out';
    $scope.logMeth = 'loginfb()';
    $scope.LogAction = 'Login';

    $scope.loginfb = function(){
        LoginService.login($scope);
    };
    $scope.logoutfb = function(){
        LoginService.logout($scope);
    };

    $scope.$on('$routeChangeSuccess', function(){
        LoginService.status($scope);
    });


});

$(document).foundation();


