//公共 控制器 --登录模块
angular.module('nApp')
  .controller('loginCtr', ['$scope','$http','$location','$rootScope',
    function ($scope,$http,$location,$rootScope) {
    	//是否是商家
		$scope.isShow = false;
		$scope.login = function(){
			$scope.isShow = !$scope.isShow;
		};
		$scope.isRegist = false;
		$scope.regist = function(){
			$scope.isRegist = !$scope.isRegist;
		};
		$scope.form2 = {};   // 初始化注册对象
		$scope.form2.submit = function () {
			if ($scope.form2.type == 2) {
				//注册
				 $http.post('/api/registCompany', $scope.form2).success(function (data) {
			    	console.log(data)
			    	$scope.userName = data.newCompany.username;
		        	$rootScope.newCompany = data.newCompany;
					$scope.isRegist = !$scope.isRegist;
					$scope.isLogin = true;
			        //成功返回时，转到url为/main上
			        //$location.url('/'); 
		    	});
			}else{
			//注册
		    //使用$http内置服务提交POST请求，请求路径为'/api/login'，参数为$scope.form
			    $http.post('/api/regist', $scope.form2).success(function (data) {
			    	console.log(data)
			    	$scope.userName = data.user.username;
		        	$rootScope.user = data.user;
					$scope.isRegist = !$scope.isRegist;
					$scope.isLogin = true;
			        //成功返回时，转到url为/main上
			        //$location.url('/'); 
		    	});
		    }
		}

		$scope.form = {};   // 初始化登录对象
		// 提交操作函数
		$scope.form.submit = function () {
				//	登录
		        console.log($scope.form)
				if ($scope.form.type == 2) {
					$http.post('/api/loginCompany', $scope.form).success(function (data) {
		        	$scope.userName = data.company.username;
		        	$rootScope.newCompany = data.company;
		        	console.log($rootScope)
					$scope.isShow = !$scope.isShow;
					$scope.isLogin = true;
				})
			}else{
					$http.post('/api/login', $scope.form).success(function (data) {
		        	$scope.userName = data.user.username;
		        	$rootScope.user = data.user;
		        	console.log($rootScope)
					$scope.isShow = !$scope.isShow;
					$scope.isLogin = true;
		        });
			}
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