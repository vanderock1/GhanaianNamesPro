'use strict';

// Declare app level module which depends on views, and components


var parentPage = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]);

var isLoggedin = false;

parentPage.service('InitService', function(LoginService){
    this.initMe = function($scope){
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



});

parentPage.service('LoginService', function() {
    this.status = function($scope){

        FB.getLoginStatus(function(response) {
            console.log('STATUS');
            if (response.status == 'connected') {
                FB.api('/me',  function(response) { $scope.introduction = 'Hello, '+response.first_name + " " + response.last_name;
                    $scope.birth = response.birthday;
                    isLoggedin = true;
                    $scope.LogAction = 'Logout';
                    $scope.LoginState = 'Hello, '+response.first_name;
                    $scope.$apply();
                    console.log('status in');
                    console.log(response);
                });
            }else{

                $scope.LoginState = 'Logged out';
                $scope.$apply();
                isLoggedin = false;
               // return false;
            }
        });

    };

    this.login = function($scope){
        FB.getLoginStatus(function(response) {
            console.log('LOGIN');
            if (response.status == 'connected') {
                FB.api('/me', function(response) {
                    console.log(response);
                    $scope.LoginState = 'Hello, '+response.first_name;
                    $scope.introduction = 'Hello, '+response.first_name + " " + response.last_name;
                    $scope.birth = response.birthday;
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
                            $scope.LoginState = 'Hello, '+response.first_name;
                            $scope.introduction = 'Hello, '+response.first_name + " " + response.last_name;
                            $scope.birth = response.birthday;
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

parentPage.controller('fbLoginController',function($scope,LoginService,InitService){

    $scope.Loginstate = 'Logged out';
    $scope.LogAction = 'Login';

    $scope.loginfb = function(){
        (isLoggedin)? LoginService.logout($scope):LoginService.login($scope);
    };

    InitService.initMe($scope);

});

$(document).foundation();


