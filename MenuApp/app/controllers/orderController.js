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
            $scope.frontEndValidationText = "";
            $scope.mainItems = [];
            $scope.sideItems = [];
            $scope.drinkItems = [];

            $scope.addOrderToList = function (item) {
                $scope.addPricesToTotalItemPrices(item.itemPrice);
                $scope.chosenItems.push({ 'Name': item.itemName, 'Price': item.itemPrice, 'id': $scope.id });
                $scope.id += 1;
            };

            $scope.addPricesToTotalItemPrices = function (price) {
                $scope.calcPriceBeforeDiscount += price;
                console.log($scope.calcPriceBeforeDiscount);
                $scope.calculateFinalPrice($scope.calcPriceBeforeDiscount);
            };

            $scope.removePricesFromTotalItemPrices = function (price) {
                $scope.calcPriceBeforeDiscount -= price;
                $scope.calculateFinalPrice($scope.calcPriceBeforeDiscount);
            };

            $scope.checkDiscountStatus = function () {
                if ($scope.selectedDiscount == "") {
                    $scope.selectedDiscount.discountAmount =  0;
                    $scope.selectedDiscount.discountName = "No Discount";
                    $scope.selectedDiscount.discoundId = 3;
                }
            }

            $scope.calculateFinalPrice = function (total) {

                $scope.checkDiscountStatus();
                console.log("selectedDiscount" + " " + $scope.selectedDiscount.discountName);
                    console.log("total" + total);
                    var calcDiscountPrice = (total * $scope.selectedDiscount.discountAmount) / 100;
                    console.log("calcDiscountPrice" + calcDiscountPrice);
                    var finalBeforeTaxAdded = total - calcDiscountPrice;
                    console.log("finalBeforeTaxAdded" + finalBeforeTaxAdded);
                    var calcSalesTax = (finalBeforeTaxAdded * $scope.arkansasSalesTaxAmount) / 100;
                    console.log("calcSalesTax" + calcSalesTax);
                    $scope.orderSavings = calcDiscountPrice;
                    console.log("orderSavings" + $scope.orderSavings);
                    $scope.taxAmountForCurrentOrder = calcSalesTax;
                    console.log("taxAmountForCurrentOrder" + $scope.taxAmountForCurrentOrder);
                    $scope.finalPrice = total - calcDiscountPrice + $scope.taxAmountForCurrentOrder;
                    console.log("final price" + $scope.finalPrice);
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
                $scope.frontEndValidationText = "";
                var itemList = [];
                for (var i = 0; i < $scope.chosenItems.length;) {
                    console.log($scope.chosenItems[i].Name);
                    itemList.push($scope.chosenItems[i].Name);
                    i++;
                }
                if (itemList[0] == null) {
                    $scope.frontEndValidationText = "Order must contain at least one item.";

              
                } else {

                    var myJson = JSON.stringify(itemList);

                    $scope.checkDiscountStatus();
                    console.log($scope.selectedDiscount);

                    order.orderPrice = $scope.finalPrice.toFixed(2);
                    order.itemDiscountId = $scope.selectedDiscount;
                    order.orderItems = myJson;
                    console.log(order);

                    $http.post('/Order/Create', order)
                        .then(
                            function success(response) {
                                $scope.successfulInsert = true;
                                console.log('status: ' + response.status);
                                $scope.postStatus = response.data;
                            },
                            function error(response) {
                                console.log('error, return status: ' + response.status);
                                $scope.createStatus = 'insert error, ' + response.data.message;
                            }
                        );
                }
            };

            $scope.getEverything = function () {
                $scope.getItems();
                getDiscounts();
            }

            function getDiscounts() {
                dataService.getDiscounts().then(function (result) {
                    $scope.Discounts = result;
                    for (var i = 0; i < $scope.Discounts.length; i++) {
                        console.log($scope.Discounts[i]);
                    }
                });
            };

            $scope.getItems = function () {
                $http.get('/Order/GetItems')
                    .then(function (response) {
                        $scope.Items = response.data;
                        for (var i = 0; i < $scope.Items.length; i++) {
                            console.log($scope.Items[i].typeId);
                        }
                        $scope.organizeItemsByType($scope.Items);
                    }, function (response) {
                        console.log('error http getItems: ' + response.status)
                    });
            };

            $scope.organizeItemsByType = function (items) {
                for (var i = 0; i < items.length; i++) {
                    console.log("Item name:" + items[i].itemName + "Item type:" + items[i].typeId.typeName);
                    if (items[i].typeId.typeName == "Main") {
                        $scope.mainItems.push(items[i]);
                    } else if (items[i].typeId.typeName == "Side") {
                        $scope.sideItems.push(items[i]);
                    } else if (items[i].typeId.typeName == "Drink") {
                        $scope.drinkItems.push(items[i]);
                    }

                }
            }

        }]);

})();
