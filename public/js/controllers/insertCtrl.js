angular.module('lunchApp')
.controller('insertCtrl', ['$scope','getGeoInfo','places', function ($scope,getGeoInfo,places) {

	$scope.placeToStore = {};
	$scope.locationNotFound = false;
	$scope.locationRetrieved = false;

	$scope.parseAddressComponents = function(posObj){
		var ac = posObj.address_components;
		$scope.placeToStore.address = {};
		for (var i in ac){
			var types = ac[i].types;
			if (types.indexOf("street_number") > -1) $scope.placeToStore.address.civic = ac[i].long_name;
			if (types.indexOf("route") > -1) $scope.placeToStore.address.street = ac[i].long_name;
			if (types.indexOf("locality") > -1) $scope.placeToStore.address.city = ac[i].long_name;
			if (types.indexOf("administrative_area_level_2") > -1) $scope.placeToStore.address.prov = ac[i].short_name;
			if (types.indexOf("postal_code") > -1) $scope.placeToStore.address.cap = ac[i].short_name;
		}
		$scope.placeToStore.loc = {
			type: "Point",
			coordinates : [ 
				posObj.geometry.location.lng,
				posObj.geometry.location.lat 
			]
		}
		$scope.locationRetrieved = true;
	}

	$scope.getPosition = function(){
		if ($scope.address) {
			getGeoInfo.getLatLon($scope.address).then(function(data){
				var posObj = data.data.results[0];
				if (posObj){
					$scope.parseAddressComponents(posObj);
					$scope.locationNotFound = false;
				}
				else {
					$scope.locationNotFound = true;
				}
			});
		}
	}

    $scope.save = function(){
    	console.log("saving json")
		places.savePlace($scope.placeToStore).then(function(data){
			console.log("saved");
		}, function(err){
			console.log("error saving");
		});
	}

}]);
