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

function as_currency_js(){
	wp_enqueue_script( 'accounting', get_template_directory_uri().'/js/accounting.min.js',false,'0.3.2',true);
	wp_enqueue_script( 'apollo', get_template_directory_uri().'/js/apollo.js',array('jquery','accounting'),'1.0',true);
}

// Add hook for admin <head></head>
add_action( 'admin_print_scripts-post-new.php', 'as_currency_js', 20 );
add_action( 'admin_print_scripts-post.php', 'as_currency_js', 20 );

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
      'supports' => array( 'title', 'editor', 'thumbnail'),
      'rewrite' => array( 'slug' => 'event', 'with_front' => false ),
    )
  );
	register_post_type( 'product',
    array(
      'labels' => array(
        'name' => __( 'Products' ),
				'singular_name' => __( 'Product' ),
				'add_new' => __( 'Add New' ),
				'add_new_item' => __( 'Add New Product' ),
				'edit' => __( 'Edit' ),
				'edit_item' => __( 'Edit Product' ),
				'new_item' => __( 'New Product' ),
				'view' => __( 'View Product' ),
				'view_item' => __( 'View This Product' ),
				'search_items' => __( 'Search Products' ),
				'not_found' => __( 'No Products found' ),
				'not_found_in_trash' => __( 'No Products found in Trash' ),
      ),
			'show_in_rest' => true, //include in API
      'public' => true,
      'menu_position' => 6,
			'taxonomies'  => array( 'category' ),
      'menu_icon' => 'dashicons-store',
      'hierarchical' => true,
      'supports' => array( 'title', 'editor', 'thumbnail'),
      'rewrite' => array( 'slug' => 'product', 'with_front' => false ),
    )
  );
}


//API customizations

 // allow for meta queries
	add_filter( 'rest_query_vars', 'charlie_query_vars' );
	function charlie_query_vars ( $valid_vars ) {
		 $valid_vars = array_merge( $valid_vars, array( 'key', 'value', 'compare','meta_query','meta_key','meta_value')); //add these parameteres to the allowed vars from the rest api
		return $valid_vars;
	}

	add_filter('rest_endpoints', 'charlie_modify_rest_routes');
	//add support for numberical ordering
	function charlie_modify_rest_routes( $routes ) {
	  array_push( $routes['/wp/v2/posts'][0]['args']['orderby']['enum'], 'meta_value_num' );
	  return $routes;
	}

	add_action( 'rest_api_init', function () {
		register_rest_route( 'duke/v1', '/events/future', array(
			'methods' => 'GET',
			'callback' => 'duke_get_future_events',
		) );
	} );

	function duke_get_future_events(){
		$args = array(
			'post_type' => 'event',
			'meta_query' => array(
				array(
					'key' => 'event_date',
					'value' => strtotime("today"),  //get current date in UNIX so we can compare to event dates
					'compare' => '>=',
				),
		)
		);

		$the_query = new WP_Query( $args );
		$results = array();
		foreach($the_query->posts as $event){
			$meta = get_post_meta( $event->ID);
			$results[$event->ID] = $event;
			$results[$event->ID]->meta = $meta;
		}
		return $results;
	}

	/**
		 * Only allow GET requests and add cross origin wildcard
		 */
		add_action( 'rest_api_init', function() {

			remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
			add_filter( 'rest_pre_serve_request', function( $value ) {
				header( 'Access-Control-Allow-Origin: *');
				header( 'Access-Control-Allow-Methods: GET' );

				return $value;

			});
		}, 15 );

	add_action( 'rest_api_init', 'duke_add_thumbnail_to_JSON' );
	function duke_add_thumbnail_to_JSON() {
		//Add featured image
		register_rest_field( 'page',
		    'featured_image',
		    array(
		        'get_callback'    => 'duke_get_image',
		        'update_callback' => null,
		        'schema'          => null,
		         )
		    );
		}

		function duke_get_image( $object, $field_name, $request ) {
		    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'full', true);
		    return $feat_img_array;
		}
