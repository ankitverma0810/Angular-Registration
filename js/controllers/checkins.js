myApp.controller('CheckInsController', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray', '$routeParams', '$location', 'FIREBASE_URL', function($scope, $rootScope, $firebaseObject, $firebaseArray, $routeParams, $location, FIREBASE_URL) {

	$scope.whichmeeting = $routeParams.mId;
	$scope.whichuser = $routeParams.uId;

	var ref = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins');

	var checkinsList = $firebaseArray(ref);
	$scope.checkins = checkinsList;
	$scope.order = "firstname";

	$scope.addCheckin = function() {
		var checkinsInfo = $firebaseArray(ref);
		var myData = {
			firstname: $scope.user.firstname,
			lastname: $scope.user.lastname,
			email: $scope.user.email,
			date: Firebase.ServerValue.TIMESTAMP
		};

		checkinsInfo.$add(myData).then(function() {
			$location.path('/checkins/'+$scope.whichuser+'/'+$scope.whichmeeting+'/checkinsList');
		});
	};

	$scope.deleteCheckin = function(id) {
		var refDel = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/'+id);
		var record = $firebaseObject(refDel);
		record.$remove(id);
	};
}]);