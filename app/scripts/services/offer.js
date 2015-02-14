'use strict';

angular.module('taskkaApp')
  .factory('Offer', function (FIREBASE_URL, $firebase, $q, Auth, Task) {
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
      cancelOffer: function (taskId, offerId) {
        return this.getOffer(taskId, offerId).$remove();
      },
      getOffer: function (taskId, offerId) {
        return $firebase(ref.child('offers').child(taskId).child(offerId));
      },

      isMaker: function (offer) {
        return (user && user.provider && user.uid === offer.uid);
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
      },
      acceptOffer: function (taskId, offerId, runnerId) {
        var o = this.getOffer(taskId, offerId);
        return o.$update({accepted:true}).then(function () {
          var t = Task.getTask(taskId);
          return t.$update({status:"assigned", runner: runnerId});
        });
      }


    }

    return Offer;
  });
