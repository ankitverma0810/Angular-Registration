myApp.factory('Authentication', ['$rootScope', '$location', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', function($rootScope, $location, $firebaseAuth, $firebaseObject, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		//console.log(authUser); will return loggedIn user with uid and token
		if(authUser) {
			var userRef = new Firebase(FIREBASE_URL+'users/'+authUser.uid);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		} else {
			$rootScope.currentUser = '';
		}
	});

	var authObject =  {
		login: function(user) {
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(regUser) {
				$location.path('/meetings');
			}).catch(function(error) {
				$rootScope.message = error.message;
			});
		},

		logout: function() {
			return auth.$unauth();
		},

		requireAuth: function() {
			//console.log(auth.$requireAuth());
			return auth.$requireAuth();
		},

		register: function(user) {
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function(regUser) {

				//storing information to user table in firebase
				var regRef = new Firebase(FIREBASE_URL+'users').child(regUser.uid).set({
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				});
				
				//logging user into our app
				authObject.login(user);

			}).catch(function(error) {
				console.log(error);
				$rootScope.message = error.message;
			});
		}
	}

	return authObject;

}]);