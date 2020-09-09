var MenuApp = angular.module('MenuApp', []); //Main app module.

MenuApp.controller('orderController', function ($scope, $location, dataService, $http) {

	$scope.orders = [];

	$scope.getOrders = function () {
		$http.get('/Order/Index')
			.then(function (response) {
				$scope.orders = response.data;
				$scope.formatOrderDate();
			}, function (response) {
				console.log('error http getOrders: ' + response.status)
			});
	}

	$scope.formatOrderDate = function () {
		for (var i = 0; i < $scope.orders.length;) {
			var date = new Date(parseInt($scope.orders[i].timeOfOrder.substr(6)));
			$scope.orders[i].timeOfOrder = date;
			i++;
		}
	};
});
  