const resultBreed = document.querySelector('.resultBreed');
const resultCoat = document.querySelector('.resultCoat');
const resultCountry = document.querySelector('.resultCountry');
const resultOrigin = document.querySelector('.resultOrigin');
const resultPattern = document.querySelector('.resultPattern');
const countrySelect = document.querySelector('#set_Country');
const coatSelect = document.querySelector('#set_pelage');
// lors de chaque rechergement de la page
window.addEventListener("load", () => {
    setCountryCoat();
    setBreeds()
});

// set and add all country and coat in the select list
function setCountryCoat() {
    sendRequest('https://catfact.ninja/breeds').then(response => {
        let tabCats = response.data
        tabCats.forEach(breedCat => {
            let option = document.createElement('option');
            option.value = breedCat.coat;
            option.textContent = breedCat.coat;
            option.className = 'Option';

            let option2 = document.createElement('option');
            option2.value = breedCat.country;
            option2.textContent = breedCat.country;
            option2.className = 'Option';

            coatSelect.appendChild(option);
            countrySelect.appendChild(option2);

        })
    });
}
// display select value country
countrySelect.addEventListener('change', getSelectValueCountry)
function setSelectValueCountry() {
    let choiceCountry = countrySelect.value;
    console.log(choiceCountry);
    return (choiceCountry);
}
// get select country value country
async function getSelectValueCountry() {
    let result = await setSelectValueCountry();
    console.log(result);
    if (result === "") {
        console.log('ici null');
        setBreeds(result);
    }
    else if (result !== "") {
        console.log('ici choice');
        setBreeds(result)
    }
}

// display select value coat
countrySelect.addEventListener('change', getSelectValueCoat)
function setSelectValueCoat() {
    let choiceCoat = coatSelect.value;
    console.log(choiceCoat);
    return (choiceCoat);
}
// get select coat value
async function getSelectValueCoat() {
    let result = await setSelectValueCoat();
    console.log(result);
    if (result === "") {
        console.log('ici null');
        setBreeds(result);
    }
    else if (result !== "") {
        console.log('ici choice');
        setBreeds(result)
    }
}

// create forEach breeds
function createInput() {
    let inputRace = document.createElement('input');
    inputRace.type = "submit";
    inputRace.className = 'breedBtn';

    return inputRace
}

// sort and display breeds filtered by country
async function setBreeds(){
    let resultCountry = await setSelectValueCountry();
    let resultCoat = await setSelectValueCoat();

    sendRequest('https://catfact.ninja/breeds').then(response =>{
    // console.warn(resultCountry);
    // console.warn(resultCoat);
    let tabCats = response.data;
    // clear previous data
    blocRaces.innerHTML = "";
    tabCats.forEach(breedCat =>{
        let inputRace = createInput();
        let choiceCountry = resultCountry;
        let choiceCoat = resultCoat;
        if(breedCat.country === choiceCountry && choiceCountry !== ""){
            if(breedCat.coat === choiceCoat && choiceCoat !== ""){
                inputRace.value = breedCat.breed;
                blocRaces.appendChild(inputRace);
                inputRace.addEventListener('click', getInfoBreed);
            }
            else if(breedCat.coat === choiceCoat || choiceCoat === "" ){
                inputRace.value = breedCat.breed;
                blocRaces.appendChild(inputRace);
                inputRace.addEventListener('click', getInfoBreed);
                }
        } else if(breedCat.country === choiceCountry || choiceCountry === "" ){
            if(breedCat.coat === choiceCoat && choiceCoat !== ""){
                inputRace.value = breedCat.breed;
                blocRaces.appendChild(inputRace);
                inputRace.addEventListener('click', getInfoBreed);
            }else if(breedCat.coat === choiceCoat || choiceCoat === "" ){
                inputRace.value = breedCat.breed;
                blocRaces.appendChild(inputRace);
                inputRace.addEventListener('click', getInfoBreed);
            }
                
        }
    })
    });
};

// if click forEach breeds display all info of breed
function getInfoBreed(e) {
    let raceValue = e.target.value;
    sendRequest('https://catfact.ninja/breeds').then(response => {
        // pour chaque race j'affiche tous ses information
        let tabCats = response.data
        tabCats.forEach(breedCat => {
            if (breedCat.breed === raceValue) {
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