angular.module('lunchApp')
.controller('placeCtrl', ['$scope','$cookies','$route','places', function ($scope,$cookies,$route,places) {

	var u = $cookies['connect.sid'].substr(2,$cookies['connect.sid'].indexOf(".")-2);
	
	$scope.place = {};

	$scope.toggleVote = function(item,itemId,cat){
		var idx = item.indexOf(u);
		if (idx < 0) {
			//add vote
			item.push(u);
			places.addVote($scope.place._id,itemId,cat);
		}
		else {
			//rem vote
			item.splice(idx,1);
			places.remVote($scope.place._id,itemId,cat);
		}
	}

	$scope.voted = function(item){
		return item.indexOf(u) != -1;
	}

	$scope.pro = function(){
		var total = 0;
		for (var i in $scope.place.pros) total += $scope.place.pros[i].length;
		return total;
	}

	$scope.cons = function(){
		var total = 0;
		for (var i in $scope.place.cons) total += $scope.place.cons[i].length;
		return total;
	}

	places.getPlaceById($route.current.params.placeid).then(function(data){
		$scope.place = data;
	});
}])