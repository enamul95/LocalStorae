// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
angular.module('starter', ['ionic','ngCordova'])



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
		
	
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http,$cordovaSQLite) {

	$scope.DoSubmitAction=function(sq){
	alert("First");
		 var query = "INSERT INTO test (name, address) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [sq.name, sq.address]).then(function(res) {
		
           // var message = "INSERT ID -> " + res.insertId;
            //console.log(message);
           alert("Saved !");
        }, function (err) {
            console.error(err);
            alert(err);
        });	
		
	}
			
	
})
.controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {

})



.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	  db = $cordovaSQLite.openDB({ name: "my.db" });
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS test (id integer primary key, name text, address text)");
	 

 });
   //alert(db);

})
