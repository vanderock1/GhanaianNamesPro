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


    this.status = function($scope,$rootScope){
        console.log('STATUS 1');
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status == 'connected') {
                FB.api('/me',  function(response) {
                    $scope.Loginstate = 'Hello, '+response.first_name;
                    $rootScope.introduction = 'Hello, '+response.first_name + ' ' + response.last_name ;
                    $rootScope.birth = response.birthday;
                    $rootScope.gender = response.gender;
                    $scope.LogAction = 'Logout';
                    $scope.$apply();
                    isLoggedin = true;
                    console.log('status in');
                });
            }else{
                $scope.Loginstate = 'Logged out';
                isLoggedin = false;
                $scope.$apply();
            }
        });

    };



    this.login = function($scope,$rootScope){
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                FB.api('/me', function(response) {
                    console.log('LOGIN');
                    console.log(response);
                    $scope.Loginstate = 'Hello, '+response.first_name;
                    $rootScope.introduction = 'Hello, '+response.first_name + ' ' + response.last_name ;
                    $rootScope.birth = response.birthday;
                    $rootScope.gender = response.gender;
                    isLoggedin = true;
                    $scope.LogAction = 'Logout';
                    $scope.$apply();
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
                            $rootScope.introduction = 'Hello, '+response.first_name + ' ' + response.last_name ;
                            $rootScope.birth = response.birthday;
                            $rootScope.gender = response.gender;
                            $scope.LogAction = 'Logout';
                            $scope.$apply();
                            isLoggedin = true;
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

parentPage.controller('fbLoginController',function($scope,$rootScope,LoginService){

    //$scope.Loginstate = 'Logged out';
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

            LoginService.status($scope,$rootScope);
            $scope.$apply();
        };
    };
    init();


});

$(document).foundation();