const btnMenuVisible = document.querySelector('#menu_visible');
const btnMenuHidden = document.querySelector('#menu_hidden');
const navBurger = document.querySelector('.nav_burger');

// RESPONSIVE FONCTION
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
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





