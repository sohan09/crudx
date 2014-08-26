var app = angular.module( 'xstore', [
  'auth0',
  'ngRoute'
])
.config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider) {
  $routeProvider
    .when( '/', {
      controller: 'ProductCtrl',
      templateUrl: 'Product/list.scala.html',
      pageTitle: 'All Products',
      requiresLogin: true
    })

    .when( '/product/create/', {
      controller: 'ProductCtrl',
      templateUrl: 'Product/create.scala.html',
      pageTitle: 'Create Product',
      requiresLogin: true
    })

    .when( '/product/show/:id', {
      controller: 'ProductCtrl',
      templateUrl: 'Product/show.scala.html',
      pageTitle: 'Product Details',
      requiresLogin: true
    })
	
    .when( '/login', {
      templateUrl: 'Application/login.scala.html',
      pageTitle: 'Login'
    });


  authProvider.init({
    domain: "boxed.auth0.com",
    clientID: "rectojRIfjERbByPK2AdO7EHf9ywZt3U",
    callbackURL: "http://xposeb.herokuapp.com/authenticate",
    loginUrl: '/login'
  });

  authProvider.on('loginSuccess', function($location) {
    $location.path('/');
  });

  authProvider.on('loginFailure', function($log, error) {
    $log('Error logging in', error);
  });

  $httpProvider.interceptors.push('authInterceptor');
})
.run(function(auth) {
  auth.hookEvents();
});



app.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
  
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
	
      $scope.pageTitle = nextRoute.$$route.pageTitle;
    }
  });
});


app.controller( 'RootCtrl', function RootCtrl ( $scope, $location ) {

	$scope.user_name = "Sohan Nohemy";

});


app.controller( 'ProductCtrl', function ProductCtrl ( $scope, $location ) {



});
