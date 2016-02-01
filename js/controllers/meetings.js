myApp.controller('MeetingsController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		if(authUser) {
			//console.log($rootScope.currentUser.$id);
			var meetingRef = new Firebase(FIREBASE_URL+'users/'+$rootScope.currentUser.$id+'/meetings');
			var meetingsInfo = $firebaseArray(meetingRef);

			//adding firbase loaded and watch events
			meetingsInfo.$loaded().then(function(data) {
				$rootScope.howManyMeetings = meetingsInfo.length;
			});

			meetingsInfo.$watch(function(data) {
				$rootScope.howManyMeetings = meetingsInfo.length;
			});

			//meetings list
			$scope.meetings = meetingsInfo;

			//add method
			$scope.addMeeting = function() {
				meetingsInfo.$add({
					name: $scope.meetingname,
					date: Firebase.ServerValue.TIMESTAMP
				}).then(function() {
					$scope.meetingname = '';
				});
			};

			//delete method
			$scope.deleteMeeting = function(key) {
				meetingsInfo.$remove(key);
			};
		}
	});
}]);