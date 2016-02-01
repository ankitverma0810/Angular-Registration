var myApp = angular.module('myApp', 
	['ngRoute', 'firebase'])
	.constant('FIREBASE_URL', 'https://angularegister.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
		console.log(error);
		if( error === 'AUTH_REQUIRED' ) {
			$rootScope.message = 'Sorry, you must log in to access that page';
			$location.path('/login');
		}
	});

	$rootScope.$on('$routeChangeStart', function(event, next, previous) { 
		if (next.$$route && next.$$route.resolve) {
		}
	});

}]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		}).
		otherwise({
			redirectTo: '/login'
		});
}]);