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
    
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    
    let newProduct = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
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
    
    let url = fetch("https://striveschool-api.herokuapp.com/api/product/", newProduct)
    .then(response => response.json())
    .then(data => {
        console.log('Successo:', data);
        //resetta i campi
        nameInput.value = ""
        brandInput.value = ""
        descriptionInput.value = ""
        imageInput.value = ""
        priceInput.value = ""
        
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
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYyOGRjMTUzMDRhNzAwMTUxNDhiOTAiLCJpYXQiOjE3MzQ1MTIwNjUsImV4cCI6MTczNTcyMTY2NX0.Pw0R-pqH_nHd_2j1uboYq4sIhh6NUgIHejtTSzgnsN4"
    }
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": headers.Authorization
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Prodotto eliminato con successo:', data);
        info(); // Aggiorna la tabella dopo l'eliminazione
    })
    .catch(error => {
        console.error('Errore durante l\'eliminazione:', error);
    });
}




document.addEventListener("DOMContentLoaded", function() {
    info()
    document.querySelector('.spinnerAdmin').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.spinnerAdmin').style.display = 'none';
    }, 4000);
})

const info = () => {
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    let table = document.getElementById("products")
    
    // Torniamo all'URL originale che funzionava
    let url = "https://striveschool-api.herokuapp.com/api/product/"
    
    fetch(url, {
        headers: headers
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
    const headers = {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4MzkzNzAsImV4cCI6MTczNzA0ODk3MH0.eXmFsgbgdvKSkcqfNIi-rHBgOz47nWKyshF_Wu5BHK4"    }
    console.log(productId, newPrice)
    let url = `https://striveschool-api.herokuapp.com/api/product/${productId}`
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": headers.Authorization
        },
        body: JSON.stringify({
            price: newPrice
        })
    })
    .then(response => response.json())
    .then(data => {
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
        console.log('Prodotto modificato con successo:', data);
        info()
    })
    .catch(error => {
        console.error('Errore durante la modifica del prodotto:', error);
    });
}
