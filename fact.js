const divAllFacts = document.querySelector('.allFacts');
const btnRow = document.querySelector('.displayRow')
const btnColumn = document.querySelector('.displayColumn')
// lors de chaque rechergement de la page
window.addEventListener("load", () => {
    getFactRandom();
    displayAllFacts();
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
function displayAllFacts(){
    sendRequest('https://catfact.ninja/facts').then(response =>{
            let facts = response.data;
            console.log(facts);
            facts.forEach(fact =>{
                console.log(fact);
                const divFactEl = document.createElement('div');
                divFactEl.className = 'factEl'
                const h2DivFactEl = document.createElement('h2');
                h2DivFactEl.textContent = 'Anecdocte'
                const pDivFactEl = document.createElement('p');
                pDivFactEl.textContent = fact.fact;
                divAllFacts.appendChild(divFactEl);
                divFactEl.appendChild(h2DivFactEl);
                divFactEl.appendChild(pDivFactEl);

            })
    });
}

btnRow.addEventListener('click', ()=>{
    const blocFactEls = document.querySelectorAll('.factEl');

    btnColumn.style.stroke = "gray";
    btnRow.style.stroke = "black";
    divAllFacts.classList.remove('allFactsColumn');
    divAllFacts.classList.add('allFactsRow');
    blocFactEls.forEach(blocFactEl =>{
        blocFactEl.style.width= '17em';
        blocFactEl.style.padding= '53px 40px';
    })



})
btnColumn.addEventListener('click', ()=>{
    const blocFactEls = document.querySelectorAll('.factEl');

    btnRow.style.stroke = "gray";
    btnColumn.style.stroke = "black";
    divAllFacts.classList.remove('allFactsRow');
    divAllFacts.classList.add('allFactsColumn');
    blocFactEls.forEach(blocFactEl =>{
        blocFactEl.style.width= '47em';
        blocFactEl.style.padding= '85px 40px';
    })
    

})

btnFact.addEventListener('click',getFactRandom);
