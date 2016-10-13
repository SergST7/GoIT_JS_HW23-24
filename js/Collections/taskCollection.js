/**
 * Created by SergST on 13.10.2016.
 */

define(['Parse'], function(Parse){

//конструктор для коллекции задач
	var tasksCollection = Parse.Collection.extend({
		model: App.Models.Task,

		initialize: function () {
			vent.on('login', this.getElements, this);         //при успешном логине выполняем запрос заданий с сервера
			// this.getElements();
		},

		getDoneArr: function () {
			return this.filter(function (tasks) {
				return tasks.get('done');
			});
		},

		//запрос  списка заданий с сервера для текущего юзера
		getElements: function () {
			var user = Parse.User.current();
			var query1 = new Parse.Query(this.model);                     //запрос списка задач текущего пользователя
			var query2 = new Parse.Query(this.model);                    //запрос для шаринга
			query1.equalTo("user", user);
			query2.equalTo("sharedFor", user);                           //запрос для шаринга
			var mainQuery = Parse.Query.or(query1, query2);              //объединим два запроса
			mainQuery.find({
				success: function (res) {
					targetsCollection.reset();
					console.log(res);
					for (var i in res) {
						targetsCollection.add(res[i]);        //заполним колекцию списком с сервера, для каждого элемента
					}                                         // сработает событие add, которое отработает вьюха
				},                                            //(в аргумент передана модель)
				error: function (er) {
					console.log('Query error ' + er.massage)
				}
			});
		}
	});

	return tasksCollection;
});