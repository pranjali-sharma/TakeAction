function getOrgs() {
  console.log('inside getOrgs()');
  fetch('/donations').then(response => response.json()).then((json) => {
    console.log(json);
    const charities = json.charities;
    console.log(charities);
    const cardsEl = document.getElementById('orgs row');
    for (let i = 1; i < charities.length; i++) {
      console.log('json element name ' + i + ' : ' + charities[i].name);
      console.log('json element blurb ' + i + ' : ' + charities[i].blurb);
      console.log('json element link ' + i + ' : ' + charities[i].link);
    }
  });
}
