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
		'title' => '<span class="dashicons dashicons-align-left"></span> Page Settings',
		'pages' => array( 'page'),
		'context' => 'normal',
		'priority' => 'high',
		'fields' => array(

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
					'full_image' => "Full Sized Image",
					'events' => "Events Page",
					'shop'	=> "Shop Page"
				),
			),

			//Image and video

			array(
				'name'		=> 'Image/Video Options',
				'id'		=> "img_sec",
				'type'		=> 'heading',
				'visible' => array('page_format','in',array('img_caption','full_image')),
			),

			array(
				'name'		=> 'Featured Media',
				'id'		=> "featured_media_type",
				'type'		=> 'radio',
				'options' => array(
					'image'	=> "Image",
					'video'	=> "Video"
				),
				'inline'	 => false,
				'visible' => array('page_format','in',array('img_caption','full_image')),
			),

			//Image with Text fields
				array(
					'name'		=> 'Image Link',
					'id'		=> "img_link",
					'type'		=> 'url',
					'visible' => array('featured_media_type','=','image'),
					'desc' => 'Should this image link to a URL or media file? Leave blank for no link.',
					'size'	=> 50
				),
				array(
					'name'		=> 'Image Credit Text',
					'id'		=> "caption_credit_text",
					'type'		=> 'text',
					'visible' => array('featured_media_type','=','image'),
				),
				array(
					'name'		=> 'Image Credit Link',
					'id'		=> "caption_credit_link",
					'type'		=> 'url',
					'placeholder' => "http://images.nasa.gov",
					'visible' => array('featured_media_type','=','image'),
					'size'	=> 50
				),

				//video
				array(
					'name'		=> 'Video URL',
					'id'		=> "video_url",
					'type'		=> 'url',
					'placeholder' => "https://www.youtube.com/watch?v=x1cjAugSrrQ",
					'visible' => array('featured_media_type','=','video'),
					'desc' => "Include the link to a YouTube or Vimeo URL. You don't need the embed code or the video file.",
					'size'	=> 50
				),

			//Two Column meta
				array(
					'name'		=> 'Left Column Featured Media',
					'id'		=> "left_featured_media_type",
					'type'		=> 'radio',
					'options' => array(
						'image'	=> "Image",
						'video'	=> "Video"
					),
					'columns' => 6,
					'inline'	 => false,
					'visible' => array('page_format','=','two_col'),
				),
				array(
					'name'		=> 'Right Column Featured Media',
					'id'		=> "right_featured_media_type",
					'type'		=> 'radio',
					'options' => array(
						'image'	=> "Image",
						'video'	=> "Video"
					),
					'columns' => 6,
					'inline'	 => false,
					'visible' => array('page_format','=','two_col'),
				),
				//images
				array(
					'name'		=> 'Left Column Image',
					'id'		=> "left_col_img",
					'type'		=> 'file_advanced',
					'max_file_uploads' => 1,
					'columns' => 6,
					'visible' => array('left_featured_media_type','=','image')
				),
				array(
					'name'		=> 'Right Column Image',
					'id'		=> "right_col_img",
					'columns' => 6,
					'type'		=> 'file_advanced',
					'max_file_uploads' => 1,
					'visible' => array('right_featured_media_type','=','image')
				),
				//links
				array(
					'name'		=> 'Left Column Image Link',
					'id'		=> "left_col_img_link",
					'type'		=> 'url',
					'columns' => 6,
					'visible' => array('left_featured_media_type','=','image'),
					'desc' => 'Should this image link to a URL or media file? Leave blank for no link.'
				),
				array(
					'name'		=> 'Right Column Image Link',
					'id'		=> "right_col_img_link",
					'type'		=> 'url',
					'columns' => 6,
					'visible' => array('right_featured_media_type','=','image'),
					'desc' => 'Should this image link to a URL or media file? Leave blank for no link.'
				),
				//video
				array(
					'name'		=> 'Left Video URL',
					'id'		=> "left_video_url",
					'type'		=> 'url',
					'placeholder' => "https://www.youtube.com/watch?v=x1cjAugSrrQ",
					'visible' => array('left_featured_media_type','=','video'),
					'desc' => "Include the link to a YouTube or Vimeo URL. You don't need the embed code or the video file.",
					'columns' => 6,
					'size'	=> 50
				),
				array(
					'name'		=> 'Right Video URL',
					'id'		=> "right_video_url",
					'type'		=> 'url',
					'placeholder' => "https://www.youtube.com/watch?v=x1cjAugSrrQ",
					'visible' => array('right_featured_media_type','=','video'),
					'desc' => "Include the link to a YouTube or Vimeo URL. You don't need the embed code or the video file.",
					'columns' => 6,
					'size'	=> 50,
				),

				//text - regardless of media type
				array(
					'name'		=> 'Left Column Text',
					'id'		=> "left_col_text",
					'type'		=> 'wysiwyg',
					'columns' => 6,
					'visible' => array('page_format','=','two_col'),
					'options' => array(
						'media_buttons' => false,
					)
				),
				array(
					'name'		=> 'Right Column Text',
					'id'		=> "right_col_text",
					'columns' => 6,
					'type'		=> 'wysiwyg',
					'visible' => array('page_format','=','two_col'),
					'options' => array(
						'media_buttons' => false,
					)
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
				'placeholder'	=> 'Explore',
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

			//Page Title options
			array(
				'name'		=> 'Page Title Options',
				'id'		=> "title_sec",
				'type'		=> 'heading',
				'visible' => array('page_format','!=',"home_panel")
			),
			array(
				'name'		=> 'Page Subtitle',
				'id'		=> "subtitle",
				'type'		=> 'text',
				'visible' => array('page_format','!=','home_panel')
			),
			array(
				'name'		=> 'Show Page Title?',
				'id'		=> "title_display",
				'type'		=> 'checkbox',
				'visible' => array('page_format','!=','home_panel')
			),
		)
	);

	//Events
	$meta_boxes[] = array(
		'id' => 'event_options',
		'title' => '<span class="dashicons dashicons-calendar"></span> Event Details',
		'pages' => array( 'event'),
		'context' => 'normal',
		'priority' => 'high',
		'geo' => array(
    	'types' => array('establishment')
		),
		'fields' => array(
			array(
				'name'		=> 'Event Date',
				'id'		=> "event_date",
				'type'		=> 'date',
				'js_options' => array(
					'dateFormat' => 'MM d, yy'
				)
			),
			array(
				'name'		=> 'Event Start Time',
				'id'		=> "event_start_time",
				'type'		=> 'time',
				'js_options' => array(
					'stepMinute'	=> 5,
					'timeFormat' => 'hh:mm tt',
					'showButtonPanel' => false
				)
			),
			// Map requires at least one address field (with type = text)
			array(
				'id'   => 'address_venue',
				'name' => 'Venue Name',
				'binding' => 'name',
				'type' => 'text',
				'size'	=> 50
			),
			array(
				'name'		=> 'Venue Address',
				'id'		=> 'address_formatted',
				'binding'		=> "formatted_address",
				'type'		=> 'text',
				'size'	=> 50
			),
			array(
				'name'		=> 'Event Link',
				'id'		=> 'event_link',
				'type'		=> 'url',
				'desc'	=> 'URL for more information about this event.',
				'size'	=> 50
			),
			// array(
			// 	'id'            => 'map',
			// 	'name'          => 'Map',
			// 	'type'          => 'map',
			// 	// Default location: 'latitude,longitude[,zoom]' (zoom is optional)
			// 	'std'           => '39.7807961,-84.1093818',
			// 	// Name of text field where address is entered. Can be list of text fields, separated by commas (for ex. city, state)
			// 	'address_field' => 'address_autocomplete',
			// 	'api_key'       => 'AIzaSyBjasiximupDlBz9Tqgb1shcc6ZNoIusxs',
			// ),
		)
	);


	//Products
	$meta_boxes[] = array(
		'id' => 'product_details',
		'title' => '<span class="dashicons dashicons-store"></span> Product Details',
		'pages' => array( 'product'),
		'context' => 'normal',
		'priority' => 'high',
		'fields' => array(
			array(
				'name'		=> 'Base Price',
				'id'		=> "price",
				'class' => "pricing",
				'type'		=> 'text',
			),
			array(
				'name'		=> 'Domestic Shipping Cost',
				'id'		=> "dom_shipping",
				'class' => "pricing",
				'type'		=> 'text',
			),
			array(
				'name'		=> 'International Shipping Cost',
				'id'		=> "intnl_shipping",
				'class' => "pricing",
				'type'		=> 'text',
			),
		)
	);
	return $meta_boxes;
}

function duke_event_date_save_format($new,$field,$old){
	//hooks into meta-box plugin to customize save format of date field since we save it as unix
	return strtotime($new);
}
add_filter('rwmb_date_value','duke_event_date_save_format',10,3);

function duke_event_date_display_format($meta){
	//hooks into meta-box plugin to customize display format of date field since we save it as unix
	if($meta){
		$meta = date("F j, Y", $meta);
	}

	return $meta;
}
add_filter('rwmb_date_field_meta','duke_event_date_display_format',10,1);
