const Adm = [{
    username: 'itoko',
    password: 'nolab',
}]

console.log(Adm)

const headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3MzU4Mzg3MjcsImV4cCI6MTczNzA0ODMyN30.HGqsTIO8yLdarrMX-Oyu016dSadQq3af2upVYycvViA"
}

const createCard = () => {
    console.log("createCard iniziata");
    let products = document.getElementById("products")
    document.querySelector('.spinnerHome').style.display = 'block';
    // Test diretto dell'API con fetch
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: 'GET',
        headers: {
            "Authorization": headers.Authorization,
            "Content-Type": "application/json"
        }
        
    })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.spinnerHome').style.display = 'none';
            products.innerHTML = data.map(product => {
                return `<div class="col-lg-3 col-md-4 col-sm-6 mt-3 cardProduct"  id="${product._id}">
            <div class="card">
            <img src="${product.imageUrl}" class="card-img-top rounded-1 " alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">${product.brand}</p>
              <p class="card-text">€${product.price.toFixed(2)}</p>
              <a href="details.html?id=${product._id}" class="btn btn-primary"><i class="bi bi-info-lg"></i></a>
              <button class="btn btn-success" onclick="cart('${product._id}' , '${product.name}' , '${product.price}')"><i class="bi bi-cart"></i></button>
            </div>
          </div>
          </div>`
            }).join('')
        })
        .catch(error => {
            console.error("Errore:", error);
        });
}


    

function inputLogin() {
    const userName = document.getElementById('userName').value
    const Password = document.getElementById('pasW').value
    loginAdm(userName, Password)
}

function loginAdm(userName, Password) {
    const pageAdm = document.getElementById('PageAdm');
    const btnLogin = document.getElementById('BtnLogin');

    if (userName === Adm[0].username && Password === Adm[0].password) {
        if (pageAdm && btnLogin) {
            pageAdm.style.display = 'block';
            btnLogin.style.display = 'none';
            // Salva lo stato del login
            localStorage.setItem('isLoggedIn', 'true');
            
            // Chiudi il modale
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        }
    } else {
        alert('Login errato');
    }

}

//logout
let logout = document.getElementById('BtnLogout');

logout.addEventListener('click',()=>{
  document.getElementById('BtnLogin').style.display = 'block';
  document.getElementById('BtnLogout').style.display = 'none';
  document.getElementById('PageAdm').style.display = 'none';
  localStorage.removeItem('isLoggedIn');
})

// Aggiungi questa funzione per controllare lo stato del login
function checkLoginState() {
    const pageAdm = document.getElementById('PageAdm');
    const btnLogin = document.getElementById('BtnLogin');
    const btnLogout = document.getElementById('BtnLogout');

    if (localStorage.getItem('isLoggedIn') === 'true') {
        if (pageAdm && btnLogin) {
            pageAdm.style.display = 'block';
            btnLogin.style.display = 'none';
            btnLogout.style.display = 'block';
        }
    }
    
}







document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM caricato");
    createCard();
    checkLoginState();
    let access = document.getElementById('access')
    access.addEventListener('click', inputLogin)
});

function search(event){
    let search = event.target.value;
    let products = document.querySelectorAll('.cardProduct');
    products.forEach(product => {
        if(product.querySelector('.card-title').textContent.toLowerCase().includes(search.toLowerCase() )){
            product.style.display = 'block';
        }else{
            product.style.display = 'none';
        }
    })
}
