angular.module('lunchApp').factory('places', ['$resource',function ($resource) {
	
	var places = $resource("./places/:id",{id: "@id"});
	var votes  = $resource("./places/:id/:type/:attr",{},{
		upvote: {method:'PUT', params: {id:"@id",type:"@type",attr:"@attr"}},
  		downvote: {method:'DELETE', params: {id:"@id",type:"@type",attr:"@attr"} }
		
	});

	return {

		getPlaces : function(geo){
			if (geo) return places.query({ lat : geo.lat, lon : geo.lon }).$promise;
			return places.query().$promise;
		},

		getPlaceById : function(id){
			return places.get({id:id}).$promise;
		},

		addVote : function(placeid,cat,attrId){
			return votes.upvote({id:placeid,type:cat,attr:attrId}).$promise;
		},

		remVote : function(placeid,cat,attrId){
			return votes.downvote({id:placeid,type:cat,attr:attrId}).$promise;
		}

	};

}]);