'use strict';

angular.module('taskkaApp')
    .factory('Task', function (FIREBASE_URL, $firebase, Auth) {
        var ref = new Firebase(FIREBASE_URL);
        var tasks = $firebase(ref.child('tasks')).$asArray();
        var user = Auth.user;

        var Task = {
            all: tasks,
            getTask: function (taskId) {
                return $firebase(ref.child('tasks').child(taskId));
            },

            createTask: function(task) {
                task.datetime = Firebase.ServerValue.TIMESTAMP;
                return tasks.$add(task);
            },

            editTask: function (task) {
                var t = this.getTask(task.$id);
                return t.$update( {
                    title: task.title,
                    description: task.description,
                    price: task.price
                });
            },

            cancelTask: function(taskId) {
                var t = this.getTask(taskId);
                return t.$update({status: "cancelled"});
            },

            isCreator: function(task) {
                return (user && user.provider && user.uid === task.poster)
            },

            isOpen: function (task) {
                return task.status === "open";
            }
        }

        return Task;
    });