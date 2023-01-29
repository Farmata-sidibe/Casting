const resultBreed = document.querySelector('.resultBreed');
const resultCoat = document.querySelector('.resultCoat');
const resultCountry = document.querySelector('.resultCountry');
const resultOrigin = document.querySelector('.resultOrigin');
const resultPattern = document.querySelector('.resultPattern');
const countrySelect = document.querySelector('#set_Country');
const coatSelect = document.querySelector('#set_pelage');
const nmbreBreed = document.querySelector('.nmbreBreed');

const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const pageNumbers = document.querySelector('.pageNumbers');
// lors de chaque rechergement de la page
window.addEventListener("load", () => {
    setCountryCoat();
    pagination();
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
    // console.log(choiceCountry);
    return (choiceCountry);
}
// get select country value country
async function getSelectValueCountry() {
    let result = await setSelectValueCountry();

    if (result === "") {
       
        pagination(result);
    }
    else if (result !== "") {
       
        pagination(result)
    }
}

// display select value coat
countrySelect.addEventListener('change', getSelectValueCoat)
function setSelectValueCoat() {
    let choiceCoat = coatSelect.value;
    // console.log(choiceCoat);
    return (choiceCoat);
}
// get select coat value
async function getSelectValueCoat() {
    let result = await setSelectValueCoat();
    // console.log(result);
    if (result === "") { 
        pagination(result);
    }
    else if (result !== "") {
        pagination(result)
    }
}

// create forEach breeds
function createInput() {
    let inputRace = document.createElement('input');
    inputRace.type = "submit";
    inputRace.className = 'breedBtn';
    inputRace.addEventListener('click', getInfoBreed);

    return inputRace
}

// if click forEach breeds display all info of breed
function getInfoBreed(e) {
    let raceValue = e.target.value;
    sendRequest('https://catfact.ninja/breeds').then(response => {
        // pour chaque race j'affiche tous ses information
        let tabCats = response.data
        tabCats.forEach(breedCat => {
            if (breedCat.breed === raceValue) {
                
                resultBreed.textContent = breedCat.breed;
                resultCoat.textContent = breedCat.coat;
                resultCountry.textContent = breedCat.country;
                resultOrigin.textContent = breedCat.origin;
                resultPattern.textContent = breedCat.pattern;
            }
        })

    });
}

// sort and display breeds filtered by country
// and pagination 

let currentPage = 1;
// page count
let itemsPerPage = 5;

function pagination() {
    return new Promise(async (resolve) => {
        let resultCountry = await setSelectValueCountry();
        let resultCoat = await setSelectValueCoat();

        sendRequest('https://catfact.ninja/breeds').then(response => {

            let tabCats = response.data;
            console.log(tabCats.length);
            nmbreBreed.textContent = tabCats.length;
            let totalPages = Math.ceil(tabCats.length / itemsPerPage);
            
            // clear previous data
            blocRaces.innerHTML = "";
            // fonction dislable prev and next btn
            handlePageButtonsStatus();
            let startIndex = (currentPage - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            let paginatedCats = tabCats.slice(startIndex, endIndex);
            paginatedCats.forEach(breedCat => {
                // create an input for the breed
                let inputRace = createInput();
                // selct country and coat choice option
                let choiceCountry = resultCountry;
                let choiceCoat = resultCoat;
                // if choiceCountry is not null
                if (breedCat.country === choiceCountry && choiceCountry !== "") {
                    // and  if choiceCoat is not null
                    if (breedCat.coat === choiceCoat && choiceCoat !== "") {
                        inputRace.value = breedCat.breed;
                        blocRaces.appendChild(inputRace);
                        resolve(inputRace);
                    }
                    // else if choiceCoat null
                    else if (breedCat.coat === choiceCoat || choiceCoat === "") {
                        inputRace.value = breedCat.breed;
                        blocRaces.appendChild(inputRace);

                        resolve(inputRace);
                    }
                } 
                //if choiceCountry null
                else if (breedCat.country === choiceCountry || choiceCountry === "") {
                    // and if choiceCoat is not null

                    if (breedCat.coat === choiceCoat && choiceCoat !== "") {
                        inputRace.value = breedCat.breed;
                        blocRaces.appendChild(inputRace);
                        resolve(inputRace);

                    } 
                    // else if choiceCoat null
                    else if (breedCat.coat === choiceCoat || choiceCoat === "") {
                        inputRace.value = breedCat.breed;
                        blocRaces.appendChild(inputRace);
                        resolve(inputRace);

                    }

                }
            });
            // clear previous data
            pageNumbers.innerHTML = "";
            // for page count create a btn

            for (let i = 1; i <= totalPages; i++) {
                let btn = document.createElement('button');
                btn.className = 'pagination-number'
                btn.innerText = i;
                btn.addEventListener('click', function () {
                    currentPage = i;
                    pagination();

                });
                pageNumbers.appendChild(btn);
            }
        });
    });
}

nextBtn.addEventListener('click', function () {
    currentPage++;
    pagination();
});

prevBtn.addEventListener('click', function () {
    currentPage--;
    pagination();
});

const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
  };
  const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
  };
  const handlePageButtonsStatus = () => {
    if (currentPage === 1 ) {
      disableButton(prevBtn);
    } else {
      enableButton(prevBtn);
    }
    if (itemsPerPage === currentPage ) {
      disableButton(nextBtn);
    } else {
      enableButton(nextBtn);
    }
  };

