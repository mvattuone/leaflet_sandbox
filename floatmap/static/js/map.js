function getColor(type ,d) {
    // 1 = High Risk (subject to 100 year flood event, AKA 1% annual chance of flooding)
    // 2 = Moderate Risk (subject to 500 year flood event AKA 0.2% annual chance of flooding)

    if (type === 'f') {
      if (d === 1) { return '#800026' }
      if (d === 2) { return '#218CDF'}
    } 

    if (type === 'ep') { 
      //dn represents percentage increase over time
      return d > 60 ? 'red' :
      d >= 50  ? 'orange' :
      d >= 40  ? 'yellow' :
      d >= 30  ? 'green' :
      d >= 20   ? 'blue' :
      d >= 10   ? 'purple' :
      d >= 1   ? 'smoke' :
                'transparent';
    }
}

function getExtremePrecipitationJson(url) {
  if (Data.extremePrecipitation === undefined) {
    $.getJSON(url, function(data) {
        Data.extremePrecipitation = data
        epLayer = L.geoJson(Data.extremePrecipitation, {
          style: function(feature) { 
            return { color: getColor('ep', feature.properties.dn) }
          }
      });
      epLayer.addTo(Map);
    });
  } else {
    epLayer = L.geoJson(Data.extremePrecipitation, {
          style: function(feature) { 
            return { color: getColor('ep', feature.properties.dn) }
          }
      });
    console.log("do it")
    epLayer.addTo(Map);
  }
}

function getFloodJson(url){  
  if (Data.floods === undefined) {
    $.getJSON(url, function(data){
      Data.floods = data
      floodLayer = L.geoJson(Data.floods, {
        style: function (feature) {
          return {color: getColor('f', feature.properties.flood_num)};
        }
      });
      floodLayer.addTo(Map);
    });
  } else {
    floodLayer = L.geoJson(Data.floods, {
      style: function (feature) {
        return {color: getColor('f', feature.properties.flood_num)};
      }
    });
    floodLayer.addTo(Map);
  }
}

function buildFloodLegend() {
  var legend = L.control({position: 'topright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [1,2],
          labels = ['High Risk', 'Moderate Risk'];

      // loop through our density intervals and generate a label with a colored square for each interval
      div.innerHTML += '<h3>Flood Risk</h3>'
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor('f', grades[i]) + '"></i> ' +
              labels[i] + '<br />';
      }
      div.innerHTML += '<button id="floodToggle">Toggle Flood Data</button>'

    return div;
  };

  legend.addTo(Map);
}

function buildEPLegend() {
  var legend = L.control({position: 'topleft'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [10,20,30,40,50,60],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      div.innerHTML += '<h3>EP Risk</h3>'
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor('ep', grades[i]) + '"></i> ' +
              grades[i] + '%<br>';
      }

      div.innerHTML += '<button id="epToggle">Toggle EP Data</button>'

    return div;
  };

  legend.addTo(Map);
}

function onEachFeature(e) {

}
function updateMapContainer() {
	var width = $(window).width(),
		height = $(window).height(),
    headerHeight = $('header').height();

	$("#map-container").width(width)
					   .height(height - headerHeight);

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

  $("#epToggle").on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (Map.hasLayer(epLayer)) {
      epLayer.clearLayers()
      Map.removeLayer(epLayer)
    } else {
      getExtremePrecipitationJson('/extreme_precipitation')
    }
  })

  $('#floodToggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (Map.hasLayer(floodLayer)) {
      floodLayer.clearLayers()
      Map.removeLayer(floodLayer)
    } else {
      getFloodJson('/floodzones');
    }


  })

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

Map = L.map('map').setView([-30, 0], 1);

$(document).ready(function() {
Data = {};
L.tileLayer('http://{s}.tiles.mapbox.com/v3/mvattuone.ikn4dpkf/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(Map);

// L.tileLayer('/static/floods/{z}/{x}/{y}.png', {maxZoom: 9, opacity:.5}).addTo(Map);
updateMapContainer();
getFloodJson('/floodzones');
getExtremePrecipitationJson('/extreme_precipitation')
buildFloodLegend();
buildEPLegend();
setEventListeners();
});
