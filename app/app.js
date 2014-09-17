'use strict';

// Declare app level module which depends on views, and components


var parentPage = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]);

var isLoggedin = false;
parentPage.service('LoginService', function() {
    this.status = function($scope){

        FB.getLoginStatus(function(response) {
            console.log('STATUS');
            if (response.status == 'connected') {
                FB.api('/me',  function(response) {
                    $scope.Loginstate = $scope.introduction = 'Hello, '+response.first_name;
                    isLoggedin = true;
                    $scope.LogAction = 'Logout';
                    $scope.$apply();
                    console.log('status in');
                });
            }else{
                isLoggedin = false;
                $scope.Loginstate = 'Logged out';
            }
        });

    };

    this.login = function($scope){
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                FB.api('/me', function(response) {
                    console.log('LOGIN');
                    console.log(response);
                    $scope.Loginstate = $scope.introduction = 'Hello, '+response.first_name;
                    isLoggedin = true;
                    $scope.LogAction = 'Logout';
                    $scope.$apply();
                });
                console.log('Logged in.');
            }
            else {
                FB.login(function(response){
                    console.log(response);
                    if (response.status == 'connected') {
                        FB.api('/me', function(response) {
                            console.log('API call after log in');
                            $scope.Loginstate = $scope.introduction = 'Hello, '+response.first_name;
                            $scope.LogAction = 'Logout';
                            isLoggedin = true;
                            $scope.$apply();
                        });
                        console.log('Logged in.');
                    }else{
                        isLoggedin = false;
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
            $scope.LogAction = 'Login';
            isLoggedin = false;
            $scope.$apply();
        });
    };
});


parentPage.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
    //when view1 load facebook
}]);

parentPage.controller('fbLoginController',function($scope,LoginService){

    $scope.Loginstate = 'Logged out';
    $scope.LogAction = 'Login';

    $scope.loginfb = function(){
         (isLoggedin)? LoginService.logout($scope):LoginService.login($scope);
    };

    var init = function(){
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '820600624657154',
                xfbml      : true,
                version    : 'v2.1',
                status	 : true
            });

            LoginService.status($scope);
            $scope.$apply();
        };
    };
    init();


});

$(document).foundation();


