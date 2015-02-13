'use strict';

angular.module('taskkaApp')
    .factory('Offer', function (FIREBASE_URL, $firebase, $q, Auth) {
        var ref = new Firebase(FIREBASE_URL);
        var user = Auth.user;
        var Offer = {
            getAllOffers: function (taskId) {
                return $firebase(ref.child('offers').child(taskId)).$asArray();
            },

            makeOffer: function (taskId, offer) {
                var taskOffers = this.getAllOffers(taskId);
                offer.datetime = Firebase.ServerValue.TIMESTAMP;
                if (taskOffers) {
                    return taskOffers.$add(offer);
                }
            },
            isOffered: function (taskId) {
                if (user && user.provider) {
                    var d = $q.defer();
                    $firebase(ref.child('offers').child(taskId).orderByChild("uid")
                        .equalTo(user.uid)).$asArray()
                        .$loaded().then(function (data) {
                            d.resolve(data.length > 0);
                        }, function () {
                            d.reject(false);
                        });
                    return d.promise;
                }
            }
        }

        return Offer;
    });