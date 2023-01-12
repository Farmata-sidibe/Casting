const btnMenuVisible = document.querySelector('#menu_visible');
const btnMenuHidden = document.querySelector('#menu_hidden');
const navBurger = document.querySelector('.nav_burger');

const body = document.querySelector('body');
// variable des bloc fact breed and pelage
const blocs = document.querySelectorAll('.bloc');
// variable des paragraphe qui sont dans les blocs fact breed and pelage
const pBlocs = document.querySelectorAll('.pBloc');
const fact = document.querySelector('.fact');
const btnFact = document.querySelector('.btnFact');
const breedslength = document.querySelector('.race');
const factslength = document.querySelector('.anecdocte');


// lors de chaque rechergement de la page
window.addEventListener("load", () => {
    statistic()
    detectCookie();
    getFactRandom();
});

// RESPONSIVE FONCTION
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        btnMenuVisible.style.display = 'none';

    } else {
        btnMenuVisible.style.display = 'block';
    }
})
// Responsive active burger
btnMenuVisible.addEventListener('click', function(){
    console.log('active')
    if((btnMenuVisible.style.display = 'block') && (window.matchMedia("(max-width: 992px)").matches)){
        btnMenuHidden.style.display = 'block';
        btnMenuVisible.style.display = 'none';
        navBurger.style.display = 'flex';
    }
})
// Responsive close burger
btnMenuHidden.addEventListener('click', function(){
    console.log('close')
    if((btnMenuHidden.style.display = 'block') && (window.matchMedia("(max-width: 992px)").matches)){
        btnMenuHidden.style.display = 'none';
        btnMenuVisible.style.display = 'block';
        navBurger.style.display = 'none';

    }
})

// fonction get api
async function sendRequest(url){
    return new Promise(async (resolve) =>{
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = function (){
        if(xhr.status === 200){
            let response = JSON.parse(xhr.responseText);
            resolve(response);
        };   
    };
    xhr.send();
    });
};

// les cookies
// fonction dark or light mode
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

// Fonction qui permet de changer le thème
function editTheme(theme){
   
    console.log(theme);
    if(theme === 'dark'){
        darkBtn.style.display = 'block';
        lightBtn.style.display = 'none';
        body.style.backgroundColor = 'black';
        blocs.forEach(bloc =>{
            bloc.style.backgroundColor = "#343434";
        });
        pBlocs.forEach(pBloc =>{
            pBloc.style.color = "white";
        });
    } else if (theme === 'light') {
        darkBtn.style.display = 'none';
        lightBtn.style.display = 'block';
        body.style.backgroundColor = 'white';
        blocs.forEach(bloc =>{
            bloc.style.backgroundColor = "#EDEDED";
        });
        pBlocs.forEach(pbloc =>{
            pbloc.style.color = "black";
        });
    }
};

// Fonction qui permet l'ajout d'un cookie
function setCookie(cnameTheme, cvalueTheme, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cnameTheme + "=" + cvalueTheme + ";" + expires + ";path=/";
}

// Fonction que permet la récupération de la valeur du cookie donné en argument
function getCookie(cnameTheme) {
    let name = cnameTheme + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Fonction qui permet de mettre à jour le cookie et de changer le theme
function checkCookie() {
    let valueTheme = getCookie("theme");
    if (valueTheme === "" || valueTheme === "light") {
        setCookie('theme', 'dark', 30);
        editTheme('dark');
    } else if (valueTheme === "dark") {
        setCookie('theme', 'light', 30);
        editTheme('light');
    }
}

// 
function detectCookie() {
    let valueTheme = getCookie("theme");
    if (valueTheme === "dark") {
        editTheme('dark');
    } else if (valueTheme === "light") {
        editTheme('light');
    }
}
lightBtn.addEventListener('click', checkCookie);
darkBtn.addEventListener('click', checkCookie);

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
            }
        });
    })
}

// function fact aléatoire de la page fact
function getFactRandom(){
    sendRequest('https://catfact.ninja/facts').then(response =>{
        // nombres de faits
            let facts = response.data;
            let thefact = get_random(facts);
            let thefactRandom = thefact.fact
            return fact.textContent = thefactRandom;
    });
}
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

btnFact.addEventListener('click',getFactRandom);