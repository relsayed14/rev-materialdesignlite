//global variables to be used by functions
var client;
var earthquakes;


//function to add a point, line and circle to the map
function addPointLinePoly() {

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

// function to add an earthquake layer
function getEarthquakes() {

}


	
	
			