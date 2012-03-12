//CHANGE THIS TO MATCH THE ID OF YOUR CONTENT AREA IN YOUR THEME
var content = "content";

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
    /*if(this.href.split('?')[1].split('=')[0]=='m'||
       this.href.split('?')[1].split('=')[0]=='p'||
       this.href.split('?')[1].split('=')[0]=='cat'||
       this.href.split('?')[1].split('=')[0]=='page_id'){*/
      // stop default behaviour
      event.preventDefault();
      // remove click border
      this.blur();
      // get caption: either title or name attribute
      var caption = this.title || this.name || "";
      // get rel attribute for image groups
      var group = this.rel || false;
      // display the box for the elements href
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
			var stateObj = { foo: 1000 + Math.random()*1001 };
			history.pushState(stateObj, "ajax page loaded...", path);
		}
		
		//start changing the page content.
		$('#' + content).fadeOut("slow", function() {
			$('#' + content).html('<center>Loading... Please Wait...<br><img src="'+loadingIMG.src+'" border="0" alt="(Loading Animation)" title="Please Wait..." /></center>');
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
		$('#' + content).html('<center>Loading... Please Wait...<br><img src="'+loadingIMG.src+'" border="0" alt="(Loading Animation)" title="Please Wait..." /></center>');
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
			$('#' + content).fadeOut("slow", function() {
				$('#' + content).html(output);
				$('#' + content).fadeIn("slow", function() {
					//recall loader so that new URLS are captured.
					pageLoaderInit();
				});
			});
		} else {
			//Would append this, but would not be good if this fired more than once!!
			$('#' + content).html('<center>Loading... Please Wait...<br><img src="'+loadingIMG.src+'" border="0" alt="(Loading Animation)" title="Please Wait..." /><br><font color="red">There seems to be a problem, please click the link again.</font></center>');
		}
	}
}