// <!-- Variable to hold an array of the JSON info -->
var arr;

// <!-- Request access to database -->
var xmlhttp = new XMLHttpRequest();
// <!-- When database connection is loaded -->

xmlhttp.open("GET", "getPoints.php", true);
 xmlhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    arr = JSON.parse(this.responseText);
    // document.getElementById('body').appendChild("<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6B762nJ0BnfEvCoL30pNuTXAHxF6lUGE&callback=initMap"></script>")
    var googleApiMap = document.createElement('script');

    googleApiMap.setAttribute('src','https://maps.googleapis.com/maps/api/js?key=AIzaSyC6B762nJ0BnfEvCoL30pNuTXAHxF6lUGE&callback=initMap');

    document.head.appendChild(googleApiMap);

  }
 };

 xmlhttp.send();


function initMap() {
    var center = {lat: 35.192250, lng: -97.4463};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: center,
      mapTypeId: 'satellite',
      tilt: 0
    });
    <!--loop through the array and place all the markers -->
    for(var i = 0; i < arr.length; i++) {
      var lng0 = parseFloat(arr[i].lat0);
      var lat0 = parseFloat(arr[i].lng0);
      var lng1 = parseFloat(arr[i].lat1);
      var lat1 = parseFloat(arr[i].lng1);

      var flightPlanCoordinates = [
        {lat: lat0, lng: lng0},
        {lat: lat1, lng: lng1}
      ];

      var color = "";

      var acs = parseInt(arr[i].Accessibility);

      if(acs == 0) {
        color = "#FF0000";
      }
      else if(acs == 1) {
        color = "#00FF00";
      }

      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
    }

    var infoWindow = new google.maps.InfoWindow({map: map});
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("YOU");
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: Geolocation failed' :
                            'Error: Browser does not support geolocation');
    }
}
