var vehicles = [
  {
    id: 1,
    type: "motorbike",
    name: "Bike",
    minPeople: 1,
    maxPeople: 1,
    minDays: 1,
    maxDays: 5,
    dailyCost: 109,
    litresPerKm: 3.7
  },
  {
    id: 2,
    type: "small Car",
    name: "Car",
    minPeople: 1,
    maxPeople: 2,
    minDays: 1,
    maxDays: 10,
    dailyCost: 129,
    litresPerKm: 8.5
  },
  {
    id: 3,
    type: "large Car",
    name: "Van",
    minPeople: 1,
    maxPeople: 5,
    minDays: 3,
    maxDays: 10,
    dailyCost: 144,
    litresPerKm: 9.7
  },
  {
    id: 4,
    type: "motorhome",
    name: "Camp",
    minPeople: 2,
    maxPeople: 6,
    minDays: 2,
    maxDays: 15,
    dailyCost: 200,
    litresPerKm: 17
  },
]
var allGyms = [
  {
    id: 1,
    lat: -41.278380,
    lng: 174.776694,
    title: "The Beehive",
  },
  {
    id: 2,
    lat: -41.277147,
    lng: 174.777076,
    title: "John Balance Statue",
  },
  {
    id: 3,
    lat: -41.282068,
    lng: 174.765446,
    title: "Floating Globes",
  },
  {
    id: 4,
    lat: -41.291154,
    lng: 174.786161,
    title: "Waterloo Sundial",
  },
  {
    id: 5,
    lat: -41.296945,
    lng: 174.79365,
    title: "Byrd Monument",
  },
  {
    id: 6,
    lat: -36.845773,
    lng: 174.754376,
    title: "Victoria Park Cultivator",
  },
  {
    id: 7,
    lat: -36.851020,
    lng: 174.786778,
    title: "Nancy Steen Garden",
  },
  {
    id: 8,
    lat: -36.874670,
    lng: 174.763921,
    title: "Langton's Tea Kiosk",
  },
  {
    id: 9,
    lat: -36.864519,
    lng: 174.757213,
    title: "Basque Park Fountain",
  },
  {
    id: 10,
    lat: -36.850870,
    lng: 174.725125,
    title: "Cox's Bay Reserve",
  }
]
var allNests = [
  {
    id: 1,
    lat: -39.0556,
    lng: 174.0752,
    title: "New Plymouth",
  },
  {
    id: 2,
    lat: -40.3523,
    lng: 175.6082,
    title: "Palmerston North",
  },
  {
    id: 3,
    lat: -41.2865,
    lng: 174.7762,
    title: "Wellington",
  },
  {
    id: 4,
    lat: -36.8485,
    lng: 174.7633,
    title: "Auckland",
  },
  {
    id: 5,
    lat: -41.2706,
    lng: 173.2840,
    title: "Nelson",
  },
  {
    id: 6,
    lat: -38.6857,
    lng: 176.0702,
    title: "Taupo",
  },
  {
    id: 7,
    lat: -39.4928,
    lng: 176.9120,
    title: "Napier",
  },
  {
    id: 8,
    lat: -43.5321,
    lng: 172.6362,
    title: "Christchurch",
  },
  {
    id: 9,
    lat: -45.8788,
    lng: 170.5028,
    title: "Dunedin",
  },
  {
    id: 10,
    lat: -37.6878,
    lng: 176.1651,
    title: "Tauranga",
  }
]
var vehicleSelect = document.getElementById("vehicleSelect");
var selectedVehicle;
var vehicleCost;
var fuelDistance;
var fuelCost = 226.9;


$(document).ready(function(){

  var vehicleBox = "";
  for (var i = 0; i < vehicles.length; i++) {
    var vehicleList = vehicles[i];
    vehicleBox = "<div id='vehicle' class='col col-2 bg-light text-center' onclick='chosenVehicle('+vehicleList.id+');'>"+vehicleList.name+"</div>";
    document.getElementById("vehicleSelect").innerHTML += vehicleBox;
  }

});


