/**
 * Created by SergST on 13.10.2016.
 */

//конструктор модели
define(['Parse'], function (Parse) {
	var modelTask = Parse.Object.extend('Task', {
		defaults: {
			shared: false,
			done: false
		},
		validate: function (attrs) {
			if (!($.trim(attrs.title))) {
				return 'задача не может быть пустой'
			}
		},
		initialize: function () {
			this.on('error', function (model, error) {
				alert(error);
			});
		},
		//меняем свойство модели done-на противоположенное в зависимости от значения чекбокса
		toggleDoneSet: function () {
			this.get('done') ? this.save('done', false) : this.save('done', true)
		}
	});

	return modelTask;
});
;
