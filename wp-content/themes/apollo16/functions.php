<?php
include_once( dirname( __FILE__ ) . '/meta.php' );


//Theme capabilities
add_theme_support( 'post-thumbnails' );

function charlie_register_menu() {
	register_nav_menus(
    array(
      'main-menu' => __( 'Main Menu' ),
    //  'extra-menu' => __( 'Extra Menu' )
    )
  );
}
add_action( 'init', 'charlie_register_menu' );