function chosenVehicle(vehicleId){

  console.log("You have clicked on vehicle "+vehicleId);
  for (var i = 0; i < vehicles.length; i++) {
    if (vehicles[i].id === vehicleId) {
      selectedVehicle = vehicles[i]
      break;
    }
  }
  vehicleCost = selectedVehicle.dailyCost;
  console.log("$"+vehicleCost+" per day");
  fuelDistance = selectedVehicle.litresPerKm;
  console.log(fuelDistance + "L/100km");

}


$("#panelChange").click(function(){
  $("#background").hide();
  $("#travelPanels").show();
  $("#contentContainer").attr("style", "background-color: none;")
  if (x.matches) {
    $("#detourBtns").attr("style", "display: none !important");
  }

});

$("#submitTrip").click(function(){




  if (x.matches) {
    $("#tripForm").hide();
    $("#vehicleSelect").attr("style", "display: none !important");
    $("#submitTrip").hide();
    $("#tripCalculator").attr("style", "height: 15% !important");
    $("#pokemonDetours").attr("style", "height: 85% !important");
    $("#detourForm").show();
    $("#detourBtns").attr("style", "display: flex !important");
  }
  getDirections();
});

$("#noDetours").click(function(){
  if (x.matches) {
    $("#pokemonDetours").hide();
    $("#travelPanels").attr("style", "height: 15% !important");
    $("#travelPanels").show();
    $("#tripCalculator").attr("style", "height: 100% !important")
    $("#map").attr("style", "display: block !important; width: 100% !important")

  }
});

var x = window.matchMedia("(max-width: 576px)")

var place1, place2;
var numOfPeople;
var numOfDays;
var distance
var map;
var activeMarkers = [];
var activeMarkers2 = [];
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -41.279078, lng: 174.780281},
    zoom: 8
  });
  for (var i = 0; i < allGyms.length; i++) {

    var marker = new google.maps.Marker({
      position:{
        lat: allGyms[i].lat,
        lng: allGyms[i].lng
      },
      map: map,
      animation: google.maps.Animation.DROP,
      icon: "assets/gymIcon.png",
      markerTitle: allGyms[i].title,
      markerID: allGyms[i].id
    });
    activeMarkers.push(marker);
  }

  $("#showExGyms").change(function(){
      console.log("yeet");
      var e = document.getElementById("showExGyms");
      var strUser = e.options[e.selectedIndex].value;
      console.log(strUser);
      if (strUser == "No") {
        for (var i = 0; i < activeMarkers.length; i++) {
          activeMarkers[i].setMap(null);
        }
        activeMarkers = [];
      } else if (strUser == "Yes") {
        for (var i = 0; i < allGyms.length; i++) {
          var marker = new google.maps.Marker({
            position:{
              lat: allGyms[i].lat,
              lng: allGyms[i].lng
            },
            map: map,
            animation: google.maps.Animation.DROP,
            icon: "assets/gymIcon.png",
            markerTitle: allGyms[i].title,
            markerID: allGyms[i].id
          });
          activeMarkers.push(marker);
        }
      }
  });
  for (var i = 0; i < allNests.length; i++) {

    var marker = new google.maps.Marker({
      position:{
        lat: allNests[i].lat,
        lng: allNests[i].lng
      },
      map: map,
      animation: google.maps.Animation.DROP,
      icon: "assets/pokemonIcon.png",
      markerTitle: allNests[i].title,
      markerID: allNests[i].id
    });
    activeMarkers2.push(marker);
  }
  $("#showPokemon").change(function(){
      console.log("yeet");
      var a = document.getElementById("showPokemon");
      var strUser2 = a.options[a.selectedIndex].value;
      console.log(strUser2);
      if (strUser2 == "False") {
        for (var i = 0; i < activeMarkers2.length; i++) {
          activeMarkers2[i].setMap(null);
        }
        activeMarkers2 = [];
      } else if (strUser2 == "True") {
        for (var i = 0; i < allGyms.length; i++) {
          var marker = new google.maps.Marker({
            position:{
              lat: allNests[i].lat,
              lng: allNests[i].lng
            },
            map: map,
            animation: google.maps.Animation.DROP,
            icon: "assets/pokemonIcon.png",
            markerTitle: allNests[i].title,
            markerID: allNests[i].id
          });
          activeMarkers2.push(marker);
        }
      }
  });

  var input = document.getElementById("startLocation");
  var autoComplete = new google.maps.places.Autocomplete(input);
  autoComplete.addListener("place_changed", function(){
    console.log("the place has been changed");
    place1 = autoComplete.getPlace();
    console.log(place1);
    map.setCenter(place1.geometry.location);
  });

  var input2 = document.getElementById("destination");
  var autoComplete2 = new google.maps.places.Autocomplete(input2);
  autoComplete2.addListener("place_changed", function(){
    console.log("the place has been changed");
    place2 = autoComplete2.getPlace();
    console.log(place2);
    map.setCenter(place2.geometry.location);
  });

}


