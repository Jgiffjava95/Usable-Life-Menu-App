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

                    var formatedDate = formatJsonDate($scope.orders);

                    for (var i = 0; i < $scope.orders.length; i++) {
                        for (var i = 0; i < formatedDate.length; i++) {
                            $scope.orders[i].timeOfOrder = formatedDate[i].timeOfOrder;
                        }
                    }

                })

            };

            function formatJsonDate(orders) {

                for (var i = 0; i < orders.length;) {
                    var date = new Date(parseInt(orders[i].timeOfOrder.substr(6)));
                    orders[i].timeOfOrder = date;
                    i++;
                }
                return orders;
            };

        }])
        .controller('orderAddCtrl', ['$scope', '$location', 'dataService', '$http', function ($scope, $location, dataService, $http) {

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

                order.orderPrice = $scope.finalPrice.toFixed(2);
                order.orderItems = myJson;

                $http.post('/Order/Create', order)
                    .then(
                        function success(response) {
                            $scope.successfulInsert = true;
                            console.log('status: ' + response.status);
                            $scope.postSuccess = response.data;
                            console.log($scope.postSuccess);
                        },
                        function error(response) {
                            console.log('error, return status: ' + response.status);
                            $scope.createStatus = 'insert error, ' + response.data.message;
                        }
                    );			
            };

            $scope.getEverything = function () {
                $scope.getItems();
                getDiscounts();
            }

            function getDiscounts() {
                dataService.getDiscounts().then(function (result) {
                    $scope.Discounts = result;
                });
            };

            $scope.getItems = function () {
                $http.get('/Order/GetItems')
                    .then(function (response) {
                        $scope.Items = response.data;
                    }, function (response) {
                        console.log('error http getItems: ' + response.status)
                    });
            }
	       
        }]);

})();
