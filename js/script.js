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
var vehicleSelect = document.getElementById('vehicleSelect');
var selectedVehicle;
var vehicleCost;
var fuelDistance;
var fuelCost = 226.9;


$(document).ready(function(){

var vehicleBox = "";
for (var i = 0; i < vehicles.length; i++) {
  var vehicleList = vehicles[i];
  vehicleBox = '<div id="vehicle" class="col col-2 bg-light text-center" onclick="chosenVehicle('+vehicleList.id+');">'+vehicleList.name+'</div>';
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
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -41.279078, lng: 174.780281},
          zoom: 8
        });









        var input = document.getElementById('startLocation');
        var autoComplete = new google.maps.places.Autocomplete(input);
        autoComplete.addListener('place_changed', function(){
            console.log('the place has been changed');
            place1 = autoComplete.getPlace();
            console.log(place1);
            map.setCenter(place1.geometry.location);
          });

          var input2 = document.getElementById('destination');
          var autoComplete2 = new google.maps.places.Autocomplete(input2);
          autoComplete2.addListener('place_changed', function(){
              console.log('the place has been changed');
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
      // console.log('show me the directions');
      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      directionsDisplay.setMap(map);

      directionsService.route({
      origin: place1.geometry.location,
      destination: place2.geometry.location,
      travelMode: 'DRIVING'
      }, function(response, status){
        if (status == 'OK') {
            console.log(response);
            directionsDisplay.setDirections(response);
            $("#distance").html("");
            $("#distance").html(response.routes[0].legs[0].distance.text);
            $("#time").html("");
            $("#time").html(response.routes[0].legs[0].duration.text);

        }else if (status == 'NOT_FOUND') {
            console.log('either your origin or destination is invalid');
        }else if (status == 'ZERO_RESULTS') {
              alert('sorry there is no routes available');
        }
      });

      }

      $("#submitTrip").click(function(){
        document.getElementById("vehicleSelect").innerHTML = "";
        numOfPeople = $("#numberOfPeople").val();
        numOfDays = $("#numberOfDays").val();
        distance = $("#distance").val();

        for (var i = 0; i < vehicles.length; i++) {
          if ((numOfPeople >= vehicles[i].minPeople && numOfPeople <= vehicles[i].maxPeople) && (numOfDays >= vehicles[i].minDays && numOfDays <= vehicles[i].maxDays)) {
            console.log(vehicles[i]);
            vehicleBox = '<div id="vehicle" class="col col-2 bg-light text-center" onclick="chosenVehicle('+vehicles[i].id+');">'+vehicles[i].name+'</div>';
                document.getElementById("vehicleSelect").innerHTML += vehicleBox;
          }
        }




        getDirections();

        var totalCost = (numOfDays*selectedVehicle.dailyCost)+((distance/fuelDistance)*2.269);
        console.log("$"+totalCost);
        $("#cost").html("");
        $("#cost").html("$"+totalCost);
      });



google.maps.event.addDomListener(window, 'load', initMap);
