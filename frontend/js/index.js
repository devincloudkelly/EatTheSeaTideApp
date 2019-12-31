
//event listener for HTML page load
document.addEventListener('DOMContentLoaded', (e) =>{
    
    //event listener for tide form submission
    const tideForm = document.querySelector('#tide-form')
    tideForm.addEventListener('submit', (e) => tideFormSubmission(e))
})

//tide form event handler
function tideFormSubmission(e) {
    e.preventDefault()
    const lat = e.target.latitude.value
    const long = e.target.longitude.value
    const locName = e.target['loc-name'].value
    const tide = e.target['tide-type'].value
    const tideHeight = e.target['tide-height'].value
    makeLocationCard(locName, fetchTides(lat, long ,tide, tideHeight))
}

// fetch tides for lat and long passed through form
function fetchTides(lat, long, tide, tideHeight) {
    return fetch(`http://localhost:3000/tides?lat=${lat}&long=${long}`) 
        .then((resp) => resp.json())
        .then(data => findMatchingTides(data.extremes, tide, tideHeight))
}

// filter json data to only show tides that match the user's tide height threshold
function findMatchingTides(json, tide, tideHeight) {
const userTides = json.filter(extreme => extreme.state === tide.split('-').join(' ').toUpperCase())
    if (tide === "low-tide"){
        const lowTides = userTides.filter(tide => tide.height <= tideHeight)
        console.log(lowTides)
        return lowTides
    } 
    if (tide === "high-tide") {
        const highTides = userTides.filter(tide => tide.height >= tideHeight)
        console.log(highTides)
        return highTides
    }
    // need to add use case where no matching tides come back. 
}

// create location card
function makeLocationCard(locName, tides) {
    const locCardContainer = document.querySelector('#location-card-container')
    const div = document.createElement('div')
    div.classList.add('location-card')
    div.textContent = locName
    locCardContainer.appendChild(div)
}

function populateTides(tides){
    tides.forEach(tide => {
        const li = document.createElement('li')
        const li = document.createElement('li')

    })
}

//function to persist location in database if not already there
// function findOrCreateLocation(locName, lat, long){

// }