angular.module('wpAngular').directive("wpMedia", function($log, $http, $sce, $compile, wpBloginfo){
	return {
		restrict : 'EA',
		transclude: true,
    	priority: 1000,
    	scope: true,
		link: function($scope, $element, $attr, ctrl, $transclude){

			$log.debug("link wpMedia");

			$scope.media = null;

			if($attr.id){
				$http.get(wpBloginfo.baseUrl + "/wp-json/media/" + $attr.id).success(function(data){
					$scope.media = data;
				});
			} else if($attr.slug){
				$http.get(wpBloginfo.baseUrl + "/wp-json/media/?filter[name]=" + $attr.slug).success(function(data){
					$scope.media = data[0];
				});
			}

			$scope.$watch('media', function(media) {
				var childScope = $scope.$new();
				
				if(media != null){
					// Add post variables to the childSscope
					angular.forEach(media, function(value, key){
						childScope[key] = value;
					});

		      		$element.empty();	
		      		$transclude(childScope, function(clone) {
		      			
		      			$log.debug(clone.length);
		      			if(clone.length > 1){
							$element.append(clone);		
		      			} else {
		      				
		      				var element;
		      				if(childScope.is_image){
		      					element = angular.element("<img src='" + childScope.source + "' />");
		      				} else{
		      					element = angular.element("<a href='" + childScope.source + "' >Download</a>");
		      				}
		      				
		      				angular.forEach($attr, function(value, key){
								if(!(/^\$/).test(key)){
									element.attr(key, value);
								}
							});
		      				
		      				$element.replaceWith(element);

		      			}
		      		});
		      	}
		    });
	    }
	}
});