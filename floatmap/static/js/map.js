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
		$('#share').removeClass('hidden');
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

	$('.fb').on('click', function(e) {
		if (Object.prototype.toString.call(FB) !== "undefined") {
			FB.ui({
			  method: 'share',
			  href: 'http://www.floatmap.com:8000',
			}, function(response){
				console.log('okay')
			});
		}
	});

	$('.twitter').on('click', function(e) {
		//share window config
	    var width  = 575,
	        height = 400,
	        left   = ($(window).width()  - width)  / 2,
	        top    = ($(window).height() - height) / 2,
	        url    = 'https://twitter.com/share?url=http://www.example.com',
	        opts   = 'status=1' +
	                 ',width='  + width  +
	                 ',height=' + height +
	                 ',top='    + top    +
	                 ',left='   + left;
	    
	    window.open(url, 'twitter', opts);
 
	    return false;
	 });
}

Map = L.map('map').setView([44.5000, -89.5], 1);

$(document).ready(function() {

L.tileLayer('/static/floods/{z}/{x}/{y}.png', {maxZoom: 9, opacity:.5}).addTo(Map);
updateMapContainer();
setEventListeners();

});
