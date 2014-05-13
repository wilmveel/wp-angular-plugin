angular.module('wpAngular').directive("wpMedia", function($log, $http, $sce, $compile, wpBloginfo){
	return {
		restrict : 'EA',
		transclude: true,
    	scope: {},
    	priority: 1000,
		link: function($scope, $element, $attr, ctrl, $transclude){

			$log.debug("link wpPost");

			if($attr.id){
				$http.get(wpBloginfo.baseUrl + "/wp-json/posts/" + $attr.id).success(function(data){
					$scope.post = data;
				});
			}else{
				$scope.post = $scope.$parent.post;
			}

			$scope.$watch('post', function(post) {
				var childScope = $scope.$new();
				
				// Add post variables to the childSscope
				angular.forEach(post, function(value, key){
					childScope[key] = value;
				});
				childScope.content = $sce.trustAsHtml(childScope.content);
	      		
	      		$transclude(childScope, function(clone) {
	      			$log.debug("clone", clone);	
	      			$element.html("");	
	      			$element.append(clone);					
	      		});
		    });
	    }	
	}
});