var directionsDisplay
function getDirections(){
  if (directionsDisplay) {
    directionsDisplay.setMap(null);
  }
  // console.log("show me the directions");
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  directionsDisplay.setMap(map);

  directionsService.route({
    origin: place1.geometry.location,
    destination: place2.geometry.location,
    travelMode: "DRIVING"
  }, function(response, status){
    if (status == "OK") {
      console.log(response);
      directionsDisplay.setDirections(response);
      $("#distance").html("");
      $("#distance").html(response.routes[0].legs[0].distance.text);
      $("#time").html("");
      $("#time").html(response.routes[0].legs[0].duration.text);
      distance = response.routes[0].legs[0].distance.value;

      console.log(daysValue);
      console.log(vehicleCost);
      console.log(distance);
      console.log(fuelDistance);
      var totalCost = Math.ceil(((parseInt(daysValue)*vehicleCost)+(((distance/1000)/fuelDistance)*2.269)));
      console.log("$"+totalCost);
      $("#cost").html("");
      $("#cost").html("$"+totalCost);

    }else if (status == "NOT_FOUND") {
      console.log("either your origin or destination is invalid");
    }else if (status == "ZERO_RESULTS") {
      alert("sorry there is no routes available");
    }
  });

}


var peopleValue;
var numOfPeopleJS = document.getElementById("numberOfPeople")
numOfPeopleJS.addEventListener("input", function(){
  peopleValue = parseInt(numOfPeopleJS.value)
  if (peopleValue < 1 || peopleValue > 6) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Please enter a number from 1 to 6",
      timer: "4000",
      heightAuto: false,
    });
  }
  validateVehicles();
});

var daysValue;
var numOfDaysJS = document.getElementById("numberOfDays")
numOfDaysJS.addEventListener("input", function(){
  daysValue = parseInt(numOfDaysJS.value)
  if (daysValue < 1 || daysValue > 15) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: "Please enter a number from 1 to 15",
      timer: "4000",
      heightAuto: false,
    });
  }
  validateVehicles();
});
function validateVehicles(){
  document.getElementById("vehicleSelect").innerHTML = "";
  for (var i = 0; i < vehicles.length; i++) {
    if ((peopleValue >= vehicles[i].minPeople && peopleValue <= vehicles[i].maxPeople) && (daysValue >= vehicles[i].minDays && daysValue <= vehicles[i].maxDays)) {
      console.log(vehicles[i]);
      vehicleBox = "<div id="vehicle" class="col col-2 bg-light text-center" onclick="chosenVehicle("+vehicles[i].id+");">"+vehicles[i].name+"</div>";
      document.getElementById("vehicleSelect").innerHTML += vehicleBox;
    }
  }
}

google.maps.event.addDomListener(window, "load", initMap);
