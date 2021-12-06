// Write your JavaScript code here!

const { myFetch } = require("./scriptHelper");
const { validateInput } = require("./scriptHelper")

window.addEventListener("load", function() {
    // let formSubmit = document.getElementById("formSubmit")
    // let divNum = document.getElementsByClassName("formField")
    // formSubmit.addEventListener("click", function(){
    //     let form = document.forms["testForm"]["copilotName"].value
    //     alert(form)
    // })

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })
   
   

});