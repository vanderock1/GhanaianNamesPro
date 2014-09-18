'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function($scope,$rootScope) {


        $scope.days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

        $scope.getName = function() {
            var d = new Date($('#birth').text());
            var dayBorn = d.getDay();
            console.log($rootScope.gender);
            console.log(dayBorn);
            $scope.akanName = 'Your Akan name is '+ AkanName(dayBorn,$rootScope.gender);

        };

        function AkanName(day,gender){
            var boys =["Kwesi","Kojo","Kwabena","Kwaku","Yaw","Kofi","Kwame"];
            var girls=["Akosua","Adwoa","Abena", "Akua","Yaa","Afua","Ama"];
            var name;
            if(gender=='male')
            {
                name = boys[day];
            }
            else{
                name=girls[day];
            }

            return name;
        }



    })

    .controller('PhoneListCtrl', function ($scope) {
        $scope.phones = [
            {'name': 'Nexus S',
                'snippet': 'Fast just got faster with Nexus S.'},
            {'name': 'Motorola XOOM™ with Wi-Fi',
                'snippet': 'The Next, Next Generation tablet.'},
            {'name': 'MOTOROLA XOOM™',
                'snippet': 'The Next, Next Generation tablet.'}
        ];
    });