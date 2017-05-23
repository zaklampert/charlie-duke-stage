
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Charlie Duke</title>
	<meta name="title" content="Charlie Duke" />
	<meta name="description" content="Charlie Duke." />
	<meta name="a022" content="WPE" />


  <style>
    html {
			background: url('<?php echo get_stylesheet_directory_uri();?>/images/duke.jpg') no-repeat center center fixed;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
    }
		</style>
</head>
<body style="background: #fff;">
	<?php
	$meta = array(
		'meta_query' => array(
			array(
				'key' => 'event_date',
				'value' => strtotime("today"),  //get current date in UNIX so we can compare to event dates
				'compare' => '>=',
			),
	)
);
echo serialize($meta);
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

		// The Loop
		if ( $the_query->have_posts() ) {
			echo '<ul>';
			while ( $the_query->have_posts() ) {
				$the_query->the_post();
				echo '<li>' . get_the_title() . '</li>';
			}
			echo '</ul>';
			/* Restore original Post Data */
			wp_reset_postdata();
		} else {
			// no posts found
		}

	?>

</body>


</html>
