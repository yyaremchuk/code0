(function () {
	'use strict';

	angular.module('movieManager', [])
	.controller('TabController', [function() {
		this.tab = 1;

		this.selectTab = function(aTab) {
			this.tab = aTab;
		};

		this.isSelected = function(aTab) {
			return this.tab === aTab;
		};
	}])
	.factory('MovieService', ['$http', function($http) {
		var movies = [];

		$http.get('/movies').success(function(data) {
			movies = data;
		});

		var getAll = function() {
			return movies;
		};

		var save = function(aMovie) {
			console.log('adding new movie');

			$http.post('/movies', aMovie).success(function(data) {
				console.log(data);
				movies.push(aMovie);
			});
		};

		return {
			getAll: getAll,
			save: save
		};
	}])
	.controller('MovieListController', ['MovieService', function(MovieService) {
		this.movies = MovieService.getAll();
	}])
	.controller('MovieFormController', ['MovieService', function(MovieService) {
		this.model = {};

		this.addMovie = function() {
			this.model.added = +new Date();
			this.model.type = 'N/A';
			MovieService.save(this.model);
			this.model = {};
		};
	}])
	.directive('movieList', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/movies/index.html',
			controller: 'MovieListController',
			controllerAs: 'movieList',
			scope: {
				filterBy: '='
			}
		};
	})
	.directive('movieTabs', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/movies/tabs.html',
			controller: 'TabController',
			controllerAs: 'tab'
		};
	});

})();