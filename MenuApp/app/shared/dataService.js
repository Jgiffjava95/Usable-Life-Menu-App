(function () {
    'use strict';

    angular
        .module('MenuApp')
        .factory('dataService', ['$http', '$q', function ($http, $q) {
            var service = {};

            service.getOrders = function () {
                var deferred = $q.defer();
                $http.get('/Order/Index').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                        deferred.reject();
                });
                return deferred.promise;
            };

            service.getItems = function () {
                var deferred = $q.defer();
                $http.get('/Order/GetItems').then(function (result) {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.addOrder = function (order) {
                //console.log(order.customerName);
                //console.log(order.orderPrice);
                //console.log(order.orderItems);
                var deferred = $q.defer();
                $http.post('/Order/Create', order).then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editOrder = function (order) {
                var deferred = $q.defer();
                $http.put('/Order/Edit', order).then(function () {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            service.editOrder = function (order) {
                var deferred = $q.defer();
                $http.delete('/Order/Delete', { id: id }).then(function () {
                    deferred.resolve(result.data);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            };

            return service;
        }]);
})();