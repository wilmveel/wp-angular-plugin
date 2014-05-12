angular.module('wpAngular').directive("wpPosts", function($log, $http, $sce, bloginfo){
	return {
		restrict : 'EA',
		transclude : true,
		template : '<div ng-repeat="post in posts"><div ng-transclude></div></div>',
		scope: {
		},
		link : function(scope, element, attrs) {
			$log.debug("load posts");
			$http.get(bloginfo.baseUrl + "/wp-json/posts").success(function(data){
				$log.debug(data);
				scope.posts = data
				for(var i=0; i<scope.posts.length; i++) {
                    scope.posts[i].content = $sce.trustAsHtml(scope.posts[i].content);
                }
			});
			
		}
	}
});