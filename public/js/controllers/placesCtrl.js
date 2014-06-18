angular.module('lunchApp')
.controller('placesCtrl', ['$scope','places', function ($scope,places) {
	
	$scope.radioModel = "pros";
	$scope.orderDir = true;
	$scope.places = [];

	var prosCount = function(place){
		var t = 0;
		for (var i in place.pros) t += place.pros[i].length;
		return t;
	};

	var consCount = function(place){
		var t = 0;
		for (var i in place.cons) t += place.cons[i].length;
		return t;
	};

	places.getPlaces().success(function(data){

		angular.forEach(data, function(place){
			place.pros = prosCount(place);
			place.cons = consCount(place);
			$scope.places.push(place);
		});
		
	});

}])