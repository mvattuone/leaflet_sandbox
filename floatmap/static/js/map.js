function updateMapContainer() {
	var width = $(window).width(),
		height = $(window).height();

	$("#map-container").width(width)
					   .height(height);

	Map.invalidateSize();			
}

function showAddress(address) {
	var g = new google.maps.Geocoder();	
	g.geocode({ 'address': address }, function(results, status) {
		latLng = [results[0].geometry.location.k, results[0].geometry.location.A];
		Map.setView(latLng, 18)
		L.marker(latLng).addTo(Map);
	})
}

function setEventListeners() {
	$(window).on('resize', function() {
		updateMapContainer();
	});

	$("#search").on('submit', function(e) {
		e.preventDefault(e);
		address = $(this).find('.search-input').val();
		showAddress(address);
	});
}

Map = L.map('map').setView([44.5000, -89.5], 6);

$(document).ready(function() {


L.tileLayer('http://{s}.tile.cloudmade.com/5015436ad80f44af82c15054968f1468/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(Map);

L.tileLayer('/static/tiles/tiles{z}/{x}/{y}.png', {maxZoom: 9, opacity:1}).addTo(Map);
updateMapContainer();
setEventListeners();

});
