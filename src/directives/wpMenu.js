angular.module('wpAngular').directive("wpMenu", function($log, $http, wpBloginfo){
	return {
		transclude: 'element',
    	scope: {},
		link: function($scope, $element, $attr, ctrl, $transclude){
			
			if($attr.name){
				$http.get(wpBloginfo.baseUrl + "/wp-json/menus/" + $attr.name).success(function(data){
					$log.debug("Data", data);
					$scope.items = data;		
				});
			}else{
				$scope.items = $scope.$parent.childeren;
			}

			$scope.$watchCollection("items", function(collection) {
							
				angular.forEach(collection, function(item){
					
					//Create new scope for every new item and load attributes to the scope
					var childScope = $scope.$new();
					angular.forEach(item, function(value, key){
						childScope[key] = value;
					});

		      		$transclude(childScope, function(clone) {
		      			$element.parent().append(clone);
		      		});
		      	});
		    });
	    }	
	}
});