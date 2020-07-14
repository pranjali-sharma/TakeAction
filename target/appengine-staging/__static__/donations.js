function getOrgs() {
  fetch('/donations').then(response => response.json()).then((json) => {
    console.log(json);
    const charities = json.charities;
    console.log(charities);
    
    for (let i = 1; i < charities.length; i++) {
        var id= charities[i].id;
        var name= charities[i].name;
        var blurb_txt= charities[i].blurb;
        var link= charities[i].link;
        var new_card=$("<div class='card' id="+id+">")  
        var card_body=$("<div class='card-body row'>")  
        var title=$("<h5 class='card-title'>")   
        $(title).text(name);     
        var blurb=$("<p class='card-text'>")
        $(blurb).text(blurb_txt);
        var button=$("<a href="+link+" class='btn btn-warning'>")
        $(button.text("Donate here!"));

    $("#add-deck").append(new_card)
    $(new_card).append(card_body)    
    $(card_body).append(title)
    $(card_body).append(blurb)  
    $(card_body).append(button)  

    }
  });
}

