const btnMenuVisible = document.querySelector('#menu_visible');
const btnMenuHidden = document.querySelector('#menu_hidden');
const navBurger = document.querySelector('.nav_burger');

// window.onload = function(){
//     if(window.matchMedia("(max-width: 768px)").matches){
//         btnMenuVisible.style.display = 'block';
//     }
// }



btnMenuVisible.addEventListener('click', function(){
    console.log('active')
    if((btnMenuVisible.style.display = 'block') && (window.matchMedia("(max-width: 768px)").matches)){
        btnMenuHidden.style.display = 'block';
        btnMenuVisible.style.display = 'none';
        navBurger.style.display = 'flex';
    }
})
btnMenuHidden.addEventListener('click', function(){
    console.log('close')
    if((btnMenuHidden.style.display = 'block') && (window.matchMedia("(max-width: 768px)").matches)){
        btnMenuHidden.style.display = 'none';
        btnMenuVisible.style.display = 'block';
        navBurger.style.display = 'none';

    }
})





