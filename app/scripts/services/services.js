angular.module('services',['ngResource'])

	/*****  FRIEND  *****/
	.factory('FRIEND',['$resource',function($resource){
		return $resource('/api/friend/:id/:friID',{id:'@_id'})
	}])
	// 获取 已有联系人
	.factory('FriendLoader',['FRIEND', '$q', '$rootScope',function(FRIEND, $q, $rootScope){
		return function() {
			var delay = $q.defer();
			FRIEND.get({id: $rootScope.user._id},function(data){
				delay.resolve(data.friends);
	      }, function(){
	      		delay.reject('获取FRIEND失败')
	      });
			return delay.promise;
		}
	}])
	/*****  TICKET  *****/
	.factory('TICKET',['$resource',function($resource){
		return $resource('/api/ticket/:id/:ticketId/:company/:companyId',
				{id:'@_id'},
            	{getCompTic: { method: 'GET', params: { company: 'company'}, isArray: true }}
			)
	}])
	// 获取 已买ticket
	.factory('ticketsLoader',['TICKET', '$q', '$rootScope',function(TICKET, $q, $rootScope){
		return function() {
			var delay = $q.defer();
			TICKET.get({id: $rootScope.user._id},function(data){
				delay.resolve(data.tickets);
	      }, function(){
	      		delay.reject('获取tickets失败')
	      });
			return delay.promise;
		}
	}])
	/*****  PATH  *****/
	.factory('PATH',['$resource',function($resource){
		return $resource('/api/path/:companyId/:pathId'
			//,{companyId:'@companyId'}
			)
	}])
	// 获取 path
	.factory('pathsLoader',['PATH', '$q', '$route','$rootScope',function(PATH, $q, $route,$rootScope){
		return function() {
			var delay = $q.defer();
			//	获取路由上的参数 $route.current.params.companyId
			PATH.get({companyId: $route.current.params.companyId || $rootScope.newCompany._id},function(data){
				delay.resolve(data.paths);
	      }, function(){
	      		delay.reject('获取paths失败')
	      });
			return delay.promise;
		}
	}])
;

