<?php
/**
 * Page post type handlers
 *
 * @package WordPress
 * @subpackage JSON API
 */

/**
 * Page post type handlers
 *
 * This class serves as a small addition on top of the basic post handlers to
 * add small functionality on top of the existing API.
 *
 * In addition, this class serves as a sample implementation of building on top
 * of the existing APIs for custom post types.
 *
 * @package WordPress
 * @subpackage JSON API
 */
class WP_JSON_Menus {
	public function register_routes( $routes ) {
        $routes['/menus'] = array(
            array( array( $this, 'get_menus'), WP_JSON_Server::READABLE ),
        );

        $routes['/menus/(?P<name>\w+)'] = array(
            array( array( $this, 'get_menu'), WP_JSON_Server::READABLE ),
        );

        return $routes;
    }

    public function get_menus( $filter = array(), $context = 'view', $type = 'menu', $page = 1 ) {

    	$items = get_registered_nav_menus( );
    	//print_r($items);
    	return $items;
    }

    public function get_menu( $name, $context = 'view', $type = 'menu', $page = 1 ) {

        // Get the nav menu based on the requested menu
        $menu = wp_get_nav_menu_object( $args->menu );

        // Get the nav menu based on the theme_location
        if ( ! $menu && $name && ( $locations = get_nav_menu_locations() ) && isset( $locations[ $name ] ) )
            $menu = wp_get_nav_menu_object( $locations[ $name ] );

        // get the first menu that has items if we still can't find a menu
        if ( ! $menu ) {
            $menus = wp_get_nav_menus();
            foreach ( $menus as $menu_maybe ) {
                if ( $menu_items = wp_get_nav_menu_items( $menu_maybe->term_id, array( 'update_post_term_cache' => false ) ) ) {
                    $menu = $menu_maybe;
                    break;
                }
            }
        }


        if ( $menu && ! is_wp_error($menu) && !isset($menu_items) ) {
            $items = wp_get_nav_menu_items( $menu->term_id, array( 'update_post_term_cache' => false ) );
            
            return $this->find_childeren($items);
        }

        

        
    }

    private function find_childeren($items, $parent=0){
        $array = array();
        foreach ($items as $item){
            if($item->menu_item_parent == $parent){
                $childeren = $this->find_childeren($items, $item->ID);
                if(count($childeren) > 0){
                    $item->childeren = $childeren;
                }
                array_push($array, $item);
            }
            
        }
        return $array;
    }

}