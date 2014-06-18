angular.module('lunchApp', ['ngRoute','ngResource','ngCookies','ui.bootstrap'])
.config(['$routeProvider',function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: './partials/list.html',
			controller: 'placesCtrl'
		}).
		when('/places/:placeid', {
			templateUrl: './partials/place.html',
			controller: 'placeCtrl'
		}).
		otherwise({ 
			redirectTo: '/' 
		});
}])
.filter('distance', function () {
	return function (input) {
		input = parseInt(input);
	    if (input >= 1000) {
	        return (input/1000).toFixed(2) + 'km';
	    } else {
	        return input + 'm';
	    }
	}
});
