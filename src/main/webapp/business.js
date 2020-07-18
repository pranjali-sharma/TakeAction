function getInfo() {
  fetch('/business').then(response => response.json()).then((json) => {
    var counter = 0;
    for (var i = 1; i < json.length; i++) {
      if (json[i][1] == 'in-person') {  // makes list of in-person businessess
        var inPersonList = document.getElementById('inpersonbus');
        var listItem = document.createElement('button');
        var innerText = json[i][0] + '-' + json[i][2];
        listItem.type = 'button';
        listItem.className = 'list-group-item list-group-item-action';
        listItem.innerHTML = innerText;
        listItem.addEventListener('click', function() {
          if (json[this][3] == 'TRUE') {
            document.getElementById('busname').innerHTML = json[this][0];
            document.getElementById('busaddr').innerHTML = json[this][2];
            document.getElementById('busdes').innerHTML = json[this][6];
            var latitude = parseFloat(json[this][4]);
            var longitude = parseFloat(json[this][5]);
            var mapDiv = document.getElementById('mapdiv');
            initMap(latitude, longitude, json[this][0]);
          }
        }.bind(i));
        inPersonList.appendChild(listItem);
      } else if (json[i][1] == 'online') {  // makes list of online businesses
        var col = counter % 3;
        var elem;
        if (col == 0) {
          elem = document.getElementById('col1');
        } else if (col == 1) {
          elem = document.getElementById('col2');
        } else if (col == 2) {
          elem = document.getElementById('col3');
        }
        createCard(i, elem, json);
        counter++;
      }
    }
  });
}

function createCard(i, col, json) {
  var businessCard = document.createElement('div');
  businessCard.className = 'card';
  var newCardInfo = document.createElement('div');
  newCardInfo.className = 'card-body';
  var title = document.createElement('h5');
  title.className = 'card-title';
  title.align = 'center';
  var a = document.createElement('a');
  var link = document.createTextNode(json[i][0]);
  a.appendChild(link);
  a.href = json[i][2];
  title.appendChild(a);
  newCardInfo.appendChild(title);
  businessCard.appendChild(newCardInfo);
  col.appendChild(businessCard);
}

var map;
function initMap(latitude, longitude, name) {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: latitude, lng: longitude}, zoom: 18});

  const trexMarker = new google.maps.Marker(
      {position: {lat: latitude, lng: longitude}, map: map, title: name});

  const trexInfoWindow = new google.maps.InfoWindow({content: name});
  trexInfoWindow.open(map, trexMarker);
}
