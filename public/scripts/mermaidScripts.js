const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".navMenu");

//Show and hide nav bar links
burger.addEventListener('click', () => {
    navMenu.classList.toggle('navActive');
    burger.classList.toggle('toggle');
})
