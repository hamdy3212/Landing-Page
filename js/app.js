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
const navbarMenu = document.getElementById('navbarMenu');
const scrollToTopButton = document.getElementById("btn");
const closeButton = document.getElementById("closeButton");
// A variable to check if the navbar is closed or not
let closed = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// A function to show/hide the nav
showNav = () => {
    if(!closed)
    {
        navbarMenu.style.visibility = "visible";
        navbarMenu.style.opacity = "1";
    }
}
hideNav = () => {
    if(window.scrollY > 200){
    navbarMenu.style.visibility = "hidden";
    navbarMenu.style.opacity = "0";
    }
}
// Scroll to top fucntion 
scrollToTop = () => {
    document.documentElement.scrollTop = 0;
}
// Hover function for the scrollToTop button
hoverIn = () => {
    document.getElementById("img").setAttribute("src","images/top2.png");
}
hoverOut = () => {
    document.getElementById("img").setAttribute("src","images/top.png");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildingNav = () => {
    // Building <ul> here then append it instead of creating each <li> then inserting it to avoid reflow&repaint.
    const navbarList = document.createElement("ul");
    for (const section of sections){
    const listElement = document.createElement("li");
    listElement.classList.add(section.id,"menu__link");
    listElement.innerText = section.getAttribute("data-nav");
    navbarList.appendChild(listElement);
    }
    navbarMenu.append(navbarList);
}
// Add class 'active' to section when near top of viewport
activeByScrolling = () => {
    for (const section of sections){
        const area = section.getBoundingClientRect();
        if(area.top <= 150 && area.bottom >= 150) {
            section.classList.add("your-active-class");
            const activeSec = navbarMenu.getElementsByClassName(section.getAttribute("id"));
            activeSec[0].classList.add("active");
        }else{
            section.classList.remove("your-active-class");
            const activeSec = navbarMenu.getElementsByClassName(section.getAttribute("id"));
            activeSec[0].classList.remove("active");
        }
    }
}
// Scroll to anchor ID using scrollTO event
scrollToSection = (e) => {
    if(e.target.matches("li")){
        const getSection = e.target.classList[0];
        document.getElementById(getSection).scrollIntoView();   
    }
}
// Hiding the navbar while not scrolling and show if scrolling
let timer = null;
hideNavIfNotScrolling = () => {
    if( timer !== null) {
        clearTimeout(timer);
        showNav();
    }
    timer = setTimeout( () => {
        hideNav();
        timer = null;
    },1000);
}
// Show the button at the end of the page
showButton = () => {
    if((window.scrollY + window.innerHeight) >= document.body.offsetHeight){
        scrollToTopButton.style.visibility = "visible";
    }else{
        scrollToTopButton.style.visibility = "hidden";
    }
}
// Collapse/expand function
collapse = () => {
    for (const section of sections){
        // Creating the buttons
        const collapseButton = document.createElement("button");
        const collapseImg = document.createElement("img");
        // Creating and adding image for the button
        collapseImg.setAttribute("src","images/collapse.png");
        collapseButton.appendChild(collapseImg);
        // Adding collapse/expand function to each button
        collapseButton.addEventListener("click", () => {
            const paragraphs = section.getElementsByTagName("p");
            if(collapseImg.getAttribute("src") == "images/collapse.png"){
                for (const paragraph of paragraphs){
                    paragraph.style.display = "none";
                }
                collapseImg.setAttribute("src","images/expand.png");
            }else{
                for (const paragraph of paragraphs){
                    paragraph.style.display = "block";
                }
                collapseImg.setAttribute("src","images/collapse.png");
            }
        });
        //Appending the button to the <h2> element of each section
        section.getElementsByTagName("h2")[0].appendChild(collapseButton);
    }
}
// A function to close/open the navbar
closeNav = () => {
    if(closed == false)
    {
        // Didn't use hideNav() to avoid error when closing at the top of the page
        navbarMenu.style.visibility = "hidden";
        navbarMenu.style.opacity = "0";
        closeButton.children[0].setAttribute("src","images/open.png");
        closed = true;
    }else{
        closed = false;
        showNav();
        closeButton.children[0].setAttribute("src","images/close.png");
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
navbarMenu.addEventListener("click",scrollToSection);
// Set sections as active
document.addEventListener("scroll",activeByScrolling);
// Hide the navbar while not scrolling
document.addEventListener("scroll",hideNavIfNotScrolling);
// Show the navbar when mouse move over it
navbarMenu.closest("header").addEventListener("mouseover",showNav)
// Hide the navbar when mouse move out it
navbarMenu.closest("header").addEventListener("mouseout",hideNav)
// Scroll to top when the button clicked
scrollToTopButton.addEventListener("click", scrollToTop);
// Show the scrollToTop button
window.addEventListener("scroll",showButton);
// Hover for the scrollToTop button
scrollToTopButton.addEventListener("mouseover",hoverIn);
scrollToTopButton.addEventListener("mouseout",hoverOut);
// Creating collapse/expand's button for each section
collapse();
// Close the nav by clicking on the close button
closeButton.addEventListener("click", closeNav);
