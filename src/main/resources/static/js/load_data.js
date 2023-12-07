//wait until page loads
window.onload = function (){
    let hostname = window.location.hostname
    let uri = `http://${hostname}:8080/jokes`;
    //let uri = "http://34.125.44.255:8080/jokes";

    let params ={
        method: "get"
    };

    fetch(uri, params)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            showJokes(data);
        });
};

function showJokes(data){
    let jokesList = document.getElementById("jokes-list");

    for (let i = 0; i < data.length; i++) {
        let joke = data[i];

        let section = document.createElement("section")
        let h2 = document.createElement("h2")
        let paragraph = document.createElement("p")

        h2.innerText= "Joke # " + joke.id
        paragraph.innerText = joke.jokeText;

        section.appendChild(h2)
        section.appendChild(document.createElement("hr"))
        section.appendChild(paragraph)

        jokesList.appendChild(section)

    }
}

