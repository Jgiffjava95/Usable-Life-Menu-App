(function () {
    'use strict';

    angular.module('MenuApp', [
        'ngRoute'
    ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/', {
                    controller: 'orderController',
                    templateUrl: '/app/templates/orderHistory.html'

                })
                .when('/addorder', {
                    controller: 'orderAddCtrl',
                    templateUrl: '/app/templates/addOrder.html'

                })
                .otherwise({ redirectTo: '/' });
        }]);
})();