const starterMenu = document.getElementById('starterId');
const mainsMenu = document.getElementById('mainCoursesId');
const desertsMenu = document.getElementById('desertsId');

//load starters.json file
function loadStarters(){
    const xmlStarter = new XMLHttpRequest();

    xmlStarter.open("GET", "../data/starters.json");
    xmlStarter.onload = () => {
        try {
            const jsonStarter = JSON.parse(xmlStarter.responseText);
            populateStarters(jsonStarter);
        } catch (e) {
            console.warn('couldnt load starters');
        }
    }
    xmlStarter.send();
}

//fill in starter table
function populateStarters(jsonStarter){
    //delete content in table in HTML file
    while(starterMenu.firstChild) {
        starterMenu.removeChild(starterMenu.firstChild);
    }
    //populate table with starters
    jsonStarter.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        starterMenu.appendChild(tr);
    });
}

//load mainCourses.json file
function loadMains(){
    const xmlMains = new XMLHttpRequest();

    xmlMains.open("GET", "../data/mainCourses.json");
    xmlMains.onload = () => {
        try {
            const jsonMains = JSON.parse(xmlMains.responseText);
            populateMains(jsonMains);
        } catch (e) {
            console.warn('couldnt load main courses');
        }
    }
    xmlMains.send();
}

//fill in mains table
function populateMains(jsonMains){
    //delete mains html table content
    while (mainsMenu.firstChild) {
        mainsMenu.removeChild(mainsMenu.firstChild);
    }
    //populate table with main courses
    jsonMains.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        mainsMenu.appendChild(tr);
    });
}

//load deserts.json file
function loadDeserts(){
    const xmlDeserts = new XMLHttpRequest();

    xmlDeserts.open("GET", "../data/deserts.json");
    xmlDeserts.onload = () => {
        try {
            const jsonDeserts = JSON.parse(xmlDeserts.responseText);
            populateDeserts(jsonDeserts);
        } catch (e) {
            console.warn("couldnt load deserts");
        }
    }
    xmlDeserts.send();
}

//fill in deserts menu
function populateDeserts(jsonDeserts){
    while (desertsMenu.firstChild) {
        desertsMenu.removeChild(desertsMenu.firstChild);
    }
    jsonDeserts.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        desertsMenu.appendChild(tr);
    });
}

//load menus when page is ready
document.addEventListener("DOMContentLoaded", () => { loadStarters(), loadMains(), loadDeserts() ; });