/**
 * Created by SergST on 14.10.2016.
 */


requirejs.config({
	baseUrl: "js/lib",
	paths: {
		jquery: 'jquery-3.1.0',
		backbone: 'backbone',
		underscore: 'underscore',
		parse: 'parse',
		domready: 'domReady',
		appControllers: '../Controllers',
		appCollections: '../Collections',
		appModels: '../Models',
		appViews: '../Views',
		appRouters: '../Routers'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'parse':{
			deps: ['underscore', 'jquery'],
			exports: 'Parse'
		}
	}
});

require([
	'domReady',
	'appModels/taskModel',
	'appCollections/taskCollection',
	'appViews/AddNewTaskView',
	'appViews/taskView',
	'appViews/taskCollectionView',
	'appViews/manageTaskView',
	'appViews/manageRouteView',
	'appViews/logOutView',
	'appViews/logInView',
	'appRouters/router',
	// 'appControllers/appController',
	'jquery',
	'backbone',
	'parse',
	'underscore'
	], function(domReady, taskModel, taskCollection, AddNewTaskView, taskView, taskCollectionView,
              manageTaskView, 	manageRouteView, logOutView, logInView, router, $, Backbone, Parse, _){

	domReady(function () {


		Parse.$ = $;

		Parse.initialize("tGOmSEGNuVWmlADWKBd7pcmmx4wx8wEHnCPl8gzx", "uIllWQ7PJ5RT7qSFjR01i9BrnQh6Kr95U09unqCu");

		//расширим стандартный объект событий нашими собственными
		var vent = {};
		_.extend(vent, Backbone.Events);

		var targetsCollection = new taskCollection;

		var manageRouteView = new manageRouteView;
		new router();
		Backbone.history.start();

	});
});