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

            $scope.chosenItems = [];
            $scope.totalItemPrices = 0;

            $scope.addOrderToList = function (item) {
                $scope.addPricesToTotalItemPrices(item.itemPrice);
                $scope.chosenItems.push({'Name': item.itemName, 'Price': item.itemPrice});
            };

            $scope.addPricesToTotalItemPrices = function (price) {
                $scope.totalItemPrices += price ;
            };

            $scope.removePricesFromTotalItemPrices = function (price) {
                $scope.totalItemPrices -= price;
            };


            $scope.removeFromOrderToList = function (item) {
                $scope.removePricesFromTotalItemPrices(item.Price);
                $scope.chosenItems.splice(item, 1); //FIX THIS
            };

            $scope.createOrder = function (order) {
                var itemList = [];
                for (var i = 0; i < $scope.chosenItems.length;) {
                    console.log($scope.chosenItems[i].Name);
                    itemList.push($scope.chosenItems[i].Name);
                    i++;
                }
                var myJson = JSON.stringify(itemList);
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
