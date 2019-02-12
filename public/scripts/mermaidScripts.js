var burger = document.getElementById("burg");
var x = document.getElementById("x");
var navMenu = document.querySelector(".navMenu");
var scroll = document.getElementsByClassName("scroll");

burger.addEventListener("click", function(){
    console.log("Clicked");
    burger.classList.add("hide");
    x.classList.remove("hide");
    navMenu.classList.remove("navMenu");
    // if(burger.classList === fa-bars){
    //     burger.classList.add("hide");
    //     x.classList.remove("hide");
    //     navMenu.classList.remove("navMenu");
    // } else {
    //     burger.classList.remove("hide");
    //     x.classList.add("hide");
    //     navMenu.classList.add("navMenu");
    // }
});

x.addEventListener("click", function(){
    burger.classList.remove("hide");
    x.classList.add("hide");
    navMenu.classList.add("navMenu");
});
