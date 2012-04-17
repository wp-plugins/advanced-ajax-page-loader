/*
Plugin Name: Advanced AJAX Page Loader
Version: 2.5.1
Plugin URI: http://software.resplace.net/WordPress/AjaxPageLoader.php
Description: Load pages within blog without reloading page, shows loading bar and updates the browsers URL so that the user can bookmark or share the url as if they had loaded a page normally. Also updates there history so they have a track of there browsing habbits on your blog!
Author URI: http://dean.resplace.net
Author: Dean Williams
*/

//Set this to true if your getting some javascript problems
var DocReadyReload = false;

//Dont mess with these...
var isWorking = false;
var startAjax = false;
var searchAction = null;


//The holy grail...
$(document).ready(function() {
	AAPL_loadPageInit("");
});


window.onpopstate = function(event) {
	//# links sets off onpopstate... lets make sure we ignore it ;)
	if (startAjax === true && this.href.indexOf('#') < 0) {
	
		AAPL_loadPage(document.location.toString(),1);
	}
};

function AAPL_loadPageInit(scope){
	$(scope+"a").click(function(event){
		//if its not an admin url, or doesnt contain #
		if (this.href.indexOf(AAPLhome) >= 0 && this.href.indexOf('/wp-') < 0 && this.href.indexOf('#') < 0){
			// stop default behaviour
			event.preventDefault();

			// remove click border
			this.blur();

			// get caption: either title or name attribute
			var caption = this.title || this.name || "";

			// get rel attribute for image groups
			var group = this.rel || false;

			// highlight the current menu item
			$('ul.menu li').each(function() {
				$(this).removeClass('current-menu-item');
			});
			$(this).parents('li').addClass('current-menu-item');
			
			
			//menu item changer if your using "Suffusion" theme
			/*
			$('ul.sf-menu li').each(function() {
				$(this).removeClass('current_page_item');
				$(this).find('a').removeClass('current');
			});
			$(this).parents('li').addClass('current_page_item');
			$('li.current_page_item a').addClass('current');
			*/

			// display the box for the elements href
			AAPL_loadPage(this.href);
		}
	});
  
	if (scope == "") { 
		if ($('#searchform').attr("action")) {
			//Get the current action so we know where to submit to
			searchAction = $('#searchform').attr("action");

			//bind our code to search submit, now we can load everything through ajax :)
			$('#searchform').name = 'searchform';
			$('#searchform').attr("action", "javascript:submitSearch('s='+document.getElementById('s').value)");
		} else {
			if (AAPL_warnings == true) {
				alert("Could not bind to search form...\nCould not find element with id='searchform' or attribute 'action' missing.");
			}
		}
	}
}

