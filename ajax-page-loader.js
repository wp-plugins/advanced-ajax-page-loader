/*
Plugin Name: Advanced AJAX Page Loader
Version: 2.3.0
Plugin URI: http://software.resplace.net/WordPress/AjaxPageLoader.php
Description: Load pages within blog without reloading page, shows loading bar and updates the browsers URL so that the user can bookmark or share the url as if they had loaded a page normally. Also updates there history so they have a track of there browsing habbits on your blog!
Author URI: http://dean.resplace.net
Author: Dean Williams
*/

//CHANGE THIS TO MATCH THE ID OF YOUR CONTENT AREA IN YOUR THEME
var content = "content";

//Set this to true if your getting sone javascript problems
var DocReadyReload = false;

var isWorking = false;
var http = getHTTPObject();

$(document).ready(pageLoaderInit);

window.onpopstate = function(event) {
	//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	if (event.state != undefined) {
		loadPage(document.location.toString(),1);
	}
};

function pageLoaderInit(){
	$("a").click(function(event){
		if(this.href.indexOf(home)>=0&&this.href.indexOf('/wp-') < 0){
			//stop default behaviour
			event.preventDefault();

			//remove click border
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

			// load the content
			loadPage(this.href);
		}
	});
	$('#searchform').name = 'searchform';
	$('#searchform').attr("action", "javascript:submitSearch('?s='+document.getElementById('s').value)");
}

function getHTTPObject() {
  var xmlhttp;
if (window.XMLHttpRequest) {
  // If IE7, Mozilla, Safari, and so on: Use native object.
  xmlhttp = new XMLHttpRequest();
}
else
{
  if (window.ActiveXObject) {
     // ...otherwise, use the ActiveX control for IE5.x and IE6.
     xmlhttp = new ActiveXObject('MSXML2.XMLHTTP.3.0');
  }
}
  return xmlhttp;
}

function loadPage(url, push){

	if (!isWorking){
		scroll(0,0);
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
			}
		}
		
		//start changing the page content.
		$('#' + content).fadeOut("slow", function() {
			$('#' + content).html('<center><p>Loading... Please Wait...</p><p><img src="'+loadingIMG.src+'" border="0" alt="(Loading Animation)" title="Please Wait..." /></p></center>');
			$('#' + content).fadeIn("slow", function() {
				http.open('GET', url, true);
				isWorking = true;
				http.onreadystatechange = showPage;
				http.send(null);
			});
		});
	}
}

function submitSearch(param){
	if (!isWorking){
		scroll(0, 0);
		$('#' + content).html('<center><p>Loading... Please Wait...</p><p><img src="'+loadingIMG.src+'" border="0" alt="(Loading Animation)" title="Please Wait..." /></p></center>');
		http.open('GET',window.location+param,true);
		isWorking = true;
		http.onreadystatechange = showPage;
		http.send(null);
	}
}

function showPage(){
	if (http.readyState == 4) {
		if (http.status == 200) {
			isWorking = false;
			var details = http.responseText;
			
			//get title attribute
			details = details.split('<title>')[1];
			titles = details.split('</title>')[0];
			
			//set the title?
			//TODO: this still doesnt set the title in the history list (atleast in chrome...) more research required here.
			document.title = titles;
			
			//get content
			details = details.split('id="' + content + '"')[1];
			details = details.substring(details.indexOf('>') + 1);
			var depth = 1;
			var output = '';
			
			while(depth > 0) {
				temp = details.split('</div>')[0];
				
				//count occurrences
				i = 0;
				pos = temp.indexOf("<div");
				while (pos != -1) {
					i++;
					pos = temp.indexOf("<div", pos + 1);
				}
				//end count
				depth=depth+i-1;
				output=output+details.split('</div>')[0] + '</div>';
				details = details.substring(details.indexOf('</div>') + 6);
			}

			//put the resulting html back into the page!
			$('#' + content).html(output);

			//move content area so we cant see it.
			$('#' + content).css("position", "absolute");
			$('#' + content).css("left", "20000px");

			//show the content area
			$('#' + content).show();

			//do the code
			pageLoaderInit();
			if (DocReadyReload == true) {
				$(document).trigger("ready");
			}
			
			/////////////////////////////////////////
			//  DROP YOUR RELOAD CODES BELOW HERE  //
			/////////////////////////////////////////
			
			//Here.			
			
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
			$('#' + content).hide();
			$('#' + content).css("position", "");
			$('#' + content).css("left", "");

			$('#' + content).fadeIn("slow", function() {
				//recall loader so that new URLS are captured.
				
			});
		} else {
			//Would append this, but would not be good if this fired more than once!!
			document.title = "Error loading requested page!";
			$('#' + content).html('<center><p><b>Error!</b></p><p><p><font color="red">There seems to be a problem, please click the link again.</font></p></center>');
		}
	}
}