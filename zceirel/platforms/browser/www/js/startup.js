function trackAndCircle() {
	trackLocation();
	addPointLinePoly();

}

//wait for document to load, then start tracking user
function startup() {
	document.addEventListener('DOMContentLoaded', function() {
		trackAndCircle();
	}, false);
}