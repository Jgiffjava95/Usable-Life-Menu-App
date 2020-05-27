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
            $scope.totalItemPrices = 0;

            $scope.addOrderToList = function (item) {
                console.log(item);
                $scope.addPricesToTotalItemPrices(item.itemPrice);
                $scope.itemOrderList.push(item.itemName);
            };

            $scope.addPricesToTotalItemPrices = function (price) {
                console.log(price);
                $scope.totalItemPrices += price ;
            };


            $scope.removeFromOrderToList = function (index) {
                console.log(index);
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
