angular.module('lunchApp')
.controller('placesCtrl', ['$scope','$window','places', function ($scope,$window,places) {
	
	$scope.apikey = "AIzaSyDeyQNp1ywHcgwuqqIFfLqVX_KEt8s0oQQ";

	$scope.radioModel = "pros";
	$scope.orderDir = true;
	$scope.places = [];

	$scope.geoEnabled = false;
	$scope.geoLoading = false;

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

	var loadPlaces = function(geo){
		if (geo) {
			$scope.radioModel = "dis";
			$scope.orderDir = false;
		}
		$scope.places = [];
		places.getPlaces(geo).then(function(data){
			$scope.geoLoading = false;
			angular.forEach(data, function(place){
				place.pros = prosCount(place);
				place.cons = consCount(place);
				$scope.places.push(place);
			});

		},function(err){
			console.log(err);
		});
	}

	$scope.enableGeo = function(){
		$scope.geoEnabled = true;
		$scope.geoLoading = true;
		$window.navigator.geolocation.getCurrentPosition(function(data){
			loadPlaces({lat:data.coords.latitude,lon:data.coords.longitude});
		});		
	}

	loadPlaces();

}])