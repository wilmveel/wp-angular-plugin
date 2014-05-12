angular.module('wpAngular').directive("wpPost", function($log, $http){
	return {
		restrict : 'EA',
		transclude : false,
		template : '<div>{{post}}</div>',
		scope: {
			id : '@',
			slug : '@'
		},
		link : function(scope, element, attrs) {
			$log.debug("load posts");
			if(){
				$http.get("/peardeburg/wordpress/wp-json/post", {
					params : {
						id : scope.id
					}
				})
				.success(function(data){
					$log.debug(data);
					scope.post = data
				}).error();
			}
			
			
		}
	}
});