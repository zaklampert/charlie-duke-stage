<?php
include_once( dirname( __FILE__ ) . '/meta.php' );


//Theme capabilities
add_theme_support( 'post-thumbnails' );

function charlie_register_menu() {
	register_nav_menus(
    array(
      'site-menu' => __( 'Site Menu' ),
    //  'extra-menu' => __( 'Extra Menu' )
    )
  );
}
add_action( 'init', 'charlie_register_menu' );


//Create events
add_action( 'init', 'duke_create_post_types' );
function duke_create_post_types() {
	register_post_type( 'event',
    array(
      'labels' => array(
        'name' => __( 'Events' ),
				'singular_name' => __( 'Event' ),
				'add_new' => __( 'Add New' ),
				'add_new_item' => __( 'Add New Event' ),
				'edit' => __( 'Edit' ),
				'edit_item' => __( 'Edit Event' ),
				'new_item' => __( 'New Event' ),
				'view' => __( 'View Event' ),
				'view_item' => __( 'View This Event' ),
				'search_items' => __( 'Search Events' ),
				'not_found' => __( 'No Events found' ),
				'not_found_in_trash' => __( 'No Events found in Trash' ),
      ),
			'show_in_rest' => true, //include in API
      'public' => true,
      'menu_position' => 5,
      'menu_icon' => 'dashicons-calendar',
      'hierarchical' => true,
      'supports' => array( 'title', 'editor', 'thumbnail', 'comments'),
      'rewrite' => array( 'slug' => 'event', 'with_front' => false ),
    )
  );
}
