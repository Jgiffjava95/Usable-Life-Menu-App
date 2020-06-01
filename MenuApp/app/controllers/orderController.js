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
                //console.log(item.itemName);
                $scope.addPricesToTotalItemPrices(item.itemPrice);
                $scope.itemOrderList.push({ 'itemName': item.itemName, 'itemPrice': item.itemPrice });
            };

            $scope.addPricesToTotalItemPrices = function (price) {
                //console.log(price);
                $scope.totalItemPrices += price ;
            };

            $scope.removePricesFromTotalItemPrices = function (price) {
                $scope.totalItemPrices -= price;
            };


            $scope.removeFromOrderToList = function (item) {
                $scope.removePricesFromTotalItemPrices(item.itemPrice);
                $scope.itemOrderList.splice(item, 1); //FIX THIS
            };

            $scope.createOrder = function (order) {
                //loop through and get only item names to be turned to string
                var myJson = JSON.stringify($scope.itemOrderList.itemName);
                //console.log(myJson);
                //console.log($scope.totalItemPrices);
                order.orderPrice = $scope.totalItemPrices;
                order.orderItems = myJson;
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
