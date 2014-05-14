wp-angular
==========

Wp-Angular is a Wordpress plugin wich helps you to write you wordpress templated in a declaretive and asynchronous way. This plugin intergrates wordpress with angular and provides a set of directies to access the content from the 


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
- Install the JSON REST API plugin 
- Drop this plugin in the plugins directory and activate it.

Core
====
The mail module of the angular app is name: wpAngular
The following bloginfo variable are availible as an constant:
- baseUrl : the base url of the wordpress installation
- templateUrl : the url of your current template
- pluginUrl : the url where te plugins are installed

Directives
==========
Directives allow you to create custom reusable components. This framework contains a set of directives which gives access to your wordpress content. These directives can be used to wirte your templates in a declarative way.

For a detailed documentation have a look at: http://wp-angular.org



