angular.module('wpAngular').directive("wpPosts", function($log, $http, $sce, $compile, wpBloginfo){
	return {
		restrict : 'EA',
		transclude: true,
    	scope: {},
    	priority: 1000,
		link: function($scope, $element, $attr, ctrl, $transclude){

			$log.debug("init wpPosts", wpBloginfo.baseUrl);
			
			var query = {};
			if($attr.orderby){
				query.orderby = $attr.orderby;
			}
			if($attr.numberofposts){
				query.posts_per_page = $attr.numberofposts;
			}
	

			var url = wpBloginfo.baseUrl + "/wp-json/posts";
			if(serializeQuery(query)){
				url += "?" + serializeQuery(query)
			}
			$http.get(url).success(function(data){
				$scope.posts = data;	
				$log.debug("Load data", data);	
			});

			$scope.$watchCollection("posts", function(collection) {

				angular.forEach(collection, function(post){
					var childScope = $scope.$new();
					childScope.post = post;
				
					$transclude(childScope, function(clone) {
		      			$element.append(clone);
		      		});
				});
			});
	    }	
	}
});

serializeQuery = function(obj) {
   var str = [];
   for(var p in obj){
       if (obj.hasOwnProperty(p)) {
           str.push(encodeURIComponent("filter[" + p + "]") + "=" + encodeURIComponent(obj[p]));
       }
   }
   return str.join("&");
}