//wait until the page loads!
window.onload = async function() {
    await fetchJokes();

    //set an event handler for submitting a new joke
    let addJokeButton = document.querySelector("button");
    addJokeButton.onclick = addJoke;

    console.log("onload() ended");

   updateRow()

    let deleteLinks = document.querySelectorAll(".delete")
    for (let i = 0; i < deleteLinks.length; i++){
        deleteLinks[i].onclick = deleteHandler
    }

};

//this runs when the delete link is clicked on any row in the table
function deleteHandler(event)
{
    event.preventDefault()

    //console.log(event.target)
    let row = event.target.parentElement.parentElement
    console.log(row)
    console.log("Id selected is", row.children[0].textContent)

    let tbody = document.querySelector("tbody")
    tbody.removeChild(row)
}

function updateRow()
{
    //update a record in the table
    let id = 2
    let title = "Storm Front"
    let pages = 412

    //select all tr elements in tbody
    let rows =document.querySelectorAll("tbody tr")
    for(let i = 0; i< rows.length; i++)
    {
        let tr = rows[i]
        //console.log(tr.children)

        //access the child elements of our <tr>
        let tdId = tr.children[0]
        let otherId = parseInt(tdId.textContent)

        if(id === otherId)
        {
            //console.log("found a match with id", id)
            tr.children[1].textContent = title
            tr.children[2].textContent = pages //can use pages.toString() to get rid of the squiggly
        }
    }
}

//adds a new joke when user enters and presses button
async function addJoke(event)
{
    //stop the form from submitting, we will use fetch() instead!
    event.preventDefault();

    let newJoke = {
        jokeText: document.querySelector("input#joke-text").value
    };

    let hostname = window.location.hostname
    let uri = `http://${hostname}:8080/jokes`;
    let config = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    };

    let response = await fetch(uri, config);
    let json = await response.json();

    let section = document.querySelector("#jokes-list");
    addSingleJoke(json, section);

    console.log("Joke added", json);
}

async function fetchJokes()
{
    let hostname = window.location.hostname
    let uri = `http://${hostname}:8080/jokes`;
    //let uri = "http://localhost:8080/jokes";
    //http://34.16.168.233:8080
    let config = {
        method: "get"
    };
    let response = await fetch(uri, config);
    let json = await response.json();
    addCards(json);
    //addCards takes in an array--this appears to be called "json" but I'm
    //not sure where it's coming from--I changed this in my ind assignment
    //to be jsonObjectReturned for clarity

    /*    fetch(uri, config)
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(json) {
                console.log(json);
            });*/
}

function addCards(jokesArray)
{
    //loop over my array
    let section = document.querySelector("#jokes-list");
    for (let i = 0; i < jokesArray.length; i++)
    {
        let joke = jokesArray[i];
        addSingleJoke(joke, section);

    }
}

function addSingleJoke(joke, section)
{
    //create HTML elements
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");

    //connect them (parent to child)
    div.appendChild(h1);
    div.appendChild(p);

    //add text or HTML attributes
    h1.textContent = `Joke #${joke.id}`;
    p.textContent = joke.jokeText;
    div.className = "card";

    //add the div to the section
    section.appendChild(div);
}







