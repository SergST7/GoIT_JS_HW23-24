/**
 * Created by SergST on 15.10.2016.
 */
/**
 * Created by SergST on 13.10.2016.
 */

//конструктор модели
// define('taskModel', ['Parse', 'jQuery'], function (Parse) {

var Model = function (data) {

	var self = this;
	self.data = data;

	self.addItem = function (item) {
		if (item.length == 0) {
			return
		}
		self.data.push(item);
		return self.data
	};

	self.removeItem = function (item) {
		var delIndex = self.data.indexOf(item);
		if (delIndex == -1) {
			return
		}
		self.data.splice(delIndex, 1);
		return self.data
	};

	self.editItem = function (item, newItem) {
		var index = self.data.indexOf(item);
		if (index === -1) {
			return;
		}
		self.data[index] = newItem;
		return self.data;
	};
};

var View = function (model) {
	var self = this;

	function init() {
		var wrapper = _.template($('#wrapp-tmpl').html());
		$('body').append(wrapper);

		self.elements = {
			newTask: $('.new-task'),
			addBtn: $('.add-btn'),
			listContainer: $('.item-list'),
			editInput: $('.changed-task')
		};

		self.renderList(model);
	}

	self.renderList = function (data) {
		var list = _.template($('#task-template').html());
		var res = list(data);
		self.elements.listContainer.html(res);
	};

	self.editItem = function (title, element) {
		var edit = _.template($('#edit-task-template').html());
		var res = edit({title: title});
		element.html(res);
	};

	init();
};

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

$(function () {

	var model = new Model(['Купить молоко', 'Выгулять собаку', 'Сходить в бассеин']);
	var view = new View(model);
	var controller = new Controller(model, view);

});

// 	return ModelTask;
// });

