angular.module('wpAngular', [])
.constant('wpBloginfo', bloginfo)
.run(function($rootScope, $log, wpBloginfo){
	$log.debug("wpBloginfowpBloginfowpBloginfo", wpBloginfo);
	$rootScope.bloginfo = wpBloginfo;
});