'use strict';

var veiw1Module = angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'fbLoginController'
        });
    }]);

veiw1Module.controller('birthdayParser', function($scope,FBBirthday,InitService){
    var asdf = function(){

        this.getBirthday = function($scope){

            FB.api('/me', function(response) {
                console.log(response);
                $rootScope.introduction = response;
                $rootScope.$apply();
            });
        };

        this.AkanName = function (day,gender){

            var boys =["Kwesi","Kojo","Kwabena","Kwaku","Yaw","Kofi","Kwame"];
            var girls=["Akosua","Adwoa","Abena", "Akua","Yaa","Afua","Ama"];

            var name;
            if(gender=='M')
            {
                name = boys[day];
            }
            else{
                name=girls[day];
            }

            return name;
        }
    }



InitService.initMe($scope);
});

