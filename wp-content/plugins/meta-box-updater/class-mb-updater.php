<?php

/**
 * The updater class for Meta Box extensions
 *
 * @package    Meta Box
 * @subpackage Meta Box Updater
 *
 * @author     Tran Ngoc Tuan Anh <rilwis@gmail.com>
 */
class MB_Updater {
	/**
	 * API URL for checking update information.
	 * @var string
	 */
	public static $api_url = 'https://metabox.io/index.php';

	/**
	 * Setup hooks.
	 */
	public function __construct() {
		add_filter( 'pre_set_site_transient_update_plugins', array( $this, 'check_updates' ) );
		add_filter( 'plugins_api', array( $this, 'get_info' ), 10, 3 );
	}

	/**
	 * Check plugin for updates
	 *
	 * @param $data
	 *
	 * @return mixed
	 */
	public function check_updates( $data ) {
		static $plugins = null;

		// Make sure to send remote request once
		if ( null === $plugins ) {
			$plugins = $this->request( 'action=check_updates' );
		}

		if ( false === $plugins ) {
			return $data;
		}

		if ( ! isset( $data->response ) ) {
			$data->response = array();
		}

		$plugins = array_filter( $plugins, array( $this, 'has_update' ) );
		foreach ( $plugins as $plugin ) {
			$data->response[$plugin->plugin] = $plugin;
		}

		$option            = get_option( 'meta_box_updater', array() );
		$option['plugins'] = array_keys( $plugins );
		update_option( 'meta_box_updater', $option );

		return $data;
	}

	/**
	 * Get plugin information
	 *
	 * @param object $data
	 * @param string $action
	 * @param object $args
	 *
	 * @return mixed
	 */
	public function get_info( $data, $action, $args ) {
		$option  = get_option( 'meta_box_updater', array() );
		$plugins = isset( $option['plugins'] ) ? $option['plugins'] : array();
		if ( 'plugin_information' != $action || ! isset( $args->slug ) || ! in_array( $args->slug, $plugins ) ) {
			return $data;
		}

		$info = self::request( array(
			'action'  => 'get_info',
			'product' => $args->slug,
		) );

		return false === $info ? $data : $info;
	}

	/**
	 * Send request to remote host
	 *
	 * @param array|string $args Query arguments
	 *
	 * @return bool|mixed
	 */
	public static function request( $args = '' ) {
		// Add email and API key to the request params
		$option = get_option( 'meta_box_updater', array() );
		$args   = wp_parse_args( $args, $option );
		$args   = array_filter( $args );

		$request = wp_remote_post( self::$api_url, array(
			'body' => $args,
		) );

		if ( $response = wp_remote_retrieve_body( $request ) ) {
			$data = @unserialize( $response );

			return $data;
		}

		return false;
	}

	/**
	 * Check if a plugin has an update to a new version.
	 *
	 * @param object $plugin_data
	 *
	 * @return bool
	 */
	protected function has_update( $plugin_data ) {
		$plugins = get_plugins();

		return isset( $plugins[ $plugin_data->plugin ] ) && version_compare( $plugins[ $plugin_data->plugin ]['Version'], $plugin_data->new_version, '<' );
	}
}
