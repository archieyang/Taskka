'use strict';

angular.module('taskkaApp')
    .factory('Comment', function (FIREBASE_URL, $firebase) {
        var ref = new Firebase(FIREBASE_URL);
        var Comment = {
            getAllComments: function (taskId) {
                return $firebase(ref.child('comments').child(taskId)).$asArray();
            },

            addComment: function (taskId, comment) {
                var taskComments = this.getAllComments(taskId);
                comment.datetime = Firebase.ServerValue.TIMESTAMP;
                if (taskComments) {
                    return taskComments.$add(comment);
                }
            }
        }

        return Comment;
    });