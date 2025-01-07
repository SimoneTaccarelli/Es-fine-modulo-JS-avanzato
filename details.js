const headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4Mzg3MjcsImV4cCI6MTczNzA0ODMyN30.HGqsTIO8yLdarrMX-Oyu016dSadQq3af2upVYycvViA"
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.spinnerDetails').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.spinnerDetails').style.display = 'none';
    }, 3000);
    const id = new URLSearchParams(window.location.search).get("id");
    console.log(id);

    if (!id) {
        let details = document.getElementById("details");
        details.innerHTML = "<h1>Prodotto non trovato</h1>";
        return;
    }


    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": headers.Authorization,
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            let details = document.getElementById("details");
            console.log(data.imageUrl);
    
            details.innerHTML = `<div class="row" data-id="${data._id}">
                                    <div id="img" class="col-12 col-md-6">
                                        <img src="${data.imageUrl}" class="card-img-top rounded-1" alt="...">
                                    </div>
                                    <div class="col-12 col-md-6 text-start">
                                        <h1>${data.name}</h1>
                                        <p>${data.description}</p>
                                        <p>${data.brand}</p>
                                        <p>€${data.price.toFixed(2)}</p>
                                        <button class="btn btn-success" onclick='cart("${data._id}","${data.name}","${data.price}")'><i class="bi bi-cart"></i></button>
                                    </div>
                                </div>`
        })
        .catch(error => {
            console.error("Errore:", error);
        });
})







