<?php
/**
 * Plugin Name: Meta Box Updater
 * Plugin URI: https://metabox.io/plugins/meta-box-updater/
 * Description: Updater for Meta Box extensions
 * Version: 1.1.4
 * Author: Rilwis
 * Author URI: http://www.deluxeblogtips.com
 * License: GPL2+
 */

defined( 'ABSPATH' ) || die;

require plugin_dir_path( __FILE__ ) . 'class-mb-updater.php';
new MB_Updater;

require plugin_dir_path( __FILE__ ) . 'class-mb-updater-settings.php';
new MB_Updater_Settings;
