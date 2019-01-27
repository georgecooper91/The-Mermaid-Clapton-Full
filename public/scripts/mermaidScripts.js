var burger = document.getElementById("burg");
var x = document.getElementById("x");
var navMenu = document.querySelector(".navMenu");
var scroll = document.getElementsByClassName("scroll");

console.log(burger);
console.log(x);
console.log(navMenu);

burger.addEventListener("click", function(){
    console.log("Clicked");
    burger.classList.add("hide");
    x.classList.remove("hide");
    navMenu.classList.remove("navMenu");
});

x.addEventListener("click", function(){
    burger.classList.remove("hide");
    x.classList.add("hide");
    navMenu.classList.add("navMenu");
});
