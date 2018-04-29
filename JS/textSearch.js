var map;
var markers = Array();
var infos = Array();

var userPositionLatitude;
var userPositionLongitude;


var inText;
function onload() {
    inText = document.getElementById('textField');
}
function showText(){
    alert(inText.value);
}

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function setLocation(position) {
    userPositionLatitude = position.coords.latitude;
    userPositionLongitude = position.coords.longitude;
    var coordinates = new google.maps.LatLng(userPositionLatitude, userPositionLongitude);
    map = new google.maps.Map(document.getElementById("gmap_canvas"), {
        center: coordinates,
        zoom: 14,
        mapTypeId: 'roadmap'
    });

    var markerMy = new google.maps.Marker({
        position: coordinates,
        map: map,
        title: "You are here!",
    });
}


//функция удаления овелеев с карты
function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}

// функция закрытия балунов с информацией
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}


// функция поиска мест
function findPlaces() {

    // значения для поиска
    var radius = 5000; // радиус поиска
    var keyword = document.getElementById('textField').value; // ключевое слово

    var cur_location = new google.maps.LatLng(userPositionLatitude, userPositionLongitude);

    // запрос к Places
    var request = {
        location: cur_location,
        radius: radius,
    };
    if (keyword) {
        request.keyword = [keyword];
    }

    // отправляем запрос в Places
    service = new google.maps.places.PlacesService(map);
    service.search(request, createMarkers);
}

// добавляем метки
function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // удаляем предидущий результат с карты
        clearOverlays();

        // добавляем новые метки на карту
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Ничего не нашли, но ставьте зарах');
    }
}

// функция для добавления одной метки
function createMarker(obj) {

    // создаем новый объект
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name
    });
    markers.push(mark);

    // подготавливаем содержимое для балуна
    var infowindow = new google.maps.InfoWindow({
        content: '<h2>' + obj.name + '</h2>' +
        '<br />Рейтинг: ' + obj.rating + '<br />Адрес: ' + obj.vicinity + '</font>'
    });

    // добавляем обработчик клика по метке
    google.maps.event.addListener(mark, 'click', function() {
        clearInfos();
        infowindow.open(map,mark);
    });
    infos.push(infowindow);
}

// инициализация
google.maps.event.addDomListener(window, 'load', initMap());
