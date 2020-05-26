(function () {
    'use strict';

    angular
        .module('MenuApp')
        .controller('orderController', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.orders = [];

            getData();

            function getData() {
                dataService.getOrders().then(function (result) {
                    $scope.orders = result;

                });
            }
        }])

        .controller('orderAddCtrl', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {

            $scope.itemOrderList = [];

            $scope.addOrderToList = function (item) {
                console.log(item);
                $scope.itemOrderList.push(item);
            };

            $scope.removeFromOrderToList = function (index) {
                $scope.itemOrderList.splice(index, 1);
            };

            $scope.createOrder = function (order) {
                dataService.addOrder(order).then(function () {
                    $location.path('/');
                });
            };

            getItems();

            function getItems() {
                dataService.getItems().then(function (result) {
                    $scope.Items = result;
                });
            }
        }]);

})();
