// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
    let missionTarget = document.getElementById("missionTarget")
    missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
       <li>Name: ${name}</li>
       <li>Diameter: ${diameter}</li>
       <li>Star: ${star}</li>
       <li>Distance from Earth: ${distance}</li>
       <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
   `
}

function validateInput(testInput) {
    if (testInput === undefined || testInput === null || testInput === "") {
        // console.log("E")
        return "Empty"
    }
    if (Number(testInput)) {
        // console.log("IaN")
        return "Is a Number"
    }
    if (isNaN(testInput)) {
        // console.log("NaN")
        return "Not a Number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    l = [pilot, copilot, fuelLevel, cargoLevel]
    alertMessage = ""
    shouldAlert = false
    let pilotStatus = document.getElementById("pilotStatus")
    let copilotStatus = document.getElementById("copilotStatus")
    let fuelStatus = document.getElementById("fuelStatus")
    let cargoStatus = document.getElementById("cargoStatus")
    let faultyItems = document.getElementById("faultyItems")
    let launchStatus = document.getElementById("launchStatus")

    for (let i = 0; i < l.length; i++) {
        if (validateInput(l[i]) === "Empty") {
            alertMessage = "All fields are required";
            shouldAlert = true;
        }
    }
    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alertMessage = "Make sure to enter valid information for each field!";
        shouldAlert = true;
    }
    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alertMessage = "Make sure to enter valid information for each field!";
        shouldAlert = true;
    } else {
        if (fuelLevel < 10000) {
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            let fuelMessage = "Fuel level too low for launch"
            fuelStatus.innerHTML = `${fuelMessage}`
            shouldAlert = true;
        } else {
            let fuelMessage = "Fuel level high enough for launch"
            fuelStatus.innerHTML = `${fuelMessage}`
        }
        if (cargoLevel > 10000) {
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
            let cargoMessage = "Cargo mass too heavy for launch"
            cargoStatus.innerHTML = `${cargoMessage}`
            shouldAlert = true;
        } else {
            let cargoMessage = "Cargo mass low enough for launch"
            cargoStatus.innerHTML = `${cargoMessage}`
        }
        if (!shouldAlert) {
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "rgb(65, 159, 106)";
        }

    }

    if (shouldAlert) {
        if (alertMessage) {
            alert(alertMessage)
        } else {
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`
            faultyItems.style.visibility = "visible";
        }
        return false
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`

        faultyItems.style.visibility = "visible";
        return true
    }
    return [shouldAlert, alertMessage, pilotStatus, copilotStatus, fuelStatus, cargoStatus, faultyItems, launchStatus]



}

async function myFetch() {

    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    // console.log(planetsReturned)
    planetsReturned = await planetsReturned.json()
    // console.log(planetsReturned[1])
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = (Math.round(Math.random() * 5 - 1) + 1)
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
