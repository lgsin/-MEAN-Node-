//公共 控制器 --登录模块
angular.module('nApp')
  .controller('loginCtr', ['$scope','$http','$location','$rootScope',
    function ($scope,$http,$location,$rootScope) {
		$scope.isShow = false;
			$scope.login = function(){
				$scope.isShow = !$scope.isShow;
			};
		$scope.form = {};   // 初始化一个NG数据模型
		// 提交操作函数
		$scope.form.submit = function () {

			//注册
		    //使用$http内置服务提交POST请求，请求路径为'/api/login'，参数为$scope.form
	/*		    $http.post('/api/regist', $scope.form).success(function (data) {
		    	console.log("form:n"+data)
		    	$scope.userName = data.user.username;
	        	$rootScope.user = data.user;
				$scope.isShow = !$scope.isShow;
				$scope.isLogin = true;
		        //成功返回时，转到url为/main上
		        //$location.url('/'); 
		    });*/
			//	登录
	        	console.log($scope.form)
			
	    $http.post('/api/login', $scope.form).success(function (data) {
	        	$scope.userName = data.user.username;
	        	$rootScope.user = data.user;
	        	console.log($rootScope)
				$scope.isShow = !$scope.isShow;
				$scope.isLogin = true;
	        });

		};  
		

		$scope.logout = function () {
			$http.post('/api/logout').success(function (data){
	         	$scope.isLogin = false;
	       	})
		}
}])


//左侧导航 滑动样式改变
$(function(){
	//	导航hover
	$(".menu a").hover(function(){
		var Mytop = $(".menu a:first").offset().top;
		var top = $(this).offset().top;
		var offsetTop = top - Mytop;
		$(this).addClass("menu-hover");
		$(".nav-label").css("top",offsetTop)
	},function(){
		var Mytop = $(".menu a:first").offset().top;
		var menuActiveTop = $(".menu-active").offset().top;
		var offsetTop = menuActiveTop - Mytop;
		$(this).removeClass("menu-hover");
		$(".nav-label").css("top",offsetTop)
	})
	//	选中导航
	$(".menu a").click(function(){
		var Mytop = $(".menu a:first").offset().top;
		var top = $(this).offset().top;
		var offsetTop = top - Mytop;
		$(".nav-label").css("top",offsetTop);
		$(".menu a").removeClass("menu-active");
		$(this).addClass("menu-active");
	})
})