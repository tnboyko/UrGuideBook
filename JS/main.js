function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function setLocation(position){
    var userPositionLatitude = position.coords.latitude;
    var userPositionLongitude = position.coords.longitude;
    var coordinates = new google.maps.LatLng(userPositionLatitude, userPositionLongitude);
    var map = new google.maps.Map(document.getElementById("map"),{
        center: coordinates,
         zoom: 14,
         mapTypeId: 'roadmap'
    });

    var markerMy = new google.maps.Marker({position:coordinates, map:map, title:"You are here!"});


    var icons = {
        cafe: {
            icon: "UrGuideBook/icons/coffee-512.png",
        },
        pub: {
            icon: 'UrGuideBook/icons/Beer-512.png',
        },
        pizza: {
            icon: 'UrGuideBook/icons/map-icon.png'
        }
    };


    var features = [
        {
            position: new google.maps.LatLng(50.5022695,30.4991657),
            type: 'cafe'
        }, {
            position: new google.maps.LatLng(50.5016587,30.4953945),
            type: 'pub'
        }, {
            position: new google.maps.LatLng(50.5061692,30.4975188),
            type: 'pizza'
        }
    ]

    features.forEach(function(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
});
}



