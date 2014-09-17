'use strict';
//<html eg app="myApp">
//<script src ="bower_components/angular/angular.js"></script>
//<script src ="js/controllers.js"></script>
<!DOCTYPE html>
</head>
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

 
function AkanName(day,gender){
	
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


function findName(){
	var gen = document.getElementById('gender');
	var day = document.getElementById('day');
	var akname = document.getElementById('myAkanName');
	var myakanname = AkanName( day.value ,gen.value);
	akname.innerHTML = myakanname;

}
