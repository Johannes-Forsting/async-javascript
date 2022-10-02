const URL = "http://localhost:8080/api/cars/"

document.getElementById("btn-get-all").onclick = (evt) =>{
    showAll()
}

export async function showAll() { //We will add errorhandling when we meet in the class

    const allCars = await fetch(URL).then(r => r.json())
    const tableRows = allCars.map(car => `
        <tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.pricePerDay}</td>
        </tr>
    `
        ).join("")
        document.getElementById("tbl-cars-body").innerHTML = tableRows
        
}