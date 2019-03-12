var userMarker;

// code to check if location settings are on
function trackLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser. Please change your settings and try again."
	}
}

// code to display user location on map by drawing a point
function showPosition(position) {
	if (userMarker) {
		mymap.removeLayer(userMarker);
	}

	userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
	.bindPopup("<b>You were here</b>");
	
}
