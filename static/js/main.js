function updateMapContainer() {
	var width = $(window).width(),
		height = $(window).height();

	var map = $("#map").css({
		"width": width,
		"height":height,
	})

	return map;
}

function setEventListeners() {
	$(window).on('resize', function() {
		updateMapContainer();
	});
}

$(document).ready(function() {
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.cloudmade.com/5015436ad80f44af82c15054968f1468/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

updateMapContainer();

//Is geocoding on server?  If so, should we just pass 
//search query to string and parse address/city/etc.
//on server or do it in client and then send to server?
//or do we just send lat/long to server?

});