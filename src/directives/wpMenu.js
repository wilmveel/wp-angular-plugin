angular.module('wpAngular').directive("wpMenu", function($log, $http, $compile){
	return {
		transclude: 'element',
   		priority: 1000,
    	terminal: true,
    	$$tlb: true,
		link: function($scope, $element, $attr, ctrl, $transclude){
			
			if($attr.name){
				$http.get(bloginfo.baseUrl + "/wp-json/menus/" + $attr.name).success(function(data){
					$log.debug("Data", data);
					$scope.items = data;		
				});
			}else{
				$scope.items = $scope.childeren;
			}

			$scope.$watchCollection('items', function(collection) {
				
				var childScope;
				
				angular.forEach(collection, function(item){
					
					$log.debug("item", item);
					childScope = $scope.$new();

		      		$transclude(childScope, function(clone) {

		      			$element.parent().append(clone);

						angular.forEach(item, function(v, k){
							childScope[k] = item[k];
						});
						$log.debug("transclude", childScope.title, clone);

		      		});
		      	});
		    });
	    }	
	}
});