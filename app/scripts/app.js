'use strict';
(function(){
    var app = angular.module('nApp', []);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'indexCtr'
            })
            //每一个地点的详情页
            .when('/page_detail/:id', {
                templateUrl: 'views/page_detail.html',
                controller: 'pageDetailCtr'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtr'
            })
            .when('/myTicket/booking', {
                templateUrl: 'views/booking.html',
                controller: 'bookingCtr'
            })
            .when('/myTicket/booked', {
                templateUrl: 'views/booked.html',
                controller: 'bookedCtr'
            })
            .when('/self/selfMes', {
                templateUrl: 'views/selfMes.html',
                controller: 'selfMesCtr'
            })
            .when('/self/safe', {
                templateUrl: 'views/safe.html',
                controller: 'safeCtr'
            })
            .when('/mes/people', {
                templateUrl: 'views/mesPeople.html',
                controller: 'mesPeopleCtr'
            })
            /* 商家模块 */
             .when('/company/mes', {
                templateUrl: 'views/company.html',
                controller: 'mesCompanyCtr'
            })
            .when('/company/booked', {
                templateUrl: 'views/companyBooked.html',
                controller: 'companyBookedCtr'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

}.call(this));
