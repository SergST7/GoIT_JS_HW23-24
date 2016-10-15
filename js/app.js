/**
 * Created by SergST on 14.10.2016.
 */

requirejs.config({
	baseUrl: "js/lib",
	paths: {
		jquery: 'jquery-3.1.0',
		underscore: 'underscore',
		appModels: '../Models',
		appViews: '../Views',
		appController: '../Controllers',
	},
	shim: {
		'underscore': {
			exports: '_'
		},
	}
});

require([
	'jquery',
	'underscore',
	'appModels/model',
	'appViews/view',
	'appController/controller'
], function ($, _, Model, View, Controller) {

	$(function () {
		var model = new Model(['Купить молоко', 'Выгулять собаку', 'Сходить в бассеин']);
		var view = new View(model);
		var controller = new Controller(model, view);
	});

});