const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
const restaraunts = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => restaraunts.push(...data))
console.log(restaraunts)

function findMatches(ZipToMatch, restaraunts){
  return restaraunts.filter(place => {
    const regex = new RegExp(ZipToMatch, 'gi')
    return place.zip.match(regex)
  });
}

function displayMatches() {
    console.log(this.value);
    const matchArray = findMatches(this.value, restaraunts);
    console.log(matchArray)

    

    const htmlstuff= matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const zipMatch = place.zip.replace(regex, `<span class='hl'>${this.value}</span>`)
        return `
          <li>
            <span class="name">${place.name.toUpperCase()}</span>
            <span class="type">${place.category}</span>
            <span class="address">${place.address_line_1.toUpperCase()}</span>
            <span class="zip">${zipMatch}</span>
          </li>`;
    }).join('');
    results.innerHTML = htmlstuff;
    console.log(htmlstuff)
}

const searchInput = document.querySelector("#search")
const results = document.querySelector(".results")

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
console.log(searchInput)