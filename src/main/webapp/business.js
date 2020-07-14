// implementing map
var map;
function initMap(latitude, longitude, name) {
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

function getInfo() {
  console.log('inside getInfo()');
  fetch('/business').then(response => response.json()).then((json) => {
      var len = json.length;
      for(var i = 1; i<len; i++) {
        if(json[i][1] == "in-person") { //makes list of in-person businessess
            var inPersonList = document.getElementById('inpersonbus');
            var listItem = document.createElement('li');
            var innerText = json[i][0] + "-" + json[i][2];
            listItem.innerHTML = innerText;
            inPersonList.appendChild(listItem);
        } else if(json[i][1] == "online") { //makes list of online businesses
            var onlineList = document.getElementById('onlinebus');
            var listItem = document.createElement('li');
            var a = document.createElement('a'); 
            var link = document.createTextNode(json[i][0]); 
            a.appendChild(link);  
            a.href = json[i][2];  
            listItem.appendChild(a);
            onlineList.appendChild(listItem);
        }
      } 
   });
}