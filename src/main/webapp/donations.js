function getOrgs() {
  console.log('inside getOrgs()');
  fetch('/donations').then(response => response.json()).then((json) => {
    console.log(json);
     });
}