$(document).ready(function() {
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.cloudmade.com/5015436ad80f44af82c15054968f1468/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

function updateMapContainer() {
	var width = $(window).width(),
		height = $(window).height();

	var map = $("#map").css({
		"width": width,
		"height":height,
	})

	return map;
}

$(window).on('resize', function() {
	updateMapContainer();
});

updateMapContainer();
});