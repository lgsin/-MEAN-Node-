'use strict';
(function(){
    var app = angular.module('nApp', ['services','directives']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'indexCtr'
            })
            //每一个地点的详情页
            .when('/page_detail/:companyId', {
                templateUrl: 'views/page_detail.html',
                controller: 'pageDetailCtr',
                resolve: {
                    hadPath: function(pathsLoader) {
                        return pathsLoader();
                    }
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtr'
            })
            .when('/myTicket/booking', {
                templateUrl: 'views/booking.html',
                controller: 'bookingCtr',
                // 响应后才显示界面
                resolve: {
                    hadTickets: function(ticketsLoader) {
                        return ticketsLoader();
                    }
                }
            })
            .when('/myTicket/booked', {
                templateUrl: 'views/booked.html',
                controller: 'bookedCtr',
                resolve: {
                    hadTickets: function(ticketsLoader) {
                        return ticketsLoader();
                    }
                }
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
                controller: 'mesPeopleCtr',
                resolve: {
                    friends: function(FriendLoader) {
                        return FriendLoader();
                    }
                }
            })
            /* 商家模块 */
             .when('/company/mes', {
                templateUrl: 'views/company.html',
                controller: 'mesCompanyCtr',
                resolve: {
                    hadPath: function(pathsLoader) {
                        return pathsLoader();
                    }
                }
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
