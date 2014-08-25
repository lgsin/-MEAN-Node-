'use strict';

angular.module('nApp')

  /*
   * '/' index.html indexCtr
   */
  .controller('indexCtr', ['$scope',
    function ($scope) {
      $scope.placeList = [{
          page_id: 1,
          title: "东航或国航，零利润预售中",
          price: "1232",
          img: "images/1.jpg"
        },{
          page_id: 2,
          title: "b",
          price: "123",
          img: "images/2.jpg"
        },{
          page_id: 3,
          title: "b",
          price: "123",
          img: "images/3.jpg"
        },{
          page_id: 4,
          title: "b",
          price: "123",
          img: "images/4.jpg"
        },{
          page_id: 5,
          title: "b",
          price: "123",
          img: "images/5.jpg"
        },{
          page_id: 6,
          title: "b",
          price: "123",
          img: "images/6.jpg"
        }];

  }])

  /*
   * '/detail:id' page_detail.html pageDetailCtr
   */
  .controller('pageDetailCtr', ['$scope','$routeParams','$http','$rootScope',
    function ($scope,$routeParams,$http,$rootScope) {
      //起始地点
      $scope.placesBegin= [{
        placeBeginId: 1,
        placeName: "广州北",
        placeIntr: "广州东站广州东站广州东站广州东站广州东."
      },{
        placeBeginId: 2,
        placeName: "广州东站2",
        placeIntr: "广州东站广州东站广州东站广州东站广州东."
      },{
        placeBeginId: 3,
        placeName: "广州东站3",
        placeIntr: "广州东站广州东站广州东站广州东站广州东."
      }];

      //到站地点
      $scope.placesEnd= [{
        placeEndId: 1,
        placeName: "揭阳市",
        placeIntr: "广州东站广州东站广州东站广州东站广州东."
      },{
        placeEndId: 2,
        placeName: "普宁市",
        placeIntr: "广州东站广州东站广州东站广州东站广州东."
      },{
        placeEndId: 3,
        placeName: "东山市",
        placeIntr: "广州东站广州东站广州东站广州东站广州东."
      }];

      //路线
      $scope.paths= [{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州北',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/61',
        beginP: '广州北',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        ticket: 13,
        price: '￥120'
      }]

      // 初始化 起始站和终点站
      $scope.queryBeginP = '';
      $scope.queryEndP = '';

      // 选择起始地址 改变样式，改变列表筛选结果
      $scope.selectedBeginPlace = function(index){
        $scope.selectedBegin = index;
        $scope.queryBeginP = $scope.placesBegin[index].placeName;
      }
      $scope.placeEndSelect = function(index){
        $scope.selectedEnd = index;
        $scope.queryEndP = $scope.placesEnd[index].placeName;
      }
      
      $scope.selectPath = function(index){
        $scope.selectedPath = $scope.paths[index]
        $scope.isDialog = !$scope.isDialog;
      }
      $scope.cencelDialog = function(){
        $scope.isDialog = !$scope.isDialog;
      }

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
              beginP: $scope.selectedPath.beginP,
              endP: $scope.selectedPath.endP,
              date: $scope.selectedPath.date,
              price: $scope.selectedPath.price
            }
            // 异步请求导致 db object already connecting, open cannot be called multiple times
            // setTimeout(function(){
                $http.post('/api/bookTicket', bookingTicket).success(function(){
                console.log("买票成功")
              })
            //  },10000)
            
          };
        };
      }
      // 获取 已有联系人
      $http.get('/api/getFriends/' + $rootScope.user._id).success(function(data) {
        $scope.hadFriends = data.friends;
        $scope.hadFriends.unshift($rootScope.user)
      })

      //  添加联系人
      $scope.newFriend = {
        userId : $rootScope.user._id
      };
      $scope.addFriend = function(){
        $http.post('/api/addFriend', $scope.newFriend).success(function (data) {
          $scope.hadFriends.push($scope.newFriend);
          $scope.newFriend = {
            userId : $rootScope.user._id
          };
        })
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
  .controller('bookingCtr', function ($scope,$http,$location,$rootScope) {
      //  已买票
      $http.get('/api/getBookingTicket/' + $rootScope.user._id).success(function(data) {
        $scope.tickets = data.tickets;
      });

      //  取消已买票
      $scope.cencelTicket = function(index){
        $http.post('/api/deleteTicket',{ticketId: $scope.tickets[index]._id}).success(function(){
          $scope.tickets.splice(index,1);
          console.log("票取消成功")
        })
      }

  })
  /*
   * '/myTicket/booked' booked.html bookiedCtr
   */
  .controller('bookedCtr', function ($scope,$http,$location) {
      //路线
      $scope.paths= [{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州北',
        endP: '揭阳市',
        userName: '小明',
        phone: '18825188888',
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/61',
        beginP: '广州北',
        endP: '揭阳市',
        userName: '小明',
        phone: '18825188888',
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        userName: '小明',
        phone: '18825188888',
        price: '￥120'
      },{
        pathId: 1,
        date: '2014/5/6',
        beginP: '广州东',
        endP: '揭阳市',
        userName: '小明',
        phone: '18825188888',
        price: '￥120'
      }]
  })

  /*
   * '/mes/people' mesPeople.html mesPeopleCtr
   */
  .controller('mesPeopleCtr', function ($scope,$http,$location,$rootScope) {
      // 获取 已有联系人
      $http.get('/api/getFriends/' + $rootScope.user._id).success(function(data) {
        $scope.hadFriends = data.friends;
      })

      //  删除已有联系人
      $scope.deleteFri = function (index) {
        $http.post('/api/deleteFriend',{friendId: $scope.hadFriends[index]._id}).success(function(data)  {
          console.log(data);
          $scope.hadFriends.splice(index,1);
        })

      }

      //  修改已有联系人
      $scope.updateFri = function (index) {

      }

      //  添加联系人
      $scope.newFriend = {
        userId : $rootScope.user._id
      };
      $scope.addFriend = function(){
        $http.post('/api/addFriend', $scope.newFriend).success(function (data) {
          $scope.hadFriends.push($scope.newFriend);
        })
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
;
