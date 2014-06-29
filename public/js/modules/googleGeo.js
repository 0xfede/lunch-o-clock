angular.module('googleGeo', [])
.factory('getGeoInfo', ['$http',function ($http) {
	
	var wsUrl = "https://maps.googleapis.com/maps/api/geocode/json";
	var apiKey = "AIzaSyDeyQNp1ywHcgwuqqIFfLqVX_KEt8s0oQQ";
	return {

		getLatLon : function(address){
			return $http.get(wsUrl,{ params : {address:address,apiKey:apiKey} });
		}

	};
}])