function AAPL_loadPage(url, push, getData){

	if (!isWorking){
		scroll(0,0);
		isWorking = true;
		
		//enable onpopstate
		startAjax = true;
		
		//AJAX Load page and update address bar url! :)
		//get domain name...
		nohttp = url.replace("http://","").replace("https://","");
		firstsla = nohttp.indexOf("/");
		pathpos = url.indexOf(nohttp);
		path = url.substring(pathpos + firstsla);
		
		//Only do a history state if clicked on the page.
		if (push != 1) {
			//TODO: implement a method for IE
			if (typeof window.history.pushState == "function") {
				var stateObj = { foo: 1000 + Math.random()*1001 };
				history.pushState(stateObj, "ajax page loaded...", path);
			} else {
				if (AAPL_warnings == true) {
					alert("'pushState' method not supported in this browser, sorry about that!");
				}
			}
		}
		
		if (!$('#' + AAPL_content)) {
			if (AAPL_warnings == true) {
				alert("Could not find content region, you need to set an ID to an element that surrounds the content on the page, make sure the 'content' variable is also set to the ID name.");
				return false;
			}
		}
		
		//start changing the page content.
		$('#' + AAPL_content).fadeOut("slow", function() {
			$('#' + AAPL_content).html('<center><p style="text-align: center !important;">Loading... Please Wait...</p><p style="text-align: center !important;"><img src="' + AAPLloadingIMG.attr('src') + '" border="0" alt="(Loading Animation)" title="Please Wait..." /></p></center>');
			$('#' + AAPL_content).fadeIn("slow", function() {
				$.ajax({
					type: "GET",
					url: url,
					data: getData,
					cache: true,
					dataType: "html",
					success: function(data) {
						isWorking = false;
						//get title attribute
						datax = data.split('<title>');
						titlesx = data.split('</title>');
						
						if (datax.length == 2 || titlesx.length == 2) {
							data = data.split('<title>')[1];
							titles = data.split('</title>')[0];
							
							//set the title?
							//TODO: this still doesnt set the title in the history list (atleast in chrome...) more research required here.
							document.title =  $('<div>').text(titles).html();
						} else {
							if (AAPL_warnings == true) {
								alert("You seem to have more than one <title> tag on the page, this is going to cause some major problems so page title changing is disabled.");
							}
						}
						
						//get content
						data = data.split('id="' + AAPL_content + '"')[1];
						data = data.substring(data.indexOf('>') + 1);
						var depth = 1;
						var output = '';
						
						while(depth > 0) {
							temp = data.split('</div>')[0];
							
							//count occurrences
							i = 0;
							pos = temp.indexOf("<div");
							while (pos != -1) {
								i++;
								pos = temp.indexOf("<div", pos + 1);
							}
							//end count
							depth=depth+i-1;
							output=output+data.split('</div>')[0] + '</div>';
							data = data.substring(data.indexOf('</div>') + 6);
						}

						//put the resulting html back into the page!
						$('#' + AAPL_content).html(output);

						//move content area so we cant see it.
						$('#' + AAPL_content).css("position", "absolute");
						$('#' + AAPL_content).css("left", "20000px");

						//show the content area
						$('#' + AAPL_content).show();

						//recall loader so that new URLS are captured.
						AAPL_loadPageInit("#" + AAPL_content + " ");
						
						if (DocReadyReload == true) {
							$(document).trigger("ready");
						}
						
						/////////////////////////////////////////
						//  DROP YOUR RELOAD CODES BELOW HERE  //
						/////////////////////////////////////////
						
						AAPL_reload_code();		
						
						/////////////////////////////////////////
						//  DROP YOUR RELOAD CODES ABOVE HERE  //
						/////////////////////////////////////////
						
						//How to re-call the jScrollPane...
						//$('.scroll-pane').jScrollPane();
						
						//How to re-call nivoSlider
						//$('#slider').nivoSlider({
						//	pauseTime:3000,
						//	effect:'boxRandom',
						//	animSpeed:700,
						//	directionNav:true,
						//	controlNav: false
						//});

						//now hide it again and put the position back!
						$('#' + AAPL_content).hide();
						$('#' + AAPL_content).css("position", "");
						$('#' + AAPL_content).css("left", "");

						$('#' + AAPL_content).fadeIn("slow", function() {
							//errmmm... Well isnt this embarrasing... Nothing to do here :s Kinda makes you think why is there a function attatched in the first place...
							return true;
							//Ahhh. See what I did there? NO ITS NOT POINTLESS... NO! ... ummm ok it kinda is :(
							//.
							//..
							//...
							//....
							//Funny though ;)
						});
					},
					error: function(jqXHR, textStatus, errorThrown) {
						//Would append this, but would not be good if this fired more than once!!
						isWorking = false;
						document.title = "Error loading requested page!";
						$('#' + AAPL_content).html('<center><p style="text-align: center !important;"><b>Error!</b></p><p style="text-align: center !important;"><font color="red">There seems to be a problem, please click the link again.</font></p></center>');
					}
				});
			});
		});
	}
}

function submitSearch(param){
	if (!isWorking){
		AAPL_loadPage(searchAction, 0, param);
	}
}