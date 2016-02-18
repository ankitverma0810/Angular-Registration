myApp.controller('CheckInsController', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray', '$routeParams', '$location', 'FIREBASE_URL', function($scope, $rootScope, $firebaseObject, $firebaseArray, $routeParams, $location, FIREBASE_URL) {

	$scope.whichmeeting = $routeParams.mId;
	$scope.whichuser = $routeParams.uId;

	var ref = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins');
	var checkinsList = $firebaseArray(ref);
	
	$scope.checkins = checkinsList;
	$scope.order = 'firstname';
	$scope.recordId = '';

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

	$scope.pickRandom = function() {
		var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
		//$keyAt: this method takes a key and finds the associated record in the array
		$scope.recordId = checkinsList.$keyAt(whichRecord);
	};

	$scope.showLove = function(myCheckin) {
		myCheckin.show = !myCheckin.show;

		if( myCheckin.userState === 'expanded' ) myCheckin.userState = '';
		else myCheckin.userState = 'expanded';
	};

	$scope.giveLove = function(myCheckin) {
		var refLove = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/'+myCheckin.$id+'/awards');
		var checkinsArray = $firebaseArray(refLove);

		var myData = {
			name: myCheckin.giftText,
			date: Firebase.ServerValue.TIMESTAMP
		};

		checkinsArray.$add(myData);
	};

	$scope.deleteLove = function(checkinId, award) {
		/*var refLove = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/'+checkinId+'/awards');
		var record = $firebaseObject(refLove);
		record.$remove(award);*/
		console.log(award);
	};
}]);