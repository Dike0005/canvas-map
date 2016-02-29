"use strict";

let c1, ctx1;
/***** This creates a canvas without manually doing it in HTML *****/
let canvas = document.createElement("canvas");
document.querySelector("body").appendChild(canvas);
document.body.style.backgroundColor = "lightgreen";
let div = document.getElementById("location");


if( navigator.geolocation ){ 
/***** setting maximumAge to 01 like in class in our example broke the geolocation with the canvas, so it's on 10000 *****/
  let params = {enableHighAccuracy: true, timeout: 36000, maximumAge: 10000};
  navigator.geolocation.getCurrentPosition(displayPosition, DidNotFind, params);
}
else {
    alert("Sorry, your browser is not compatible with Geolocation! (really dude...)");
}

function displayPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let dateTime = new Date(position.timestamp);
    let format = dateTime.toISOString();
    
    c1 = document.querySelector("canvas");
    c1.width = 1500;
    c1.height = 1500;
    ctx1 = c1.getContext("2d");
/***** This gets the static map with the correct zoom level and size *****/
   let userMap = "http://maps.googleapis.com/maps/api/staticmap?center="+lat+
','+long+"&zoom=14&size=400x400&sensor=false&markers=color:red%7Clabel:U%7C"+lat+','+long;
   let imageObj = new Image();
            imageObj.src = userMap;
            imageObj.onload = function(){
            /***** You can edit the values to adjust the size of the image drawn (in this case the map) *****/
                ctx1.drawImage(imageObj, 400, 50, 400, 400); 
            }
/***** This writes the text on the top and bottom of the canvas (x, y) *****/       
    ctx1.beginPath();
    ctx1.font = "bold 12pt Verdana";
    ctx1.fillText("Your Current Location", 500, 40);
    ctx1.fillText("Geolocation By Ege Diker", 480, 480);

/***** This writes the text on the left of the canvas (x, y) *****/
    ctx1.font = "bold 8pt Verdana";
    ctx1.fillText("Your Current Latitude: " + lat, 120, 200 );
    ctx1.fillText("Your Current Longitude: " + long, 120, 220 );
    ctx1.fillText("Accuracy (Approx): " + Math.floor(position.coords.accuracy * 3.28084) + " feet", 120, 240); 
    ctx1.fillText("Timestamp: " + format , 120, 260);
    ctx1.fillText(div.style.display = "none");
    ctx1.closePath();     
}       

/***** 3 error possibilities *****/
function DidNotFind(error){
    let errors = {1:'Permision Denied', 2: 'Position Unavailable', 3: 'Timeout Error'};
    alert("Error: " + errors[error.code]);
}
