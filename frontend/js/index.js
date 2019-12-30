document.addEventListener('DOMContentLoaded', (e) =>{
    console.log(e)
    const tideForm = document.querySelector('#tide-form')
    tideForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const lat = e.target.latitude.value
        const long = e.target.longitude.value
        const locName = e.target['loc-name'].value
        const tide = e.target['tide-type'].value
        const tideHeight = e.target['tide-height'].value
        fetchTides(lat, long)

    })
})

// fetch tides for lat and long passed through form
const fetchTides = (lat, long) => {
    fetch(`http://localhost:3000/tides?lat=${lat}&long=${long}`) 
        .then((resp) => resp.json())
        .then(data => console.log(data))
}

// filter json data to only show tides that match the user's tide height threshold
const findMatchingTides = (json, tide, tideHeight) => {
// filter over json, filter out matching tides, then equal or BETTER tide heights (if tide is low, less than, if tide is high, greater than)

//replace temp1. with json
const userTides = json.extremes.filter(extreme => extreme['state'] === tide)
if (tide === "LOW TIDE")
}