/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list');
let timer = null;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function hideNav() {

    if( timer !== null) {
        clearTimeout(timer);
        navBar.style.display = "block";
    }
    timer = setTimeout(function(){
        if(window.scrollY > 200){
        navBar.style.display = "none";
        }
        timer = null;
    },1000);
}
document.addEventListener("scroll",hideNav);


   
   
   

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildingNav() {
    for (const section of sections) {
    const listElement = document.createElement("li");
    listElement.classList.add(section.id,"menu__link");
    listElement.innerText = section.getAttribute("data-nav");
    navBar.appendChild(listElement);    
}
}
// Add class 'active' to section when near top of viewport
function activeByScrolling() {
    for (const section of sections) {
        const area = section.getBoundingClientRect();
        if(area.top <= 150 && area.bottom >= 150) {
            section.classList.add("your-active-class");
            const ele = navBar.getElementsByClassName(section.getAttribute("id"));
            ele[0].classList.add("active");
        }else{
            section.classList.remove("your-active-class");
            const ele = navBar.getElementsByClassName(section.getAttribute("id"));
            ele[0].classList.remove("active");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection (e) {
    if(e.target.matches("li")) {
        const getSection = e.target.classList[0];
        document.getElementById(getSection).scrollIntoView();   
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildingNav();
// Scroll to section on link click
navBar.addEventListener("click",scrollToSection);

// Set sections as active
document.addEventListener("scroll",activeByScrolling);


