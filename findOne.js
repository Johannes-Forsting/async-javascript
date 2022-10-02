

const URL = "http://localhost:8080/api/cars/"

export async function findOne() {
    

    document.getElementById("car-info").innerText = ""
    document.getElementById("text-for-id").value = ""
    document.getElementById("error").innerText = ""
    document.getElementById("btn-find-one").onclick = findCar

    async function findCar() {
    const carToFindId = document.getElementById("text-for-id").value

    try{
        const car = await fetch(URL + carToFindId).then(handleHttpErrors)
        document.getElementById("error").innerText = ""

        document.getElementById("car-info").innerText = JSON.stringify(car, null, 2)
    }
    catch(e){
        
        document.getElementById("error").innerText = e
    }
    }
}


async function handleHttpErrors(res) {
    if (!res.ok) {
        document.getElementById("car-info").innerText = ""
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
        error.apiError = errorResponse
        throw error
    }
return res.json()
}


