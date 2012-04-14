<?php
/*
Plugin Name: Advanced AJAX Page Loader
Version: 2.4.8
Plugin URI: http://software.resplace.net/WordPress/AjaxPageLoader.php
Description: Load pages within blog without reloading page, shows loading bar and updates the browsers URL so that the user can bookmark or share the url as if they had loaded a page normally. Also updates there history so they have a track of there browsing habbits on your blog!
Author URI: http://dean.resplace.net
Author: deano1987

/// CONSIDER A DONATION: ///////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
//	I have provided quite allot of free help and several updates now to make it easier to integrate   //
//  other JavaScript with this plugin. If this plugin has saved you time then please consider         //
//  sending me a donation through paypal to:                                                          //
//                                                                                                    //
//  dt_8792@yahoo.co.uk                                                                               //
//                                                                                                    //
/// DONATION THANKS: ///////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
//	Travis Avery (travisavery)                                                                        //
//                                                                                                    //
/// SPECIAL THANKS: ////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
//  This code is loosly based on another plugin by Luke Howell                                        //
//                                                                                                    //
//  http://www.lukehowell.com/                                                                        //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////

---------------------------------------------------------------------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
---------------------------------------------------------------------
*/

//Set this to false to stop checking for jQuery
$checkJQuery = true;

if(!function_exists('get_option'))
  require_once('../../../wp-config.php');


// Set Hook for outputting JavaScript
add_action('wp_head','advanced_ajax_page_loader_js');

function advanced_ajax_page_loader_js() {?>
  <script type="text/javascript">
	jQueryScriptOutputted = <?php echo ($checkJQuery===false?"true":"false");?>;
	
	function initJQuery() {
		//if the jQuery object isn't available
		if (typeof($) == 'undefined') {
		
			if (! jQueryScriptOutputted) {
				//only output the script once..
				jQueryScriptOutputted = true;
				
				//output the jquery script
				document.write("<scr" + "ipt type='text/javascript' src='<?php echo plugins_url( 'jquery.js' , __FILE__ );?>'></scr" + "ipt>");
			}
			setTimeout("initJQuery()", 50);
			
		}
	}
	
	initJQuery();
  </script>

  <script type="text/javascript" src="<?php echo plugins_url( 'ajax-page-loader.js' , __FILE__ );?>"></script>
  <script type="text/javascript">
	//The old code here was RETARDED - Much like the rest of the code... Now I have replaced this with something better ;)
	//PRELOADING YEEEYYYYY!!
	var AAPLloadingIMG = $('<img/>').attr('src', '<?php echo plugins_url( 'loading.gif' , __FILE__ );?>');
	var AAPLloadingDIV = $('<div/>').attr('style', 'display:none;').attr('id', 'ajaxLoadDivElement');
	AAPLloadingDIV.appendTo('body');
	AAPLloadingIMG.appendTo('#ajaxLoadDivElement');
	//My code can either be seen as sexy? Or just a terribly orchestrated hack? Really it's up to you...
    
    var AAPLsiteurl="<?php echo get_settings('siteurl');?>";
    var AAPLhome="<?php echo get_settings('siteurl');?>";
  </script>
	<?php 
}
?>