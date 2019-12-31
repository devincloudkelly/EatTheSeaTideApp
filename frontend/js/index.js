
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
    fetchTides(lat, long ,tide, tideHeight, locName)
}

// fetch tides for lat and long passed through form
function fetchTides(lat, long, tide, tideHeight, locName) {
    return fetch(`http://localhost:3000/tides?lat=${lat}&long=${long}`) 
        .then((resp) => resp.json())
        .then(data => findMatchingTides(data.extremes, tide, tideHeight))
        .then(tides => makeLocationCard(locName, tides))
}

// filter json data to only show tides that match the user's tide height threshold
function findMatchingTides(json, tide, tideHeight) {
const userTides = json.filter(extreme => extreme.state === tide.split('-').join(' ').toUpperCase())
    if (tide === "low-tide"){
        const lowTides = userTides.filter(tide => tide.height <= tideHeight)
        console.log('these are low tides', lowTides)
        return lowTides
    } 
    if (tide === "high-tide") {
        const highTides = userTides.filter(tide => tide.height >= tideHeight)
        console.log('these are high tides', highTides)
        return highTides
    }
    // need to add use case where no matching tides come back. 
}

// create location card
function makeLocationCard(locName, tides) {
    const locCardContainer = document.querySelector('#location-card-container')
    const div = document.createElement('div')
    div.classList.add('location-card')
    const h2 = document.createElement('h2')
    h2.textContent = locName
    div.appendChild(h2)
    locCardContainer.appendChild(div)
    populateTides(tides)
}

function populateTides(tides){
    console.log('this is for populating tides in cards', tides)
    const tideDiv = document.querySelector('.location-card')
    const h3 = document.createElement('h3')
    h3.textContent = 'Optimal Tides this week: '
    tideDiv.appendChild(h3)

    tides.forEach(tide => {
        const ul = document.createElement('ul')

        const seaLevel = document.createElement('li')
        seaLevel.textContent = `Tide Height: ${tide.height.toFixed(2)}`

        const tideState = document.createElement('li')
        tideState.textContent = tide.state

        const tideDate = document.createElement('li')
        tideDate.textContent = new Date(tide.datetime)

        ul.appendChild(seaLevel)
        ul.appendChild(tideState)
        ul.appendChild(tideDate)
        tideDiv.appendChild(ul)
    })
}

//function to persist location in database if not already there
// function findOrCreateLocation(locName, lat, long){

// }