/**
 * Created by SergST on 13.10.2016.
 */

define(['Parse'], function (Parse) {

//вьюха удаления выполненых задач и очистка списка
	var manageTaskView = Parse.View.extend({
		el: '#manage-task',

		template: $('#manage-task-template').html(),

		events: {
			'click .delete-done': 'deleteDone',
			'click .delete-all': 'deleteAll',
			'click .change-pic-btn': 'changePicture'
		},

		initialize: function () {
			//  this.$el.hide();
			// vent.on('login logout', this.toggle, this);
			this.render();
		},

		render: function () {
			this.$el.html(this.template);
			return this;
		},

		toggle: function () {
			//    this.$el.toggle();
		},

		deleteDone: function () {
			vent.trigger('deleteDone')
		},

		deleteAll: function () {
			vent.trigger('deleteAll')
		},

	});

	return manageTaskView;
});

