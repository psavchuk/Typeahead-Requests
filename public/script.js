async function windowActions(){
const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"


const request = await fetch(endpoint)



const restaurants = await request.json()
console.log(restaurants)
function findMatches(ZipToMatch, restaurants){
  return restaurants.filter(place => {
    const regex = new RegExp(ZipToMatch, 'gi')
    return place.zip.match(regex)
  });
}

function displayMatches(event) {
    console.log(event.target.value);
    const matchArray = findMatches(event.target.value, restaurants);
    console.log(matchArray)

    const htmlstuff= matchArray.map(place => {
        const regex = new RegExp(event.target.value, 'gi');
        const zipMatch = place.zip.replace(regex, `<span class='hl'>${event.target.value}</span>`)

        return `
        <div class="result"
          <li>
            <span class="name is-capitalized is-size-4">${place.name.toLowerCase()}</span>
            <span class="category is-capitalized">${place.category.toLowerCase()}</span>
            <address>${place.address_line_1.toUpperCase()}<br> ${zipMatch}</address>
          </li>
        </div>`;

    }).join('');
    
    results.innerHTML = htmlstuff;
    console.log(htmlstuff)
}

const searchInput = document.querySelector("#search")
const results = document.querySelector(".results")

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)})
console.log(searchInput)
}
window.onload = windowActions;