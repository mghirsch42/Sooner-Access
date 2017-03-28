

var graph = new Graph({lat: 35.20706, lng: -97.44571});

//Variables to hold arrays of the JSON info
var lines;
var points;

/* Request line data */
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        lines = JSON.parse(this.responseText);
        testFunction();
    }
};
xmlhttp.open("GET", "getLines.php", true);
xmlhttp.send();

/* Request point data */
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        points = JSON.parse(this.responseText);
        testFunction();
    }
};
xmlhttp.open("GET", "getPoints.php", true);
xmlhttp.send();

/* Append script call */
function testFunction() {
    if(lines != null && points != null) {
        var script = document.createElement('script');
             script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC6B762nJ0BnfEvCoL30pNuTXAHxF6lUGE&callback=initMap');
     document.getElementById("body").appendChild(script);
        
    }
}

function initMap() {
    
    var center = {lat: 35.192250, lng: -97.4463};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: center,
        mapTypeId: 'satellite',
        tilt: 0
    });
    
    <!--loop through the array and place all the markers -->
    for(var i = 0; i < lines.length; i++) {
        var lng0 = parseFloat(lines[i].lat0);
        var lat0 = parseFloat(lines[i].lng0);
        var lng1 = parseFloat(lines[i].lat1);
        var lat1 = parseFloat(lines[i].lng1);

        var flightPlanCoordinates = [
            {lat: lat0, lng: lng0},
            {lat: lat1, lng: lng1}
        ];

        // add this edge to the graph
        
        var loc0 = new Location(lat0, lng0);
        if(!graph.vertices.includes(loc0)) {
            graph.addVertex(loc0);
        }
        var loc1 = new Location(lat1, lng1);
        if(!graph.vertices.includes(loc1)) {
            graph.addVertex(loc1);
        }
        graph.addEdge(loc0, loc1);
        
        var color = "";

        var acs = parseInt(lines[i].Accessibility);

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
            strokeWeight: 3
        });
        
       
        flightPath.setMap(map);
    }
    
    //if(points) {
        for(var i = 0; i < points.length; i++) {
            var lng = parseFloat(points[i].lat);
            var lat = parseFloat(points[i].lng);
            var marker = new google.maps.Marker({
                position: {lat, lng},
                map: map
            });
        }
    //}
    

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

    
    map.addListener('click', function(e) {
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var loc = new Location(e.latLng.lat().toFixed(5), e.latLng.lng().toFixed(5));
        var best = graph.getClosestVertex(loc);
        var latLng = new google.maps.LatLng(best.lat, best.lng)
        var bestM = new google.maps.Marker({
            position: latLng,
            map: map,
            strokeColor: "white",
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale : 10
            }
        });
        bestM.setMap(map);
        //map.setCenter(latLng);
    })
 
}
