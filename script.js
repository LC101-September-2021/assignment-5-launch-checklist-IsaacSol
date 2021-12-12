// Write your JavaScript code here!

// const { myFetch } = require("./scriptHelper");
// const { formSubmission } = require("./scriptHelper")

window.addEventListener("load", function () {

    let form = document.getElementById("launchForm")
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let formField = document.getElementsByClassName("formField")
        let list = [document.getElementById("pilotStatus"), document.getElementById("copilotStatus"), document.getElementById("fuelStatus"), document.getElementById("cargoStatus")]
        // console.log(list)
        // console.log(formField)
        // console.log(formField[0].childNodes[1].childNodes[1].value)
        let pilot = formField[0].childNodes[1].childNodes[1].value
        let copilot = formField[1].childNodes[1].childNodes[1].value
        let fuelLevel = formField[2].childNodes[1].childNodes[1].value
        let cargoMass = formField[3].childNodes[1].childNodes[1].value
        let validInput = formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass)
    })

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        //    console.log(listedPlanets);
    }).then(function () {
        //    console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let myPlanet = pickPlanet(listedPlanets)
        addDestinationInfo(document, myPlanet.name, myPlanet.diameter, myPlanet.star, myPlanet.distance, myPlanet.moons, myPlanet.image)
    })
});