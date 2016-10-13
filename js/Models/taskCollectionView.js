/**
 * Created by SergST on 13.10.2016.
 */


define(['Parse'], function (Parse) {

//конструктор вьюхи для коллекции задач

	var tasksCollectionView = Parse.View.extend({
		tagName: 'ul',

		initialize: function () {
			this.collection.on('add', this.addOne, this);   //при добавлении элемента в коллекцию выполним addOne
			vent.on('deleteDone', this.deleteDone, this);
			vent.on('deleteAll', this.deleteAll, this);
			// vent.on('doneAll', this.doneAll, this);
			//  vent.on('login logout', this.toggle, this);
			vent.on('logout', this.erase, this);
			//  $('#main').html(this.render().el);
			//  this.$el.hide();
			this.render();
		},

		toggle: function () {
			//     this.$el.toggle();
		},

		erase: function () {
			this.collection.reset();
			this.$el.html('');
		},

		render: function () {
			this.collection.each(this.addOne, this);
			return this
		},

		//добавляем новый элемент в коллекцию (в аргумент передана модель)
		addOne: function (task) {
			var targetView = new App.Views.TaskView({model: task});
			this.$el.append(targetView.render().el)
		},

		deleteDone: function () {                                   // удаляем выполненные задачи
			_.each(this.collection.getDoneArr(), function (model) {
				model.destroy();
			});
			return false;
		},

		deleteAll: function () {                                 // удаляем все задачи
			for (var i = 0; i < this.collection.length; i++) {
				this.collection.models[i].destroy();
				i--;
			}
			console.log(this.collection)
		}
	});

	return tasksCollectionView;
});


