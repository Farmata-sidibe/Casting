const resultBreed = document.querySelector('.resultBreed');
const resultCoat = document.querySelector('.resultCoat');
const resultCountry = document.querySelector('.resultCountry');
const resultOrigin = document.querySelector('.resultOrigin');
const resultPattern = document.querySelector('.resultPattern');

// lors de chaque rechergement de la page
window.addEventListener("load", () => {
setAllBreeds();

});

function setAllBreeds(){
    sendRequest('https://catfact.ninja/breeds?limit=7').then(response =>{
        // nombres de races
        let tabCats = response.data
        // console.log(tabCats)
        tabCats.forEach(breedCat =>{
            let inputRace = document.createElement('input');
            inputRace.value = breedCat.breed;
            inputRace.type = "submit";
            inputRace.className = 'breedBtn';
            inputRace.addEventListener('click', getInfoBreed)
            blocRaces.appendChild(inputRace);
            
        })
    });
}



function getInfoBreed(e){
    let raceValue = e.target.value;
    sendRequest('https://catfact.ninja/breeds').then(response =>{
        // pour chaque race j'affiche tous ses information
        let tabCats = response.data
        tabCats.forEach(breedCat =>{
            if(breedCat.breed === raceValue){
                // console.log(breedCat)
                resultBreed.textContent = breedCat.breed;
                resultCoat.textContent = breedCat.coat;
                resultCountry.textContent = breedCat.country;
                resultOrigin.textContent = breedCat.origin;
                resultPattern.textContent = breedCat.pattern;
            }
        })
      
    });
}