'use strict';

// Declare app level module which depends on views, and components


var parentPage = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]);


parentPage.service('LoginService', function() {

    this.status = function(){
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                $scope.Loginstate = 'Logged in';
                console.log('Logged in.');
                console.log(response.authResponse);
            }else{
                $scope.Loginstate = 'Logged out';
            }
        });
    };
    this.login = function(){
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status === 'connected') {
                FB.api('/me',  function(response) {
                    console.log(response);

                });
                $scope.Loginstate = 'Hello, Logged in';
                console.log('Logged in.');
                console.log(response.authResponse);
            }
            else {
                FB.login(function(response){
                    console.log(response);
                    console.log(response.authResponse);
                    FB.api('/me', {fields: 'gender'}, function(response) {
                        console.log(response);

                    });
                }, {scope: 'public_profile,email',return_scopes: true});
            }
        });
    };

    this.logout = function (){
        FB.logout(function(response) {
            $scope.Loginstate = 'Logged out';
        });
    }
});


parentPage.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
    //when view1 load facebook
}]);

parentPage.controller('fbLoginController',function($scope){

    $scope.Loginstate = 'Logged out';
    $scope.logMeth = 'loginfb()';
    $scope.LogAction = 'Login';

    $scope.loginfb = function(){
        LoginService.login();
    };
    $scope.logoutfb = function(){
        LoginService.logout();
    };

});

$(document).foundation();


