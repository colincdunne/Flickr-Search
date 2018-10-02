/*
Author: Colin Dunne
Student ID: R00115734
Class: COM3
Email: colin.c.dunne@mycit.ie
*/

var numTags = 1;
var nip = 360;
var curImg = 0;


function initialize_gmap(value){
	var ltlg = value.split(',');
	var myLatlng = new google.maps.LatLng(ltlg[0],ltlg[1]);
	var myOptions = {
		zoom: 4,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: true
	}
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map
	});
}

function addInputButton() {
 	var nextLine = document.createElement("div");
 	nextLine.id = 'nLine';
 	nextLine.className = 'nLine';
 	var line = document.getElementById("outField");
 	line.appendChild(nextLine);
 	var cell = document.createElement("input");
 	var button1 = document.createElement("input");
 	cell.type = "input";
 	cell.id = "id" + numTags;
 	button1.type = "button";
    button1.id = "btnDel";
 	cell.value = "";
 	button1.value = "Delete";
 	nextLine.appendChild(cell);
 	nextLine.appendChild(button1);
	//document.getElementById(added);
	button1.setAttribute("onclick", "delInputButton(this)")
    var newLine = document.createElement('br');
    line.appendChild(newLine);
	numTags++;
}

function delInputButton(click) {
	click.parentNode.parentNode.removeChild(click.parentNode);
	numtag--;
}

function retrievePhotos() {
 	reset();
 	var tagInput = "";
 	var checkTags = 0;
 	var present = "";
 	do {
 		if (document.getElementById("id" + checkTags) != null) {
 			present = document.getElementById("id" + checkTags).value;
 			tagInput += present + ",";
			//checkTags--;
		}
		checkTags++;
	} while (checkTags < numTags);

	tagInput = tagInput.slice(0, -1);
	tagInput = escape(tagInput);

	newScript = document.createElement('script');
	request = "https://www.flickr.com/services/rest/?";
	request += "method=flickr.photos.search";
	request += "&per_page=40";
	request += "&api_key=41dfb2d8b9019ce3b13be34fc3e06915";
	request += "&tags=" + tagInput;
	request += "&format=json";
	request += "&tag_mode=all";
	newScript.setAttribute('src', request);
	document.getElementsByTagName('head')[0].appendChild(newScript);
	// document.getElementById('middle').innerHTML = "Loading . . .";
	// document.getElementById('display').innerHTML = "Loading . . .";
	// document.getElementById('flickrB').innerHTML == "Loading";
	// addOverlay('carousel');
	addOverlay('display');
	document.getElementById('flickrB').innerHTML = 'Finding....';
}

function jsonFlickrApi(images) {
	console.log(images);
	document.getElementById('flickrB').innerHTML = 'Search Flickr';
	if(images.stat=="ok") {
		if(images.photos.total > 0) {
			newStr = "";
			for (i = 0; i < images.photos.photo.length; i++) {
				url = "http://farm" + images.photos.photo[i].farm;
				url += ".static.flickr.com/";
				url += images.photos.photo[i].server + "/";
				url += images.photos.photo[i].id + "_";
				url += images.photos.photo[i].secret;
				url2 = url;
				url += "_s.jpg";
				url2 += "_n.jpg";
				console.log(url);
				console.log(url2);
				newStr += " <img  src = " + url + " id = images" + i + " onclick = displaying(src) > ";
				if (i == 0) {
					displaying(url2);
				}
			}
 			document.getElementById('middle').innerHTML = newStr;
		} else {
			alert('No images available');
			removeOverlay('overlayDocument');
		}
	} else {
		alert('Please enter different tag');
		removeOverlay('overlayDocument');
		// removeOverlay('overlayDocument');
		document.getElementById('display').innerHTML = "<center><p style='color: black;'><b>No Results</b></p></center>";
	}

}

function myFunction() {
	//var pos = nip;
	//document.getElementById("middle").style.left = (nip +"px");
	var move = document.getElementById("middle");
	var pos = 0;
	var id = setInterval(frame, 1);

	function frame() {
		if (pos == 79) {
			clearInterval(id);
		} else {
			pos++;
			nip++;
			move.style.left = nip + 'px';
		}
	}
}

function myFunctionP() {
	//nip -= 100;
	//document.getElementById("middle").style.left = (nip +"px");
	var move = document.getElementById("middle");
	var pos = 0;
	var id = setInterval(frame, 1);

	function frame() {
		if (pos == 79) {
			clearInterval(id);
		} else {
			pos++;
			nip--;
			move.style.left = nip + 'px';
		}
	}
}

function reset() {
	/*nip = 360;
	document.getElementById("middle").style.left = (nip + "px");*/
}

function displaying(url) {
	document.getElementById('display').innerHTML = "Loading . . .";
	if (display.hasChildNodes()) {
		display.removeChild(display.firstChild);
	}
	url = url.substring(0, url.length - 6);
	url += "_n.jpg";
	var real = document.createElement("img");
	real.setAttribute("id", "thatReal");
	real.setAttribute("src", url);
	real.onload = display;
	display.appendChild(real);
}
document.onkeydown = checkKey;

function checkKey(e) {
	// left key
	if (e.keyCode == '37') {
		//images2.displaying(src);
		myFunction();
	}
	// right key
	if (e.keyCode == '39') {
		myFunctionP();
	}
}

function addOverlay(element) {
	var maincontent = document.getElementById(element);
	maincontent.innerHTML = '<div id="overlayDocument"><img src="images/ajax-modal-loading.gif"></div>';
}

function removeOverlay(id) {
    var elem = document.getElementById(id);
    if(elem != null) {
    	return elem.parentNode.removeChild(elem);
    }
}