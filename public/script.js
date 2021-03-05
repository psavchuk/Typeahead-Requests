
async function windowActions() {

    const form = document.querySelector(".userform");
    const search = document.querySelector("#name");
    
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    //filter options
    const places = [];

    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => places.push(...data));

    console.log(places);

    function findMatches(wordToMatch, places) {
        return places.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex) || place.city.match(regex);
        });
    }

    function displayMatches() {
        const matchArray = findMatches(this.value, places);
        console.log(matchArray);
        const html = matchArray.map(place => {
            return "
                <li>
                    <span class="name">
                        ${place.name}, ${place.city}
                    </span>
                </li>
            ";
        })
    }


    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        const request = await get('/api');
        const data = await request.json();

        const displaydata = data.filter((record) => record.name === search.value);

        console.log(displaydata);

    //     console.log("submit");
    //     const req = await fetch('/api', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({data: search.value})
    //     });
    //     const data = await req.json();
    //     console.table(data.data);

        //const display = data.filter((record) => record.name === search.value);
        
        console.log(data);

    });

    search.addEventListener('input', displayMatches);

    
}

window.onload = windowActions;