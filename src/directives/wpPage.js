angular.module('wpAngular').directive("wpPage", function($log, $http, $sce, $compile, wpBloginfo){
	return {
		restrict : 'EA',
		transclude: true,
    	scope: {},
    	priority: 1000,
		link: function($scope, $element, $attr, ctrl, $transclude){

			$log.debug("link wpPage");

			if($attr.id){
				$http.get(wpBloginfo.baseUrl + "/wp-json/pages/" + $attr.id).success(function(data){
					$scope.page = data;
				});
			} else if($attr.slug){
				$http.get(wpBloginfo.baseUrl + "/wp-json/pages/?filter[name]=" + $attr.slug).success(function(data){
					$scope.page = data[0];
				});
			}

			$scope.$watch('page', function(page) {
				var childScope = $scope.$new();
				
				// Add page variables to the childSscope
				angular.forEach(page, function(value, key){
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