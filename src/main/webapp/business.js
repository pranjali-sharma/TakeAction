//implementing map
var map;
function initMap() {
    const map = new google.maps.Map(
        document.getElementById('map'),
        {center: {lat: 44.9740, lng: -93.2277}, zoom: 18}
    );
    
    const trexMarker = new google.maps.Marker({
        position: {lat: 44.9740, lng: -93.2277},
        map: map, 
        title: 'Afro Deli'
    });

    const trexInfoWindow = new google.maps.InfoWindow({content: 'Afro Deli'});
    trexInfoWindow.open(map, trexMarker);
}