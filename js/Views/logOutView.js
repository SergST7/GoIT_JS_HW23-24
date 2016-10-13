/**
 * Created by SergST on 13.10.2016.
 */


define(['Parse'], function (Parse) {


var logOutView = Parse.View.extend({
	el: '#logout',

	template: $('#logout-template').html(),

	events: {
		'click .logout-btn': 'logout'
	},

	render: function () {
		this.$el.html(this.template);
		return this;
	},

	initialize: function () {
		// this.checkLogIn();                       //выводим имя текущего пользователя
		this.render()
	},

	logout: function () {
		Parse.User.logOut();
		// vent.trigger('logout');           //генерим событие логаут
		//this.checkLogIn();
		console.log('Выход успешен');
		//  this.clearError();
	},

	//выводим имя текущего пользователя
	checkLogIn: function () {
		var currentUser = Parse.User.current();
		if (currentUser) {
			console.log('Current user :' + currentUser.get('username'));
			$('.current-user').html('User: ' + currentUser.get('username'));
		}
		else {
			$('.current-user').html('');
			console.log('no current user');
		}
	}
});