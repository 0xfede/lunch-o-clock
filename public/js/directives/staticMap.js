angular.module('lunchApp')
.directive('staticMap', [function () {
	return {
		restrict: 'E',
		scope: {
			data : "="
		},
		templateUrl: './partials/staticmap.tpl.html',
		link: function (scope, iElement, iAttrs) {
			scope.apikey 	= "AIzaSyDeyQNp1ywHcgwuqqIFfLqVX_KEt8s0oQQ";
			scope.zoom 		= iAttrs.zoom;
			scope.mapWidth  = iAttrs.mapwidth  || "150";
			scope.mapHeight = iAttrs.mapheight || "100";
			scope.place 	= scope.data;
		}
	};
}])