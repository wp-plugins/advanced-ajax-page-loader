<?php
/*
Plugin Name: Advanced AJAX Page Loader
Version: 2
Plugin URI: http://software.resplace.net/WordpressPlugins/AJAXPageLoad/
Description: Load pages within blog without reloading page, shows loading bar and updates the browsers URL so that the user can bookmark or share the url as if they had loaded a page normally. Also updates there history so they have a track of there browsing habbits on your blog!
Author URI: http://dean.resplace.net
Author: Dean Williams

/// SPECIAL THANKS: ////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
//  This code is based in part from another AJAX Page Loading plugin created by Luke Howell,          //
//  Most of this code was changed/updated and improved upon but credit I feel is very much deserved.  //
//  Thanks Luke for this original plugin and giving me a base in which to create this plugin.         //
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

/*
	Changes: 

	V2.0.0 > First version by Dean Williams
	V1.0.0 > by Luke howell - see special thanks

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
		if (typeof(jQuery) == 'undefined') {
		
		
			if (! jQueryScriptOutputted) {
				//only output the script once..
				jQueryScriptOutputted = true;
				
				//output the script (load it from google api)
				document.write("<scr" + "ipt type=\"text/javascript\" src=\"<?php echo get_settings('home')?>/wp-content/plugins/advanced-ajax-page-loader/jquery.js\"></scr" + "ipt>");
			}
			setTimeout("initJQuery()", 50);
		}
	}
	initJQuery();
  </script>

  <script type="text/javascript" src="<?php echo get_settings('home')?>/wp-content/plugins/advanced-ajax-page-loader/ajax-page-loader.js"></script>
  <script type="text/javascript" src="<?php echo get_settings('home')?>/wp-content/plugins/advanced-ajax-page-loader/querystring.js"></script>
  <script type="text/javascript">
    if (document.images){
      loadingIMG= new Image(16,16); 
      loadingIMG.src="<?php echo get_settings('home')?>/wp-content/plugins/advanced-ajax-page-loader/loading.gif";
    }
    var siteurl="<?php echo get_settings('siteurl');?>";
    var home="<?php echo get_settings('home')?>";
  </script>
<?php }?>