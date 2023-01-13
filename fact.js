
// lors de chaque rechergement de la page
window.addEventListener("load", () => {
    getFactRandom();
});
// function fact aléatoire de la page fact
function getFactRandom(){
    sendRequest('https://catfact.ninja/facts').then(response =>{
        // nombres de faits
            let facts = response.data;
            let thefact = get_random(facts);
            let thefactRandom = thefact.fact
            fact.textContent = thefactRandom;
    });
}

function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

btnFact.addEventListener('click',getFactRandom);
