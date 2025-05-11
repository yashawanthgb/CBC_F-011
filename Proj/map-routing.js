// map-routing.js
// Handles custom start/end input, geocoding, and map routing for the map section

document.addEventListener('DOMContentLoaded', function() {
  var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var control = L.Routing.control({
    waypoints: [
      L.latLng(20.5937, 78.9629), // Default start (India center)
      L.latLng(28.7041, 77.1025)  // Example end (Delhi)
    ],
    routeWhileDragging: true,
    showAlternatives: true,
    geocoder: L.Control.Geocoder.nominatim()
  }).addTo(map);

  control.on('routesfound', function(e) {
    var routes = e.routes;
    var summary = routes[0].summary;
    var distanceText = 'Total distance: ' + (summary.totalDistance / 1000).toFixed(2) + ' km';
    document.getElementById('route-distance').textContent = distanceText;
  });

  document.getElementById('route-btn').addEventListener('click', function() {
    var start = document.getElementById('start-location').value;
    var end = document.getElementById('end-location').value;
    if (!start || !end) {
      alert('Please enter both start and end locations.');
      return;
    }
    console.log('Fetching geocoding for:', { start, end });
    Promise.all([
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(start)}`)
        .then(res => res.json()),
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(end)}`)
        .then(res => res.json())
    ]).then(results => {
      console.log('Geocoding results:', results);
      var startRes = results[0][0];
      var endRes = results[1][0];
      if (!startRes || !endRes) {
        alert('Could not find one or both locations.');
        console.error('Start result:', startRes, 'End result:', endRes);
        return;
      }
      var startLatLng = L.latLng(startRes.lat, startRes.lon);
      var endLatLng = L.latLng(endRes.lat, endRes.lon);
      control.setWaypoints([startLatLng, endLatLng]);
      map.fitBounds(L.latLngBounds([startLatLng, endLatLng]));
    }).catch((err) => {
      alert('Error fetching location data.');
      console.error('Geocoding fetch error:', err);
    });
  });
}); 