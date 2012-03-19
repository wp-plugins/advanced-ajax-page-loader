=== Advanced AJAX Page Loader ===
Contributors: deano1987, snumb130, bbodine1, HappyApple
Donate link: http://resplace.net
Version: 2.2.1
Tags: ajax, posts, pages, page, post, loading, loader, no refresh, dynamic, jquery
Requires at least: 2.0?
Tested up to: 3.3.1
Stable tag: 2.2.1

AJAX Page Loader will load posts, pages, etc. without reloading entire page.

== Description ==
Description:
AJAX Page Loader will load posts, pages, etc. without reloading entire page. It will also update the URL bar with the url the user would have been going to without AJAX, this means the user can copy the url or bookmark it and return to the page they were visiting! This plugin will also add the page to there history for even more usability!

If this has helped you and saved you time please consider a donation via PayPal to:

dt_8792@yahoo.co.uk

Many thanks to Luke Howell, author of the original plugin. 

== Change Log ==
V2.2.1 > Fixed small problems checking if jQuery is called.
V2.2.0 > Some workaround code so things like jscrollpane can work properly.
V2.1.0 > jQuery check to make sure it has not already been included
	   > jQuery var in advanced-ajax-page-loader.php, set this to false to stop jQuery being included altogether.
	   > When content is loaded you can optionally call document.ready, change the ready variable in javascript file.
V2.0.1 > Yup some fixes for the readme.
V2.0.0 > First release by Dean williams with a huge improvement...
       > Using jQuery more than pure javascript to help compatibility and code layout.
	   > Updated jquery to the latest 1.7 release.
	   > fade transitions used when ajax is loading the page.
	   > If a page fails to load it shows on the page (no ugly message box's)
	   > When a page is loaded the URL bar is updated on the browser for easy copying or bookmarking of links.
	   > When a page is loaded the browsers history is updated so that the user can go back/forward between pages.
	   > Easier to edit the used id for content area, some themes differ on this one so it's useful.
V1.0.0 > First release by Luke Howell. 

== Installation ==

1. Upload `advanced-ajax-page-loader` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress. 

== Frequently Asked Questions ==

Q: The plugin isn't working right,  HHEEEELLLPPPP!!!!!!!!

A: You may need to use the Theme Support Guide in order to use AJAX Page Loader with your custom theme.

Q: I have content that usually uses JavaScript but now that is not working when loaded with ajax.

A: Unfortunately any inline javascript in the HTML being loaded into the page is ignored by your browser, 
also any bindings for lightbox for example need to be reloaded when new HTML is put into the page. 
You need to take the code used to bind the javascript to your elements and re-call them after the content
changes... Put the binding code in the JS file after the line which says "DROP YOUR RELOAD CODES BELOW HERE"

----Theme Support----

This edit may be required by some users with certain themes that cause AJAX Page Loader to reload the sidebar along with the content.

1. Open your theme's index.php file.
2.  find the "div" tag that contains the following inside a php tag: " if (have_posts()) : while (have_posts()) : the_post(); " . 
3. Give this "div" tag a unique ID. (Example: div id="blogcontent")
4. Edit "ajax-page-loader.js" and replace the word "content" at the top of the page with your id of the content area.

If you theme's search function stops working or causes the page to reload, then you'll need to edit your theme's "search.php" and "searchform.php" files.

1. Edit your theme's "search.php" file.
2. Find the "div" tag that containsthe following inside a php tag:
 "if (have_posts()) : "
3. Give this "div" the same unique ID as mentioned earlier. (Example:  div id="blogcontent")
4. Now edit your theme's "searchform.php" file.
5. Make sure the "form" tag has the ID of "searchform" .
6. Make sure the "input" tag has the ID of "s"  . 
