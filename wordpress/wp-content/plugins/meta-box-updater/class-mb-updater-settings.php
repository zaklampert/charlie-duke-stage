<?php
/**
 * Meta Box Updater Settings
 *
 * This class handles plugin settings, including adding settings page, show fields, save settings
 *
 * @package    Meta Box
 * @subpackage Meta Box Updater
 *
 * @since      0.1.0
 * @author     Tran Ngoc Tuan Anh <rilwis@gmail.com>
 */

/**
 * Meta Box Updater Settings class
 *
 * @package    Meta Box
 * @subpackage Meta Box Updater
 *
 * @author     Tran Ngoc Tuan Anh <rilwis@gmail.com>
 */
class MB_Updater_Settings {
	/**
	 * Store settings page hook
	 * @var string
	 */
	public $hook;

	/**
	 * Add hooks.
	 */
	public function __construct() {
		// Register plugin setting
		add_action( 'admin_init', array( $this, 'register_setting' ) );

		// Add plugin menu
		add_action( 'admin_menu', array( $this, 'add_plugin_menu' ) );
	}

	/**
	 * Register plugin setting, settings section and fields using Settings API.
	 */
	public function register_setting() {
		register_setting( 'meta_box_updater', 'meta_box_updater', array( $this, 'sanitize' ) );

		add_settings_section( 'default', '', '__return_false', 'meta-box-updater' );
		add_settings_field(
			'api_key',
			esc_html__( 'API Key', 'meta-box-updater' ),
			array( $this, 'api_field' ),
			'meta-box-updater',
			'default',
			'api_key'
		);
	}

	/**
	 * Add plugin menu under Settings WordPress menu.
	 */
	public function add_plugin_menu() {
		$this->hook = add_options_page( esc_html__( 'Meta Box Updater', 'meta-box-updater' ), esc_html__( 'Meta Box Updater', 'meta-box-updater' ), 'manage_options', 'meta-box-updater', array(
			$this,
			'show_page'
		) );
	}

	/**
	 * Show content of settings page via Settings API.
	 */
	public function show_page() {
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Meta Box Updater' ); ?></h1>
			<p><?php esc_html_e( 'Please enter your API key to receives updates for Meta Box extensions.', 'meta-box-updater' ); ?></p>
			<p><?php printf( __( 'To get API key, please visit your profile page at <a href="%s" target="_blank">metabox.io website</a>.', 'meta-box-updater' ), 'https://metabox.io/support/' ); ?></p>

			<form action="options.php" method="post">

				<?php settings_fields( 'meta_box_updater' ); ?>
				<?php do_settings_sections( 'meta-box-updater' ); ?>
				<?php submit_button( __( 'Save Changes', 'meta-box-updater' ) ); ?>

			</form>
		</div>
		<?php
	}

	/**
	 * Show text field
	 *
	 * @param string $id Field ID, used as option name
	 */
	public function api_field( $id ) {
		$option = get_option( 'meta_box_updater' );
		$value  = isset( $option[ $id ] ) ? $option[ $id ] : '';

		echo '<input type="password" required class="regular-text" name="meta_box_updater[' . esc_attr( $id ) . ']" value="' . esc_attr( $value ) . '">';
	}

	/**
	 * Verify user license when saving plugin options
	 *
	 * @param array $option Plugin optio
	 *
	 * @return array
	 */
	public function sanitize( $option ) {
		// Make sure we check the license only on settings page
		if ( 'option_page' !== filter_input( INPUT_POST, 'option_page' ) ) {
			return $option;
		}

		$args           = $option;
		$args['action'] = 'check_license';
		if ( $message = MB_Updater::request( $args ) ) {
			add_settings_error( 'meta-box-updater', 'invalid', $message );
		}

		return $option;
	}
}
