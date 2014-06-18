angular.module('lunchApp')
.controller('placeCtrl', ['$scope','$route','places', function ($scope,$route,places) {

	var u = 'user0';

	$scope.place = {};

	$scope.toggleVote = function(item){
		var idx = item.indexOf(u);
		if (idx < 0) item.push(u);
		else item.splice(idx,1);
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

	places.getPlaceById($route.current.params.placeid).success(function(data){
		$scope.place = data;
	});
}])