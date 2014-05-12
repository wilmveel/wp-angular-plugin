<?php
/**
 * @package WP_Angular
 * @version 1.0
 */
/*
Plugin Name: WP Angular
Depends: json-rest-api/wp-api.js
Plugin URI: http://youvee.nl/wp-angular/
Description: This plugin allows you to build your templates in a angular way.
Author: Willem Veelenturf
Version: 1.6
Author URI: http://ma.tt/
*/


include_once( ABSPATH . 'wp-admin/includes/plugin.php' ); 



add_action('init','wp_angular_init');
function wp_angular_init() {
	if( is_plugin_active( 'json-rest-api/plugin.php' ) ) {

	    wp_enqueue_script( 'angular', plugins_url( '/lib/angular/angular.js', __FILE__ ));
        wp_enqueue_script( 'angular-route', plugins_url( '/lib/angular/angular-route.js', __FILE__ ));

	    wp_enqueue_script( 'wp-angular-module', plugins_url( '/src/module.js', __FILE__ ));
        wp_enqueue_script( 'wp-angular-directives-post', plugins_url( '/src/directives/wpPost.js', __FILE__ ));
	    wp_enqueue_script( 'wp-angular-directives-posts', plugins_url( '/src/directives/wpPosts.js', __FILE__ ));
        wp_enqueue_script( 'wp-angular-directives-menu', plugins_url( '/src/directives/wpMenu.js', __FILE__ ));
        
        // Make blog info availible as constant in angular
        wp_localize_script( 'wp-angular-module', 'bloginfo', load_bloginfo());
	}else{
		add_action( 'admin_notices', 'notice_api_not_active' );
	}
}

// Load the blog info for javascript
function load_bloginfo(){
    $array = array();
    $array['baseUrl'] = get_bloginfo('url');
    $array['templateUrl'] = get_bloginfo('template_url');
    $array['pluginsUrl'] = plugins_url();
    return $array;
}

// Extend Api
function myplugin_api_init() {
    global $wp_json_menus;

    require_once dirname( __FILE__ ) . '/api/class-wp-json-menus.php';

    $wp_json_menus = new WP_JSON_Menus();
    add_filter( 'json_endpoints', array( $wp_json_menus, 'register_routes' ) );
}
add_action( 'wp_json_server_before_serve', 'myplugin_api_init' );

function notice_api_not_active() {
    ?>
    <div class="error">
        <p><?php _e( 'WP-angular can only work when JSON REST API is installed and activated', 'my-text-domain' ); ?></p>
    </div>
    <?php
}
