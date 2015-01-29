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
	var query = "INSERT INTO people (id,firstname, lastname) VALUES (?,?,?)";
    $cordovaSQLite.execute(db, query, [1,"khaled", "omar"]).then(function(res) {
        $scope.name=res.insertId;
    }, function (err) {
        $scope.name="error";
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
	
	 //db = $cordovaSQLite.openDB({ name: "my.db" });
       // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS test (id integer primary key, name text, address text)");
	
		//if(window.cordova) {
	//	db = $cordovaSQLite.openDB({name: "my.db"});
	//} else {
		//db = window.openDatabase("sales_distribution", "1.0", "sales_distribution", 2000000);
	//}
	db = $cordovaSQLite.openDB("test.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
    console.log("hello");
	
	
	 });
   //alert(db);

})
