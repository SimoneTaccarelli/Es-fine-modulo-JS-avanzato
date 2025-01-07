let savecard = []
let savetotal = 0

// Modifica della funzione memoryStorage
function memoryStorage() {
    // Recupera i dati dal localStorage
    savecard = JSON.parse(localStorage.getItem('savecard')) || []
    savetotal = parseFloat(localStorage.getItem('savetotal')) || 0
    
    // Aggiorna il badge quando si carica la pagina
    updateBadge()
}

// Nuova funzione per aggiornare il badge
function updateBadge() {
    let badgeCart = document.getElementById('badgeCart');
    if (badgeCart) {
        badgeCart.textContent = savecard.reduce((sum, product) => sum + product.quantity, 0);
    }
}

// Aggiungi questa chiamata all'inizio del file o quando la pagina si carica
window.onload = function() {
    memoryStorage()
    displayCart() // Mostra subito i prodotti salvati
}


//funzione per aggiungere il prodotto al carrello
function cart(id, name, price) {
    // Prima di aggiungere nuovi prodotti, assicuriamoci di avere i dati più recenti
    memoryStorage()


    const existingProduct = savecard.find(product => product.id === id)
    if (existingProduct) {
        existingProduct.quantity++
    } else {
        const newProduct = {
            id: id,
            name: name,
            price: price,
            quantity: 1
        }
        savecard.push(newProduct)
        ;
    }
    
    // Salva nel localStorage dopo ogni modifica
    localStorage.setItem('savecard', JSON.stringify(savecard))
    
    // Calcola e salva il totale
    let total = savecard.reduce((sum, product) => sum + (product.price * product.quantity), 0)
    localStorage.setItem('savetotal', total.toString())
    
    updateBadge()  // Usa la nuova funzione
    displayCart()
}

function displayCart() {
   let cartCard = document.getElementById('cart')
   let totalPrice = document.getElementById('totalPrice')
   let total = 0
   
   // Azzera il contenuto del carrello prima di riempirlo
   cartCard.innerHTML = ''
   
   savecard.forEach(product => {
        total += product.price * product.quantity
        cartCard.innerHTML += `
        <div class="cart-item d-flex align-items-center p-2 border-bottom" id="${product.id}">
            <div class="cartInfo flex-grow-1 d-flex justify-content-between align-items-center">
                <div class="cartName">
                    <h5 class="card-title mb-0">${product.name}</h5>
                </div>
                <div class="cartQuantity mx-3">
                    <p class="card-text mb-0">x${product.quantity}</p>
                </div>
                <div class="cartPrice mx-3">
                    <p class="card-text mb-0">${Number(product.price).toFixed(2)} €</p>
                </div>
                <div class="cartRemove">
                    <button class="btn btn-danger btn-sm removeProduct" onclick="removeProduct('${product.id}')">Remove</button>
                </div>
            </div>
        </div>
    `
    })
    totalPrice.innerHTML = total.toFixed(2) 
}


function removeProduct(id) {
    savecard = savecard.filter(product => product.id !== id)
    localStorage.setItem('savecard', JSON.stringify(savecard))
    
    updateBadge() 
    displayCart()
}


