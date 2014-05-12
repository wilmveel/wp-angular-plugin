angular.module('wpAngular').directive("wpPosts", function($log, $http, $sce, $compile, wpBloginfo){
	return {
		restrict : 'EA',
		transclude: true,
    	scope: {},
		link: function($scope, $element, $attr, ctrl, $transclude){

			$log.debug("init wpPosts", wpBloginfo.baseUrl);

			$http.get(wpBloginfo.baseUrl + "/wp-json/posts").success(function(data){
				$scope.posts = data;	
				$log.debug("Load data", data);	
			});

			$scope.$watchCollection("posts", function(collection) {

				angular.forEach(collection, function(post){
					var childScope = $scope.$new();
					childScope.post = post;
				
					$transclude(childScope, function(clone) {
		      			$element.parent().append(clone);
		      		});
				});
			});
	    }	
	}
});