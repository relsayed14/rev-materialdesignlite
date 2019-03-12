	//global variables to be used by functions
	var client;
	var earthquakes;


	//function to add a point, line and circle to the map
	function addPointLinePoly() {
		alert("Adding a point, line and circle to the map ...");

		// add a point
		L.marker([51.5,-0.09]).addTo(mymap)
		.bindPopup("<b>Hello world!</b><br>I am a point.").openPopup();

		//add a circle
		L.circle([51.508,-0.11],500, {
			color:'red',
			fillColor:'#f03',
			fillOpacity:0.5
		}).addTo(mymap).bindPopup("I am a circle.");

		// add a line
		var myLine = [
		[51.5, -0.07],
		[51.51, -0.08]
		];
		L.polyline(myLine,{color:'green'})
		.addTo(mymap).bindPopup("I am a line.");
	}

	// code to get the Earthquakes data using an XMLHttpRequest
	function getEarthquakes() {
		client = new XMLHttpRequest();
		client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson'); 
			//if open request has been invoked successfully, call the earthquakeResponse function
			client.onreadystatechange = earthquakeResponse; 
			// note don't use earthquakeResponse() with brackets as that doesn't work
			client.send(); 
		}

		// code to wait for the response from the data server, and process the response once it is received
		function earthquakeResponse() {
		// this function listens out for the server to say that the data is ready - i.e. has state 4 
		if (client.readyState == 4) {
			// once the data is ready, process the data 
			var earthquakedata = client.responseText; 
			loadEarthquakelayer(earthquakedata);
		}
	}



	// convert the received data - which is text - to JSON format and add it to the map 
	function loadEarthquakelayer(earthquakedata) {
		// convert the text to JSON
		var earthquakejson = JSON.parse(earthquakedata);

		// loan the JSON layer onto the map
		earthquakelayer = L.geoJson(earthquakejson, {
		//use point to layer to create the points
		pointToLayer: function(feature,latlng)
		{
					//look at the GeoJSON file - specifically at the properties,to see the earthquake magnitude and use a different marker depending on this value
					// also incldue a pop up that shows the place value of the earthquakes
					if(feature.properties.mag > 1.75) {
						return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+ feature.properties.place + "</b>");
					} else {
						// if mag =< 1.75
						return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+ feature.properties.place + "</b>");

					}
				},
			}).addTo(mymap);

	// change the map zoom so that all the data is shown
	mymap.fitBounds(earthquakelayer.getBounds()); 

// create red test marker
var testMarkerRed = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'
});


// create pink test marker
var testMarkerPink = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});



