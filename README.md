wp-angular
==========



A set of Angular directives to make wordpress content availible in Angular. Wp-Angular makes it easy to write your templates in a sturctured way by separating model view and controllers. Angular also provides tool load content in a asynchrous way wich makes your website faster end more responsive.

Introduction
------------
This Wordpress plugin gives you tool to write you templates in a angular way.

Preconditions
-------------
This plugin assumes that you hav installed the JSON REST API plugin.
https://github.com/WP-API/WP-API

Installation
------------
Install the JSON REST API plugin and drop this directory in the plugins directory and activate it.

Core
====
The module name of the angular app is: wp-angular
The following bloginfo variable are availible as an constant:
- baseUrl : the base url of the wordpress installation
- templateUrl : the url of your current template
- pluginUrl : the url where te plugins are installed

Directives
==========
Directives allow you to create custom reusable components. This framework contains a set of directives which gives access to your wordpress content. These directives can be used to wirte your templates in a declarative way.

wp-post/wp-posts
--------
This directives gives access to your wordpress posts. The post will be loaded in an asynchronous way. For each post the following attributes are availible:

- title : <String> the title of the post
- content : <String> html representation of the post content. Use the ng-bind-html atribute to render as html
- 

````
<div wp-posts>
	<h1>{{post.title}}</h1>
	<div ng-bind-html="post.content"></div>
</div>
````


````
<div wp-posts>
	<wp-post>
		<h1>{{title}}</h1>
		<div ng-bind-html="content"></div>
	<wp-post>
</div>
````

wp-menu
-------
This directive gives access to the menus in your template



