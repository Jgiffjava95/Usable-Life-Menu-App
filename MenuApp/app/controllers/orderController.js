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
            $scope.calcPriceBeforeDiscount = 0;
            $scope.selectedDiscount = "";
            $scope.finalPrice = 0;
            $scope.totalItemPrices = 0;
            $scope.id = 0;
            $scope.userId = "";
            $scope.orderSavings = 0;
            $scope.arkansasSalesTaxAmount = 6.5;
            $scope.taxAmountForCurrentOrder = 0;

            $scope.addOrderToList = function (item) {
                $scope.addPricesToTotalItemPrices(item.itemPrice);
                $scope.chosenItems.push({ 'Name': item.itemName, 'Price': item.itemPrice, 'id': $scope.id });
                $scope.id += 1;
            };

            $scope.addPricesToTotalItemPrices = function (price) {
                $scope.calcPriceBeforeDiscount += price;
                $scope.calculateFinalPrice($scope.calcPriceBeforeDiscount);
            };

            $scope.removePricesFromTotalItemPrices = function (price) {
                $scope.calcPriceBeforeDiscount -= price;
                $scope.calculateFinalPrice($scope.calcPriceBeforeDiscount);
            };

            $scope.calculateFinalPrice = function (total) {
                if ($scope.selectedDiscount == "") {
                    $scope.selectedDiscount = { 'discountAmount': 0 };
                }
                var calcDiscountPrice = (total * $scope.selectedDiscount.discountAmount) / 100;
                var finalBeforeTaxAdded = total - calcDiscountPrice;

                var calcSalesTax = (finalBeforeTaxAdded * $scope.arkansasSalesTaxAmount) / 100;

                $scope.orderSavings = calcDiscountPrice;

                $scope.taxAmountForCurrentOrder = calcSalesTax;

                $scope.finalPrice = total - calcDiscountPrice + $scope.taxAmountForCurrentOrder;
            };

            $scope.updatePriceAfterDiscountApplied = function () {
                $scope.calculateFinalPrice($scope.calcPriceBeforeDiscount);
            }

            $scope.removeFromOrderToList = function (item) {
                $scope.removePricesFromTotalItemPrices(item.Price);
                for (var i = 0; i < $scope.chosenItems.length;) {
                    if (item.id == $scope.chosenItems[i].id) {
                        console.log($scope.chosenItems[i].Name + " " + $scope.chosenItems[i].Price);
                        $scope.chosenItems.splice(i, 1);
                        i = 0;
                        break;
                    }
                    i++;
                }
            };

            $scope.createOrder = function (order) {
                console.log($scope.selectedDiscount.discountAmount);
                var itemList = [];
                for (var i = 0; i < $scope.chosenItems.length;) {
                    console.log($scope.chosenItems[i].Name);
                    itemList.push($scope.chosenItems[i].Name);
                    i++;
                }
                var myJson = JSON.stringify(itemList);

                order.orderPrice = $scope.finalPrice.toFixed(2);  //look at toFixed(2)
                order.orderItems = myJson;
                dataService.addOrder(order).then(function () {
                    $location.path('/');
                });
            };

            getEverything();
            function getEverything() {
                getItems();
                getDiscounts();
            }

            function getItems() {
                dataService.getItems().then(function (result) {
                    $scope.Items = result;
                });
            };

            function getDiscounts() {
                dataService.getDiscounts().then(function (result) {
                    $scope.Discounts = result;
                });
            };

            $scope.loginUser = function () {
                console.log($scope.userId);
                dataService.getUserById($scope.userId).then(function (result) {
                    $scope.Items = result;
                });
            };
        }]);

})();
