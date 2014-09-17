'use strict';

angular.module('nApp')

  /*
   * '/' index.html indexCtr
   */
  .controller('indexCtr', ['$scope','$http',
    function ($scope,$http) {
      // 获取 已有公司
      $http.get('/api/getCompany').success(function(data) {
        $scope.hadCompanys = data.companys;
      })

  }])

  /*
   * '/detail:id' page_detail.html pageDetailCtr
   */
  .controller('pageDetailCtr', ['$scope','$routeParams','$http','$rootScope','FRIEND','hadPath',
    function ($scope,$routeParams,$http,$rootScope,FRIEND,hadPath) {
      console.log($routeParams.id) 
      // 获取 对应公司的所有路线
      $scope.paths =  hadPath;

      // 初始化 ticketForm
      $scope.ticketForm = {};

      //购买车票
      $scope.bookTicket = function(){
        $scope.isDialog = !$scope.isDialog;
        var len = $scope.hadFriends.length;
        for (var i = 0; i < len; i++) {
          if ($scope.hadFriends[i].isSelect) {
            var bookingTicket = {
              userId : $rootScope.user._id,
              bookingId: $scope.hadFriends[i]._id,
              name: $scope.hadFriends[i].name,
              phone: $scope.hadFriends[i].phone,
              beginP: $scope.selectedPath.beginName,
              endP: $scope.selectedPath.endName,
              date: $scope.selectedPath.time,
              price: $scope.selectedPath.price,
              companyId: $scope.selectedPath.companyId
            }
            // 异步请求导致 db object already connecting, open cannot be called multiple times
            // setTimeout(function(){
                $http.post('/api/bookTicket', bookingTicket).success(function(){
                console.log("买票成功")
                console.log($scope.selectedPath.companyId);
                console.log(bookingTicket)
              })
            //  },10000)
            
          };
        };
      }


      // 初始化 起始站和终点站
      $scope.queryBeginP = '';
      $scope.queryEndP = '';

      // 选择起始地址 改变样式，改变列表筛选结果
      $scope.selectedBeginPlace = function(index){
        $scope.selectedBegin = index;
        console.log($scope.paths[index])
        $scope.queryBeginP = $scope.paths[index].beginName;
      }
      $scope.placeEndSelect = function(index){
        $scope.selectedEnd = index;
        $scope.queryEndP = $scope.paths[index].endName;
      }
      
      $scope.selectPath = function(index){
        // 获取 已有联系人
        FRIEND.get({id: $rootScope.user._id},function(data){
          $scope.hadFriends = [];
          if(data){
             $scope.hadFriends = data.friends;
          }
          $scope.hadFriends.unshift($rootScope.user);
        });
        //  已选路线
        $scope.selectedPath = $scope.paths[index]
        $scope.isDialog = !$scope.isDialog;
      }
      $scope.cencelDialog = function(){
        $scope.isDialog = !$scope.isDialog;
      }

      //  添加联系人
      $scope.newFriend = {
        userId : $rootScope.user._id
      };
      $scope.addFriend = function(){
        FRIEND.save({},$scope.newFriend);
        $scope.hadFriends.push($scope.newFriend);
        //清空输入框
        $scope.newFriend = {
          userId : $rootScope.user._id
        };
        // $http.post('/api/addFriend', $scope.newFriend).success(function (data) {
        //   $scope.hadFriends.push($scope.newFriend);
        //   $scope.newFriend = {
        //     userId : $rootScope.user._id
        //   };
        // })
      }

      // 选择已有联系人
      $scope.toggle = function(index){
        $scope.hadFriends[index].isSelect = !$scope.hadFriends[index].isSelect;
      }
      $scope.ticketForm.id = true;

      // 获得route上的参数id
      console.log($routeParams.id) 

  }])

  /*
   * '/myTicket/booking' booking.html bookingCtr
   */
  .controller('bookingCtr', function ($scope,$http,$location,$rootScope,TICKET,hadTickets) {
      //  已买票
      $scope.tickets = hadTickets;
      // TICKET.get({id: $rootScope.user._id},function(data){
      //   $scope.tickets = data.tickets;
      // })
      // $http.get('/api/getBookingTicket/' + $rootScope.user._id).success(function(data) {
      //   $scope.tickets = data.tickets;
      // });

      //  取消已买票
      $scope.cencelTicket = function(index){
        TICKET.delete({ticketId: $scope.tickets[index]._id},function(){
          $scope.tickets.splice(index,1);
          console.log("票取消成功")
        })
        // $http.post('/api/deleteTicket',{ticketId: $scope.tickets[index]._id}).success(function(){
        //   $scope.tickets.splice(index,1);
        //   console.log("票取消成功")
        // })
      }

  })
  /*
   * '/myTicket/booked' booked.html bookiedCtr
   */
  .controller('bookedCtr', function ($scope,$http,$location,$rootScope,TICKET,hadTickets) {
      //  曾买票 待修改***
      $scope.Oldtickets = hadTickets;

      // TICKET.get({id: $rootScope.user._id},function(data){
      //   $scope.Oldtickets = data.tickets;
      //  })
      // $http.get('/api/getBookingTicket/' + $rootScope.user._id).success(function(data) {
      //   $scope.Oldtickets = data.tickets;
      // });

  })

  /*
   * '/mes/people' mesPeople.html mesPeopleCtr
   */
  .controller('mesPeopleCtr', function ($scope,$http,$location,$rootScope,FRIEND,friends) {
      // 获取 已有联系人
      $scope.hadFriends = friends;

      // FRIEND.get({id: $rootScope.user._id},function(data){
      //      $scope.hadFriends = data.friends;
      // });
      // $http.get('/api/getFriends/' + $rootScope.user._id).success(function(data) {
      //   $scope.hadFriends = data.friends;
      // })

      //  删除已有联系人
      $scope.deleteFri = function (index) {
        FRIEND.delete({id: $rootScope.user._id,friID: $scope.hadFriends[index]._id});
        $scope.hadFriends.splice(index,1);

        // $http.post('/api/deleteFriend',{friendId: $scope.hadFriends[index]._id}).success(function(data)  {
        //   console.log(data);
        //   $scope.hadFriends.splice(index,1);
        // })

      }

      //  修改已有联系人
      $scope.updateFri = function (index) {

      }

      //  添加联系人
      $scope.newFriend = {
        userId : $rootScope.user._id
      };
      $scope.addFriend = function(){
        $scope.hadFriends.push($scope.newFriend);
        FRIEND.save({},$scope.newFriend);
        //清空输入框
        $scope.newFriend = {
          userId : $rootScope.user._id
        };
      }

  })

  /*
   * '/self/selfMes' selfMes.html selfMesCtr
   */
  .controller('selfMesCtr', function ($scope,$http,$location,$rootScope) {
    $scope.user = $rootScope.user; 
    $scope.userUpdate = function() {
        $http.post('/api/regist', $scope.user).success(function (data) {
          console.log($scope.user+":data"+data)
          console.log($scope.user)
          $rootScope.user = $scope.user = data.user;
        })
    }
  })
  /*
   * '/login' index.html loginCtr
   */
  .controller('loginCtr', function ($scope,$http,$location) {
    $scope.form = {};   // 初始化一个NG数据模型
    // 提交操作函数
    $scope.form.submit = function () {
        //使用$http内置服务提交POST请求，请求路径为'/api/login'，参数为$scope.form
        $http.post('/api/login', $scope.form).success(function () {
            //成功返回时，转到url为/main上
            $location.url('/main'); 
        });
    };
  })
   /*
   * '/company/mes' company.html mesCompanyCtr
   */
  .controller('mesCompanyCtr', function ($scope,$http,$location,$rootScope,hadPath,PATH) {
    // 获取 已有路线
    $scope.hadPaths = hadPath;
    // $http.get('/api/getPaths/' + $rootScope.newCompany._id).success(function(data) {
    //   console.log($rootScope.newCompany._id)
    //   $scope.hadPaths = data.paths;
    // })

   

    $scope.formImg = {};
    /* 提交图片，现无用到，待修改*/
    $scope.submitImg = function(){
       $http.post('/test',$scope.formImg).success(function (data) {
          console.log(data)
          $location.url('/company/mes'); 
        })
    }
    
    $scope.newCompany = $rootScope.newCompany; 
    $scope.userUpdate = function() {
        $http.post('/api/registCompany', $scope.newCompany).success(function (data) {
          console.log($scope.newCompany)
          $rootScope.newCompany = $scope.newCompany = data.newCompany;
        })
    }
    
    //  删除 已有路线
    $scope.deletePath = function (index) {
      // $scope.hadPaths.$delete({companyId:'companyId',pathId: $scope.hadPaths[index]._id});
      // $scope.hadPaths.splice(index,1);
      PATH.delete({companyId:'companyId', pathId: $scope.hadPaths[index]._id});
      $scope.hadPaths.splice(index,1);
      // $http.post('/api/deletePath',{pathId: $scope.hadPaths[index]._id}).success(function(data)  {
      //   console.log(data);
      //   $scope.hadPaths.splice(index,1);
      // })
    }
    //  修改已有联系人
    $scope.updateFri = function (index) {
    }

   
    //  添加 路线
    $scope.newPath = {
      companyId : $rootScope.newCompany._id,
      time : new Date()
    };
    $scope.addPath = function(){
      PATH.save({}, $scope.newPath);
      $scope.hadPaths.push($scope.newPath);
      $scope.newPath = {companyId : $rootScope.newCompany._id};
    }
  })
   /*
   * '/company/booked' companyBooked.html companyBookedCtr
   */
  .controller('companyBookedCtr', function ($scope,$http,$location,$rootScope,TICKET) {
      //  收到订票
      
      // TICKET.getCompTic({companyId: $rootScope.newCompany._id},function(data){
      //   console.log(data)
      //   //$scope.companyTickets = data.tickets;
      // })

      $http.get('/api/ticket/company/' + $rootScope.newCompany._id).success(function(data) {
        console.log(data)
        $scope.companyTickets = data.tickets;
      });

  })
;
