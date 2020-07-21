//consts
const BUSINESS_NAME = 0;
const BUSINESS_TYPE = 1;
const BUSINESS_ADDR = 2;
const ON_MAP_BOOL = 3;
const CSV_LATITUDE = 4;
const CSV_LONGITUDE = 5;
const CSV_DESCRIPTION = 6;
 
//gets information for webpage, list of in-person and online businesses
function getInfo() {
  fetch('/business').then(response => response.json()).then((json) => {
    var counter = 0;
    for (var i = 1; i < json.length; i++) {
      if (json[i][BUSINESS_TYPE] == 'in-person') {
        renderInPersonBlock(json, i);
      } else if (json[i][BUSINESS_TYPE] == 'online') {
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
 
//creates and adds in-person businesses to DOM
function renderInPersonBlock(json, i) {
    var inPersonList = document.getElementById('inpersonbus');
    var listItem = document.createElement('button');
    var innerText = json[i][BUSINESS_NAME];
    listItem.type = 'button';
    listItem.className = 'list-group-item list-group-item-action';
    listItem.innerHTML = innerText;
    listItem.addEventListener('click', function() {
        if (json[this][ON_MAP_BOOL] == 'TRUE') {
        document.getElementById('busname').innerHTML = json[this][BUSINESS_NAME];
        document.getElementById('busaddr').innerHTML = json[this][BUSINESS_ADDR];
        document.getElementById('busdes').innerHTML = json[this][CSV_DESCRIPTION];
        var latitude = parseFloat(json[this][CSV_LATITUDE]);
        var longitude = parseFloat(json[this][CSV_LONGITUDE]);
        var mapDiv = document.getElementById('mapdiv');
        initMap(latitude, longitude, json[this][BUSINESS_NAME]);
        }
    }.bind(i));
    inPersonList.appendChild(listItem);
}
 
//creates each card for online businesses
function createCard(i, col, json) {
  var businessCard = document.createElement('div');
  businessCard.className = 'card';
  var newCardInfo = document.createElement('div');
  newCardInfo.className = 'card-body';
  var title = document.createElement('h5');
  title.className = 'card-title';
  title.align = 'center';
  var a = document.createElement('a');
  var link = document.createTextNode(json[i][BUSINESS_NAME]);
  a.appendChild(link);
  a.href = json[i][BUSINESS_ADDR];
  title.appendChild(a);
  newCardInfo.appendChild(title);
  businessCard.appendChild(newCardInfo);
  col.appendChild(businessCard);
}
 
//creates map
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