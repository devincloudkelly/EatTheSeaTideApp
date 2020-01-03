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
    // console.log('2. this is "tide" in tideFormSubmission...', tide)
    const tideHeight = (e.target['tide-height'].value) / 3.2808
    findOrCreateLocation(locName, lat, long, tide, tideHeight)
    
}

// function to persist location in database if not already there
function findOrCreateLocation(locName, lat, long, tide, tideHeight){
    // console.log('3. this is "tide" in Finding or creating by...', tide)
    fetch(`http://localhost:3000/locations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify( {
            name: locName,
            lat: lat,
            long: long
        })
    })
    .then(resp => resp.json())
    .then(json => fetchTides(json, tide, tideHeight))
    //add step to confirm id isn't null in the json data
}

// fetch tides for lat and long passed through form
function fetchTides(json, tide, tideHeight) {
    // console.log('4. this is the tide passed in to fetchTides...', tide)
    return fetch(`http://localhost:3000/userlocations?lat=${json.lat}&long=${json.long}`) 
        .then((resp) => resp.json())
        .then(data => findMatchingTides(data.extremes, tide, tideHeight))
        .then(tides => {
            // console.log('this is the "tides" I will pass to persistTides', tides)
            persistTides(tides, json.id)
            makeLocationCard(json.name, json.id, tides)})
}

// filter json data to only show tides that match the user's tide height threshold
function findMatchingTides(json, tide, tideHeight) {
    // console.log('5. this is the tide in find matching tides...', tide)
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
function makeLocationCard(locName, locId, tides) {
    // console.log('making location card...')
    const locCardContainer = document.querySelector('#location-card-container')
    const div = document.createElement('div')
    div.classList.add('location-card')
    div.id = `loc-${locId}`

    const h2 = document.createElement('h2')
    h2.textContent = locName

    const h3 = document.createElement('h3')
    h3.textContent = 'Optimal Tides this week: '

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-loc-button')
    deleteBtn.textContent = 'Remove this location'
    deleteBtn.id = locId
    deleteBtn.addEventListener('click', (e) => {
        const cardId = e.target.id
        console.log('this is cardId', cardId)
        fetch(`http://localhost:3000/locations/${cardId}`,{
            method: 'DELETE'
            // mode: 'no-cors'
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        const locCard = document.querySelector(`#loc-${cardId}`)
        console.log('this is locCard', locCard)
        locCard.remove()
    })
    // finish creating card delete button
    // set location model so that dependent data gets destroyed when it gets destroyed.

    div.appendChild(h2)
    div.appendChild(deleteBtn)
    div.appendChild(h3)
    locCardContainer.appendChild(div)
    // populateTides(tides, locId)
}

// persist tides to the database
function persistTides(tides, locId){
    tides.forEach(tide => {
        console.log
        const seaLevel = tide.height * 3.2808
        fetch('http://localhost:3000/userlocations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                sea_level: seaLevel,
                state: tide.state,
                datetime: tide.datetime,
                user_id: 1,
                location_id: locId
            })
        })
        .then(resp => resp.json())
        .then(json => populateTides(json))
    })
}

// new populate tides for individual instances
function populateTides(tide){
    console.log('this is for populating tides in cards', tide)
    const tideDiv = document.querySelector(`#loc-${tide.location_id}`)
    
    const ul = document.createElement('ul')
    
    const seaLevel = document.createElement('li')
    seaLevel.textContent = `Tide Height: ${tide.sea_level.toFixed(2)} feet`
    
    const tideState = document.createElement('li')
    tideState.textContent = tide.state
    
    const tideDate = document.createElement('li')
    tideDate.textContent = new Date(tide.datetime)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-tide-button')
    deleteBtn.textContent = 'Remove this tide'
    deleteBtn.id = tide.id
    deleteBtn.addEventListener('click', (e) => {
        const tideId = e.target.id
        fetch(`http://localhost:3000/userlocations/${tideId}`,{
            method: 'DELETE'
            // mode: 'no-cors'
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        e.target.parentNode.remove()
    })
    
    ul.appendChild(seaLevel)
    ul.appendChild(tideState)
    ul.appendChild(tideDate)
    ul.appendChild(deleteBtn)
    tideDiv.appendChild(ul)
}



// populates the matching tide instances in a location card
// function populateTides(tides, locId){
//     console.log('this is for populating tides in cards', tides)
//     const tideDiv = document.querySelector(`#loc-${locId}`)
//     const h3 = document.createElement('h3')
//     h3.textContent = 'Optimal Tides this week: '
//     tideDiv.appendChild(h3)

//     tides.forEach(tide => {
//         const ul = document.createElement('ul')

//         const seaLevel = document.createElement('li')
//         //remove the metric conversion once tide persistence is in place. leave the 2 decimal fixing.
//         seaLevel.textContent = `Tide Height: ${(tide.height * 3.2808).toFixed(2)}`

//         const tideState = document.createElement('li')
//         tideState.textContent = tide.state

//         const tideDate = document.createElement('li')
//         tideDate.textContent = new Date(tide.datetime)

//         ul.appendChild(seaLevel)
//         ul.appendChild(tideState)
//         ul.appendChild(tideDate)
//         tideDiv.appendChild(ul)
//     })
// }