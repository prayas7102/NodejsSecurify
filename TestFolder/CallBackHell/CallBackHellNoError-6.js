navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    // More nested callbacks...
}, function(error) {
    console.error('Geolocation error:', error);
});
