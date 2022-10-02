import { showAll } from "./getAll.js"
import { findOne } from "./findOne.js"

const URL = "http://localhost:8080/api/cars/"

let lastVisibleContent = document.getElementById("div-info");
document.getElementById("btns").onclick = handleButtonClick
//Handle the switching between the different views

function handleButtonClick(evt) {
    const target = evt.target
    const isMenuBtn = target.tagName === "BUTTON" && target.id.startsWith("menu-btn-")
    if (!isMenuBtn) {
    return
    }
    lastVisibleContent.style.display = "none"
    const idForNewVisibleContent = target.id.replace("menu-btn", "div")
    lastVisibleContent = document.getElementById(idForNewVisibleContent);
    lastVisibleContent.style.display = "block"

    //Now handle JavaScript for the buttom clicked
    switch (target.id) {
    case "menu-btn-info": break //No JavaScript for this view
    case "menu-btn-show-all": break
    case "menu-btn-find-one": findOne(); break
    case "menu-btn-add-one": addOne(); break
    case "menu-btn-edit-one": editOne(); break
    }
}

/*
    ****************************************
    * JavaScript for the showAll "view"
    ****************************************
*/



/*
    ****************************************
    * JavaScript for the find One "view"
    ****************************************
*/




/*
    ****************************************
    * JavaScript for the add one "view"
    ****************************************
*/

async function addOne() {
    document.getElementById("bnt-submit-new-car").onclick = makeNewCar
    async function makeNewCar() {
    const newCar = {}
    newCar.brand = document.getElementById("input-brand").value
    newCar.model = document.getElementById("input-model").value
    newCar.pricePerDay = document.getElementById("input-price-pr-day").value
    newCar.bestDiscount = document.getElementById("input-best-discount").value
    //Now newCar contains all required fields (MUST match the DTO on the backend) and their values
    console.log(newCar)
    //Build the options object requred for a POST
    const options = {}
    options.method = "POST"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(newCar)
    
    const addedCar = await fetch(URL, options).then(handleHttpErrors)
    console.log("the URL is: " + URL)
    document.getElementById("returned-new-car").innerText = JSON.stringify(addedCar, null, 2)
    
    }
}


async function handleHttpErrors(res) {
    if (!res.ok) {
        document.getElementById("returned-new-car").innerText = ""
        const errorResponse = await res.json()
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
return res.json()
}




/*
    ****************************************
    * JavaScript for the editOne "view"
    ****************************************
*/

function editOne() {
    document.getElementById("btn-find-car-to-edit").onclick = findCar
    document.getElementById("btn-submit-changes").onclick = submitEditedCar

    async function findCar() {
    const carToEditId = document.getElementById("id-editcar").value
    const car = await fetch(URL, + carToEditId).then(handleHttpErrors)
    fetch(URL + carToEditId).then(r => r.json())
        .then(car => {
        document.getElementById("edit-car-id").innerText = car.id
        document.getElementById("edit-input-brand").value = car.brand
        document.getElementById("edit-input-model").value = car.model
        document.getElementById("edit-input-price-pr-day").value = car.pricePrDay
        })
    }

    async function submitEditedCar() {
    const editedCar = {}
    editedCar.id = document.getElementById("edit-car-id").innerText
    editedCar.brand = document.getElementById("edit-input-brand").value
    editedCar.model = document.getElementById("edit-input-model").value
    editedCar.pricePrDay = document.getElementById("edit-input-price-pr-day").value
    //Now newCar contains all required fields (mathces the DTO on the backend) and values

    //Build the options object requred for a PUT 
    const options = {}
    options.method = "PUT"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(editedCar)
    //Observe, id is added to the URL
    fetch(URL + editedCar.id, options).then(handleHttpErrors)
    
    alert("Car was succesfully edited - Not the right way to report this")
        
    }
}

