<?php
add_filter( 'gmap_api_params', function( $params ) {
	$params['key'] = 'AIzaSyADPuc2nVCuLSsWOJP-W8OjCDK7bqSbZKQ';
	return $params;
});

//Register meta boxes for events
add_filter( 'rwmb_meta_boxes', 'charlie_meta_data',11);

function charlie_meta_data($meta_boxes) {
	$meta_boxes[] = array(
		'id' => 'page_options',
		'title' => '<i class="fa fa-compass" aria-hidden="true"></i> Location Info',
		'pages' => array( 'page'),
		'context' => 'normal',
		'priority' => 'high',
		'fields' => array(
			array(
				'name'		=> 'Page Subtitle',
				'id'		=> "subtitle",
				'type'		=> 'text',
			),
			array(
				'name'		=> 'Page Template',
				'id'		=> "page_format",
				'type'		=> 'select',
				'options' => array(
					'default'	=> "Default",
					'home_panel' => 'Main Menu',
					'img_caption' => "Image with Caption",
					'quote' => "Quote",
					'two_col' => "Two Column",
					'full_image' => "Full Sized Image"

				),
			),

			//Image with Text fields
				array(
					'name'		=> 'Image Credit Text',
					'id'		=> "caption_credit_text",
					'type'		=> 'text',
					'visible' => array('page_format','=','img_caption')
				),
				array(
					'name'		=> 'Image Credit Link',
					'id'		=> "caption_credit_link",
					'type'		=> 'url',
					'placeholder' => "http://images.nasa.gov",
					'visible' => array('page_format','=','img_caption')
				),

			//Two Column meta
				array(
					'name'		=> 'Left Column Image',
					'id'		=> "left_col_img",
					'type'		=> 'media',
					'max_file_uploads' => 1,
					'visible' => array('page_format','=','two_col')
				),
				array(
					'name'		=> 'Left Column Text',
					'id'		=> "left_col_text",
					'type'		=> 'wysiwyg',
					'visible' => array('page_format','=','two_col')
				),
				array(
					'name'		=> 'Right Column Image',
					'id'		=> "right_col_img",
					'type'		=> 'media',
					'max_file_uploads' => 1,
					'visible' => array('page_format','=','two_col')
				),
				array(
					'name'		=> 'Right Column Text',
					'id'		=> "right_col_text",
					'type'		=> 'wysiwyg',
					'visible' => array('page_format','=','two_col')
				),

			//Main Menu page options
			array(
				'name'		=> 'Display as full panel quote?',
				'id'		=> "quote_display",
				'desc'	=> 'The title and button will be hidden while the page text displays as a large quote.',
				'type'		=> 'checkbox',
				'visible' => array('page_format','=','home_panel')
			),
			array(
				'name'		=> 'Button text',
				'id'		=> "button_text",
				'type'		=> 'text',
				'visible' => array('page_format','=','home_panel')
			),
			array(
				'name'		=> 'Button link',
				'id'		=> "button_url",
				'type'		=> 'url',
				'desc' => 'Optional for if you want to link to another site/page. By default, this button will explore the current section.',
				'visible' => array('page_format','=','home_panel')
			),
		)
	);
	return $meta_boxes;
}
