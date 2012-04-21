=== Advanced AJAX Page Loader ===
Contributors: deano1987, HappyApple, snumb130, bbodine1
Donate link: http://resplace.net
Version: 2.5.4
Tags: ajax, posts, pages, page, post, loading, loader, no refresh, dynamic, jquery
Requires at least: 2.0?
Tested up to: 3.3.1
Stable tag: 2.5.4

AJAX Page Loader will load posts, pages, etc. without reloading entire page.

== Description ==
Description:
AJAX Page Loader will load posts, pages, etc. without reloading entire page. It will also update the URL bar with the url the user would have been going to without AJAX, this means the user can copy the url or bookmark it and return to the page they were visiting! This plugin will also add the page to there history for even more usability!

If this has helped you and saved you time please consider a donation via PayPal to:

dt_8792@yahoo.co.uk

Many thanks to Luke Howell, author of the original plugin. 

== Changelog ==

= 1.0.0 =
* First release by Luke Howell.

= 2.0.0 =
* First release by Dean williams with a huge improvement...
* Using jQuery more than pure javascript to help compatibility and code layout.
* Updated jquery to the latest 1.7 release.
* fade transitions used when ajax is loading the page.
* If a page fails to load it shows on the page (no ugly message box's)
* When a page is loaded the URL bar is updated on the browser for easy copying or bookmarking of links.
* When a page is loaded the browsers history is updated so that the user can go back/forward between pages.
* Easier to edit the used id for content area, some themes differ on this one so it's useful.

= 2.0.1 =
* Yup some fixes for the readme.

= 2.1.0 =
* jQuery check to make sure it has not already been included
* jQuery var in advanced-ajax-page-loader.php, set this to false to stop jQuery being included altogether.
* When content is loaded you can optionally call document.ready, change the ready variable in javascript file.

= 2.2.0 =
* Some workaround code so things like jscrollpane can work properly.

= 2.2.1 =
* Fixed small problems checking if jQuery is called.

= 2.2.2 =
* Removed link-back as it is against wordpress TOC

= 2.3.0 =
* Load current menu item (thanks to euphoriuhh).
* nivoslider example reload code added.
* IE fix for browser history (thanks to euphoriuhh).
* Now sets page title when you change page.

= 2.4.0 =
* onpopstate fixed, sometimes clicking back on the browser would not work... Now it should!
* The bindings to the search form were pretty poor (original authors code), I have re-written this and it should now work much better, still needs a little improving though.
* Ajax requesting code completely re-written to use jQuery's library, this should offer better compatibility between browsers, makes the code neater and offers more options such as caching.
* Ajax requests are not cached, and error catching is more reliable (you dont see it randomly when the page is in fact loading correctly).
* New 'warnings' system implemented to give you debug if you set 'showWarnings' to 'true' in the .js file... This could help us BOTH ;)

= 2.4.5 =
* Fixed back button again and again and again and again (sorry my bad)

= 2.4.6 =
* Page title doesnt show html special character encoding anymore.

= 2.4.7 =
* HTML Special characters in the page <title> now display correctly (I hope).
* Anchor links (hash (#) links) are now ignored by the ajax process.
* I think I#m now correctly tagging my releases, hopefully!


= 2.4.8 =
* # links fix.
* Improvements to loading.gif handling, dont need to provide dimensions anymore :)
* Improvements to loading.gif handling, image is now pre-loaded and kept in memory :)
* plugin file path code improved, now using plugins_url instead of hard coded paths!
* Suffusion menu bar changer included (need to uncomment it to use it)
* loading is more likely to be centered now - yup

= 2.5.0 =
* reverted AAPLhome variable as suggested by Brandon Nourse.
* admin panel added for various options.
* added ability to change the target id for changing content.
* added ability to change/upload the loading image (image will now be kept on updates).
* added ability to set reload code in admin panel, this will be kept upon upgrading.
* Enable Javascript debug and jQuery check from the admin panel.
* You can optionally enable a footer link to link to the project site!
* Various sample loaders included so you can choose one to suit you.

= 2.5.1 =
* Fix for reload code.

= 2.5.2 =
* Fix for back button.

= 2.5.3 =
* admin panel work, MORE FEATURES!!! :D
* - You can now set the loading HTML code.
* - You can also set the loading error HTML code.
* - The href ignore has been extended and can now be changed in the admin panel.

= 2.5.4 =
* Plugin is disabled for IE7 and IE8 due to the peakaboo rendering bug in these versions.

== Upgrade Notice ==

= 2.3.0 = 
This version fix's IE issues and updates the page title. dont forget to backup any custom inserted code in the JS file before updating.

= 2.4.0 =
This version brings better cross-browser compatiblity, includes better error checking and fixes some annoying bugs.

= 2.4.6 =
Fixed back button again and again and again and again (sorry my bad)

= 2.4.7 =
Page titles will display better, and if you have any links with an anchor reference (# hash) they will be ignored.

= 2.4.8 =
fixes for # links and general plugin improvements!

= 2.5.0 =
majour changes, <b>MAKE SURE YOU BACKUP YOUR PLUGIN BEFORE UPGRADE JUST INCASE!</b> There is now an admin panel for settings (settings will be retained on update!).

= 2.5.1 =
small fix for reload code (well more of a confusion fix).

= 2.5.2 =
omg more back button fixes!

= 2.5.3 =
More editable features in the admin panel.

= 2.5.4 =
Plugin is disabled for IE7 and IE8 due to the peakaboo rendering bug in these versions.

== Installation ==

1. Upload `advanced-ajax-page-loader` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. make sure your theme has the content area wrapped in a tag such as a DIV with an id attribute called "content". (data within this div will be replaced with AJAX content). SEE THEME GUIDE IN FAQ.

== Frequently Asked Questions ==

Q: The plugin isn't working right,  HHEEEELLLPPPP!!!!!!!!

A: You may need to use the Theme Support Guide in order to use AJAX Page Loader with your custom theme (SEE BELOW). But try turning on "Debug Messages" in the admin settings first, report any messages to the wordpress forums.

Q: I have content that usually uses JavaScript but now that is not working when loaded with ajax.

A: Unfortunately any inline javascript in the HTML being loaded into the page is ignored by your browser, 
also any bindings for lightbox for example need to be reloaded when new HTML is put into the page. 
You need to take the code used to bind the javascript to your elements and re-call them after the content
changes... Put the binding code in the JS file after the line which says "DROP YOUR RELOAD CODES BELOW HERE"

I have included a few example codes for nivoslider and jScrollPane, if you have other code please let me know and I can add it to the list.

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
5. Make sure the "form" tag has the ID of "searchform".
6. Make sure the "input" tag has the ID of "s".

== Donations ==

I have got to give a very special thanks to the people mentioned below who have offered their support with donations, let me also take the time to thank others who report problems, offer solutions and help debug the plugin. I really appreciate the excellent support and feedback :).

* Travis Avery (travisavery)
* AlohaThemes (http://alohathemes.com/)

Please send your donations to:

dt_8792@yahoo.co.uk