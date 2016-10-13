/**
 * Created by SergST on 13.10.2016.
 */

define(['Parse'], function(Parse){

// вьюха добавления задач в список
 var addNewTaskView = Parse.View.extend({
	el: '#add-new-task',
	template: $('#add-task').html(),

	events: {
		'click .add-submit': 'submit',
		'click #done-all': 'doneAll'
	},

	//отмечаем весь список задач как выполненный (либо наоборот)
	doneAll: function () {
		this.collection.each(function (model) {
			model.save({done: $('#done-all').prop('checked') ? true : false})
		})
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(this.template);
		return this;
	},

	toggle: function () {
		//   this.$el.toggle();
	},

	submit: function (e) {
		e.preventDefault();
		var target = new App.Models.Task();
		target.save({
			title: this.$el.find('.new-task').val(),
			user: Parse.User.current()
		}, {
			success: function (model) {
				this.collection.add(model);
			}.bind(this),
			error: function (error) {
				console.log(error.message)
			}
		});
		this.$el.find('.new-task').val('');
	}
});

	return addNewTaskView;
});