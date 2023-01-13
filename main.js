// lors de chaque rechergement de la page
window.addEventListener("load", () => {
    statistic();
});

// fonction statistique de la page home
function statistic(){
    let links = ["https://catfact.ninja/breeds","https://catfact.ninja/facts"];
    links.forEach(link =>{
        sendRequest(link).then(response =>{
            // nombres de faits
            if(link === "https://catfact.ninja/breeds"){
                let breeds = response.data.length;
                breedslength.textContent = breeds;
            } else if(link === "https://catfact.ninja/facts"){
                let facts = response.data.length;
                factslength.textContent = facts;
            };
        });
    });
};