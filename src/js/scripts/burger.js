let burger = document.querySelector('.burger-open');
let menu = document.querySelector('.burger-menu__wrapper');
let close = document.querySelector('.burger-close');
let wrapper = document.querySelector('.wrapper');

burger.addEventListener('click', ()=> {
     menu.classList.add('open');
     document.body.classList.add("lock");
});

close.addEventListener('click', ()=> {
     menu.classList.remove('open');
     document.body.classList.remove("lock");
});  

document.addEventListener('keydown', function (e) {
     if(e.keyCode === 27)   menu.classList.remove('open');    
}); 