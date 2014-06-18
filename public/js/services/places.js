angular.module('lunchApp').factory('places', ['$resource',function ($resource) {
	
	var places = $resource("./places/:id",{id: "@_id"});

	return {

		getPlaces : function(geo){
			var params = {};
			/*
			if (geo) params = { lat : geo.lat, lon : geo.lon };
			return $http.get("./data/places.json",{
				params : params
			});
			*/
			if (geo) return places.query({ lat : geo.lat, lon : geo.lon }).$promise;
			return places.query().$promise;

		},

		getPlaceById : function(id){
			//return $http.get("./data/place_"+id+".json");
			return places.get(id).$promise;
		}

	};

}]);