/**
 * Created by SergST on 13.10.2016.
 */

define(['Parse'], function (Parse) {

	//конструктор въюхи для модели
	var taskView = Parse.View.extend({
		tagName: 'li',
		template: _.template($('#task-template').html()), //шалблон для отрисовки экземпляра модели

		//вешаем на кнопки обработчики событий
		events: {
			'click .edit': 'editTask',
			'click .edit-cancel': 'editCancel',
			'click .edit-confirm': 'editConfirm',
			'click .share-task-btn': 'shareTask', //расшарить задачу по е-мейлу
			'click .done-toggle': 'toggleDone',
			'click .delete': 'delete',
			'swipeleft': 'animate'               //свайп с помощью hammer + jquery
		},

		//вешаем слушателей на изменение и удаление модели
		initialize: function () {

			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
			this.$el.on('transitionend', this.transType.bind(this));
			vent.on('filterDone', this.filterDone, this);     //события на фильтры, генерируются роутером
			vent.on('filterAll', this.filterAll, this);
			vent.on('filterActive', this.filterActive, this);

		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			this.doneClassSet();    //перечеркиваем выполненные задания
			this.sharedClassSet();  // добывим иконку к шаренным
			return this
		},

		//расшарить задачу по е-мейлу
		shareTask: function () {
			var shareFor = prompt('Введине e-mail пользователя', '');
			if (shareFor === null) return;

			var relation = this.model.relation("sharedFor");
			var query = new Parse.Query(Parse.User);
			query.equalTo("email", shareFor);               //
			query.first().then(function (res) {
				if (!res) {
					console.log('No such user or wrong email');
					return Parse.Promise.error("There was an error.")
				}
				console.log('Task shared for: ' + res.get('username'));
				relation.add(res);
				this.model.set('shared', true);
				return this.model.save();
			}.bind(this));
		},

		// редактируем задачу с помощью смены шаблона
		editTask: function () {
			this.template = _.template($('#edit-task-template').html());
			this.$el.html(this.template(this.model.attributes));
			this.$el.find("input[type='text']").focus();
		},

		//отмена изменений
		editCancel: function () {
			this.template = _.template($('#task-template').html());
			this.$el.html(this.template(this.model.attributes));
		},

		//сохраним изменения
		editConfirm: function () {
			var changedTask = this.$el.find("input[type='text']").val();
			this.model.save('title', changedTask);
			this.editCancel();
		},

		toggleDone: function () {
			this.model.toggleDoneSet();
			this.doneClassSet();
		},

		//перечеркиваем выполненные задания
		doneClassSet: function () {
			if (this.model.get('done')) {
				this.$el.addClass('target-done');
				this.$el.find("input[type='button']").attr({disabled: "disabled"});
			}
			else this.$el.removeClass('target-done')
		},

		// добывим иконку к шаренным
		sharedClassSet: function () {
			if (this.model.get('shared')) {
				this.$el.addClass('sharedFor');
			}
			else this.$el.removeClass('sharedFor')
		},

		// отобразить выполненные
		filterDone: function () {
			this.filterAll();
			if (!this.model.get('done'))
				this.$el.hide();
		},

		// отобразить все
		filterAll: function () {
			this.$el.show();
		},

		// отобразить не выполненные
		filterActive: function () {
			this.filterAll();
			if (this.model.get('done'))
				this.$el.hide();
		},

		animate: function () {
			this.$el.css({'right': '1000px', 'height': '0'});
		},

		//удаляем модель
		delete: function () {
			this.model.destroy();
			console.log('модель удалена');
		},

		//удаляем элемент модели из DOM
		remove: function () {
			this.$el.remove()
		}
	});

	return taskView;
});

