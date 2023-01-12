const btnMenuVisible = document.querySelector('#menu_visible');
const btnMenuHidden = document.querySelector('#menu_hidden');
const navBurger = document.querySelector('.nav_burger');

const body = document.querySelector('body');
const bloc = document.querySelector('.bloc');
const pBloc = document.querySelector('.pBloc');
const fact = document.querySelector('.anecdocte');
const breedslength = document.querySelector('.race');
const factslength = document.querySelector('.anecdocte');


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

// fonction affichage des nombres des races et d'anecdoctes
window.addEventListener("load", () => {
    sendRequest('https://catfact.ninja/breeds').then(response =>{
        // nombres de races
        let breeds = response.data.length;
        breedslength.textContent = breeds;

    });
    sendRequest('https://catfact.ninja/facts').then(response =>{
        // nombres de faits
        let facts = response.data.length;
        factslength.textContent = facts;
       

    });
    
});


// les cookies
// fonction dark or light mode
const lightBtn = document.querySelector('#light');
const darkBtn = document.querySelector('#dark');

let theme = "";

// lightBtn.addEventListener('click', getThemeDark);
// darkBtn.addEventListener('click', getThemeLight);

async function modeLight(){
    return new Promise(async (resolve) =>{
    theme= "light";
    darkBtn.style.display = 'none';
    lightBtn.style.display = 'block';
    if(body.style.backgroundColor = 'black'){
        body.style.backgroundColor = 'white';

    }
        resolve(theme);
    });
};
async function modeDark(){
    return new Promise(async (resolve) =>{
        theme= "dark";
        darkBtn.style.display = 'block';
        lightBtn.style.display = 'none';
        if(body.style.backgroundColor = 'white'){
            body.style.backgroundColor = 'black';
            bloc.style.backgroundColor = "#343434";
            pBloc.style.color= "white";
        }
        resolve(theme);
    });
};

function getThemeDark(){
    modeDark().then(response =>{
        let the = response;
        console.log(the);
    })
}
function getThemeLight(){
    modeLight().then(response =>{
        let the = response;
        console.log(the);
    })
}

function setCookie(cnameTheme, cvalueTheme, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cnameTheme + "=" + cvalueTheme + ";" + expires + ";path=/";
  }

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

  function checkCookie() {

    let valueTheme = getCookie("theme");
    console.log(valueTheme)
    if (valueTheme != "") {
        modeDark().then(response =>{
            let the = response;
            console.log(the);

        })
    } else {
        modeDark().then(response =>{
           valueTheme = response;
           if (valueTheme != "" && valueTheme != null) {
            
            setCookie("theme", valueTheme, 30);
          }
        })
      
    }
  }
  function checkCookieLi() {
    let valueTheme = getCookie("theme");
    if (valueTheme != "") {
        modeLight().then(response =>{
            valueTheme = response;
            console.log(valueTheme)
        })
    } else {
        modeLight().then(response =>{
            valueTheme = response;
            if (valueTheme != "" && valueTheme != null) {
            console.log(valueTheme)

                setCookie("theme", valueTheme, 30);
              }
        })
       
    }
}

lightBtn.addEventListener('click', checkCookie);

darkBtn.addEventListener('click', checkCookieLi);







