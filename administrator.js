const Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4";

const createButton = document.getElementById("create")

createButton.addEventListener("click", infoCreate)


function infoCreate() {
    //prendo i valori degli input
    const nameInput = document.getElementById("name").value
    const brandInput = document.getElementById("brand").value
    const descriptionInput = document.getElementById("description").value
    const imageInput = document.getElementById("image").value
    const priceInput = document.getElementById("price").value
    
 
    createProduct(nameInput, brandInput, descriptionInput, imageInput, priceInput)
}

//creo la funzione per creare il prodotto
function createProduct(nameInput, brandInput, descriptionInput, imageInput, priceInput) {
    
    
    let newProduct = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Authorization
        },
        body: JSON.stringify({
            "name": nameInput,
            "description": descriptionInput,
            "brand": brandInput,
            "imageUrl": imageInput,
            "price": parseFloat(priceInput)
        })
    }
        
    console.log('Dati da inviare:', JSON.parse(newProduct.body));
    document.querySelector('.spinnerAdmin').style.display = 'block';
    let url = fetch("https://striveschool-api.herokuapp.com/api/product/", newProduct)
    .then(response => response.json())
    .then(data => {
        console.log('Successo:', data);
        document.getElementById("name").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("description").value = "";
        document.getElementById("image").value = "";
        document.getElementById("price").value = "";
        info();
    })
    .catch(error => {
        console.error('Errore durante la creazione del prodotto:', error);
        if (error.message) {
            console.error('Messaggio di errore:', error.message);
        }
    });

} 

//funzione per eliminare il prodotto
function eliminateProduct(productId) {
    document.querySelector('.spinnerAdmin').style.display = 'block';
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": Authorization
        }
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
        console.log('Prodotto eliminato con successo:', data);
        info(); // Aggiorna la tabella dopo l'eliminazione
    })
    .catch(error => {
        console.error('Errore durante l\'eliminazione:', error);
    });
}




document.addEventListener("DOMContentLoaded", function() {
    info()
})

const info = () => {
    let table = document.getElementById("products")
    
    // Torniamo all'URL originale che funzionava
    let url = "https://striveschool-api.herokuapp.com/api/product/"
    document.querySelector('.spinnerAdmin').style.display = 'block';
    fetch(url, {
        headers: {
            "Authorization": Authorization
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dati ricevuti:', data); // Debug

        let html = "<table><tr><th class='text-center'>Image</th><th class='text-center'>Name</th><th class='text-center'>Marca</th><th class='text-center'>Description</th><th class='text-center'>Price</th><th class='text-center'>Delete</th></tr>"
        document.querySelector('.spinnerAdmin').style.display = 'none';
        for(let product of data) {
            html += `
                <tr>
                    <td class="text-center ">
                        <img src="${product.imageUrl}" class="rounded-1" alt="${product.imageUrl }"><br>
                        <button  onclick="modificaImmagine('${product._id}', '${product.imageUrl}')">Modifica</button>
                    </td>
                    <td class="text-center">
                        ${product.name}<br>
                        <button onclick="modificaName('${product._id}')">Modifica</button>
                    </td>
                    <td class="text-center" >    
                        ${product.brand}<br>
                        <button onclick="modificaBrand('${product._id}')">Modifica</button>
                    </td>
                    <td class="text-center">
                        ${product.description.substring(0, 10)}...<br>
                        <button onclick="modificaDescription('${product._id}')">Modifica</button>
                    </td>
                    <td class="text-center">
                        €${product.price.toFixed(2)}<br>
                        <button onclick="modificaPrice('${product._id}')">Modifica</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-danger" onclick="eliminateProduct('${product._id}')"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>`
        }
        html += "</table>"
        table.innerHTML = html
    })
    .catch(error => {
        console.error('Errore nel caricamento dei prodotti:', error);
        table.innerHTML = "Errore nel caricamento dei prodotti";
    })
}
//funzione per modificare il nome
function modificaName(productId) {
    //prendo il nuovo nome
    let newName = prompt("Inserisci il nuovo nome")
    console.log(newName)
    //chiamo la funzione per modificare il nome
    modifyName(productId, newName)
}
//funzione per modificare il nome
function modifyName(productId, newName) {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    console.log(productId, newName)
    //creo l'url per modificare il nome
    document.querySelector('.spinnerAdmin').style.display = 'block';
    let url = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
        },
        body: JSON.stringify({
            "name": newName
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
        console.log('Prodotto modificato con successo:', data);
        info()
    })
    .catch(error => {
        console.error('Errore durante la modifica del prodotto:', error);
    });
}

function modificaBrand(productId) {
    let newBrand = prompt("Inserisci la nuova marca")
    console.log(newBrand)
    modifyBrand(productId, newBrand)
}

function modifyBrand(productId, newBrand) {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    console.log(productId, newBrand)
    document.querySelector('.spinnerAdmin').style.display = 'block';
    let url = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
        },
        body:JSON.stringify({
            brand : newBrand
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
        console.log('Prodotto modificato con successo:', data);
        info()
    })
    .catch(error => {
        console.error('Errore durante la modifica del prodotto:', error);
    });
}

function modificaDescription(productId) {
    let newDescription = prompt("Inserisci la nuova descrizione")
    console.log(newDescription)
    modifyDescription(productId, newDescription)
}

function modifyDescription(productId, newDescription) {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    console.log(productId, newDescription)
    let url = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    document.querySelector('.spinnerAdmin').style.display = 'block';
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
        },
        body:JSON.stringify({
            description : newDescription
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
        console.log('Prodotto modificato con successo:', data);
        info()
    })
    .catch(error => {
        console.error('Errore durante la modifica del prodotto:', error);
    });
}

function modificaPrice(productId) {
    let newPrice = prompt("Inserisci il nuovo prezzo")
    console.log(newPrice)
    modifyPrice(productId, newPrice)
}

function modifyPrice(productId, newPrice) {
    // Converti il prezzo in numero float
    const parsedPrice = parseFloat(newPrice);
    
    // Verifica se il prezzo è un numero valido
    if (isNaN(parsedPrice)) {
        alert("Per favore, inserisci un prezzo valido");
        return;
    }

    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"
    }
    document.querySelector('.spinnerAdmin').style.display = 'block';
    let url = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
        },
        body: JSON.stringify({
            price: parsedPrice // Usa il prezzo convertito
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
        console.log('Prodotto modificato con successo:', data);
        info()
    })
    .catch(error => {
        console.error('Errore durante la modifica del prodotto:', error);
    });
}

function modificaImmagine(productId) {
    let newImage = prompt("Inserisci il nuovo url dell'immagine")
    console.log(newImage)
    modifyImage(productId, newImage)
}

function modifyImage(productId, newImage) {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    console.log(productId, newImage)
    document.querySelector('.spinnerAdmin').style.display = 'block';
    let url = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
        },
        body:JSON.stringify({
            imageUrl : newImage
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
        console.log('Prodotto modificato con successo:', data);
        info()
    })
    .catch(error => {
        console.error('Errore durante la modifica del prodotto:', error);
    });
}
