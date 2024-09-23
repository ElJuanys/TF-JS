let url = "https://vps-3858808-x.dattaweb.com:8443/platos/traerPlatos?id=1"

console.log("Probando fetch");

fetch(url)

    .then(response => response.json())
    .then(data => {
        const platos= data;
        let carrito= JSON.parse(localStorage.getItem('carrito')) || [];
        crearCategorias(platos);
        mostrarPlatos(platos);
        mostrarCarrito(carrito);

    })
    .catch(error => console.error("Ocurrió el siguiente error: ", error))


function crearCategorias(platos) {
    const menu = document.getElementById("menu");
    let categorias = ''; //para ir guardando las nuevas categorias
    let guardaCategorias = [];
    platos.forEach(plato => {
        if (!guardaCategorias.some((catego) => catego == plato.categoria)) {
            guardaCategorias.push(plato.categoria)
            categorias +=
            `<h2 class="categorias">${plato.categoria}</h2>   
                <section id="${plato.categoria}" class="secciones">   
                </section>`;
        }
    });
    menu.innerHTML = categorias;

}

function mostrarPlatos(platos) {
    let categoriaActual = [];
    platos.forEach(plato => {
        if (!categoriaActual[plato.categoria]) {
            categoriaActual[plato.categoria]= "";
        }
        categoriaActual[plato.categoria] +=
        `<div class="container">
                <div class="row">
                    <article class="card">
                        <img src="../assets/${plato.id}.webp" class="card-img-top" alt="Ilustracion de ${plato.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${plato.nombre}</h5>
                            <p class="card-text">${plato.descripcion}<br>
                            Precio: $${plato.precio}</p>
                            <button type="button" class="btn btn-primary" id="btn-${plato.id}" value="${plato.id}">Agregar al Carrito</button>
                        </div>
                    </article>
                </div> 
            </div>       
        `;

    })

    for (const categoria in categoriaActual) {
        const seccion = document.getElementById(categoria);
        seccion.innerHTML = categoriaActual[categoria];

        // Agregar event listener a los botones
        seccion.querySelectorAll('.btn-primary').forEach(button=>{
            button.addEventListener('click',()=>{
                // Crear el objeto plato
                const plato= platos.find(p=>p.id == button.value);
                const platoObj= {
                    id: plato.id,
                    nombre: plato.nombre,
                    precio: plato.precio
                };
                crearCarrito(platoObj);       
                
            });
        });
    }
    borrarPlatoCarrito();
}

function mostrarCarrito(carro) {
    let dentroCarrito=document.getElementById("carrito");
    contenido="<ul class='list-group list-group-flush'>";
    let precioTotal=0;
    carro.forEach(plato=>{
        precioTotal+=parseInt(plato.precio);
        contenido +=
        `<li class="list-group-item">${plato.nombre} - $${plato.precio}
        <button type="button" class="btn-close" aria-label="Close" value="${plato.id}"></button>
        </li>`
    })
    contenido+=`<li class="list-group-item">Precio Total de Compra:  `+precioTotal+`</li></ul>`
    dentroCarrito.innerHTML = contenido;

    seccion.querySelectorAll('.btn-close').forEach(button=>{
        button.addEventListener('click',()=>{      
            localStorage.removeItem(plato.id)
        });
    });
    
}
function crearCarrito(platoObj){
    carrito=JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(platoObj);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(carrito);
}


