
async function windowActions() {

    const form = document.querySelector(".userform");
    const search = document.querySelector("#search");
    const list = document.querySelector(".results")
    
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    //list


    //const request = await get('/api');
    //const data = await request.json();

    const request = await fetch(endpoint);
        //.then(blob => blob.json())
        //.then(data => places.push(...data));

    const places = await request.json();

    function findMatches(wordToMatch, places) {
        return places.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex) || place.category.match(regex);
        });
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, places);

        if(event.target.value === "")
        {
            list.innerHTML = "";  
        }
        else
        {
            const html = matchArray.map(place => {
                return `
                    <div class="result">
                    
                        <li>
                            <span class="name is-capitalized is-size-4">
                                ${place.name}
                            </span>
                            <span class="category">
                                ${place.category}
                            </span>
                        </li>
    
                    </div>
                    `
            }).join('');

            list.innerHTML = html;
        }

        
    }

    search.addEventListener('change', displayMatches);
    search.addEventListener('keyup', (evt) => {
        displayMatches(evt)
    });
    
}

window.onload = windowActions;