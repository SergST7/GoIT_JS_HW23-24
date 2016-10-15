/**
 * Created by SergST on 15.10.2016.
 */

//конструктор контроллера
define( [], function () {

	var Controller = function (model, view) {
		var self = this;

		view.elements.addBtn.on('click', addItem);
		view.elements.listContainer.on('click', '.delete', removeItem);
		view.elements.listContainer.on('click', '.edit', editItem);
		view.elements.listContainer.on('dblclick', '.task-item', editItem);
		view.elements.listContainer.on('blur', '.changed-task', saveEditItem);

		function addItem() {
			var newItem = view.elements.newTask.val();
			model.addItem(newItem);
			view.renderList(model);
			view.elements.newTask.val('');

		}

		function removeItem() {
			var item = $(this).parent().attr('data-val');
			model.removeItem(item);
			view.renderList(model);
		}

		function editItem() {
			var item = $(this).attr('data-val');
			var el = $(this);
			if (!item) {
				item = $(this).parent().attr('data-val');
				el = $(this).parent();
			}

			view.editItem(item, el);
			el.find("input[type='text']").focus()
		}

		function saveEditItem() {
			var newItem = $(this).val();
			var item = $(this).parent().attr('data-val');
			model.editItem(item, newItem);
			view.renderList(model);
		}

	};

	return Controller

});