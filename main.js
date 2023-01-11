const btnMenuVisible = document.querySelector('#menu_visible');
const btnMenuHidden = document.querySelector('#menu_hidden');
const navBurger = document.querySelector('.nav_burger');
const lightBtn = document.querySelector('#light');
const darkBtn = document.querySelector('#dark');
const body = document.querySelector('body');
const bloc = document.querySelector('.bloc');
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

// fonction dark or light mode
lightBtn.addEventListener('click', function(){
    darkBtn.style.display = 'block';
    lightBtn.style.display = 'none';
    if(body.style.backgroundColor = 'white'){
        body.style.backgroundColor = 'black';
    }
});
darkBtn.addEventListener('click', function(){
    darkBtn.style.display = 'none';
    lightBtn.style.display = 'block';
    if(body.style.backgroundColor = 'black'){
        body.style.backgroundColor = 'white';
        
    }
});

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

    






