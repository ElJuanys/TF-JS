let url = "https://vps-3858808-x.dattaweb.com:8443/platos/traerPlatos?id=1"

console.log("Probando fetch");

fetch(url)

    .then(response => response.json())
    .then(data => {
        const platos = data;
        crearCategorias(platos);
        mostrarPlatos(platos);



    })
    .catch(error => console.error("Ocurrió el siguiente error: ", error))


function crearCategorias(platos) {
    const menu = document.getElementById("menu");
    let categorias = ''; //para ir guardando las nuevas categorias
    let guardaCategorias = [];
    platos.forEach(plato => {
        if (!guardaCategorias.some((catego) => catego == plato.categoria)) {
            guardaCategorias.push(plato.categoria)
            categorias += `
                <h2 class="categorias">${plato.categoria}</h2>   
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
            categoriaActual[plato.categoria] = "";
        }
        categoriaActual[plato.categoria] += `
            <div class="container">
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
        seccion.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                // Crear el objeto plato
                const plato = platos.find(p => p.id == button.value);
                const platoObj = {
                    id: plato.id,
                    nombre: plato.nombre,
                    precio: plato.precio
                };

                // Almacenar el objeto en localStorage
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                carrito.push(platoObj);
                localStorage.setItem('carrito', JSON.stringify(carrito));

                console.log('Plato agregado al carrito:', platoObj);
                console.log('Carrito:', carrito);
            });
        });
    }
}

/*function filtrarPlatos(platos){
    const buscador= document.getElementById("buscador");
    buscador.addEventListener("input",(e)=>{
        const busca=e.target.value.toLowerCase();
        const platosFiltrados= platos.filter(plato =>
            plato.nombre.toLowerCase().includes(busca) || plato.descripcion.toLowerCase().includes(busca)
        );
        mostrarPlatos(platosFiltrados);
    })
}
*/
let carrito = [];
function agregarAlCarrito(id) {
    carrito.push(id);
    console.log(carrito);
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    let contenido = "<ul>";
    carrito.forEach(plato => {
        contenido += `
            <li>${plato.id}-${plato.nombre - ${ plato.precio } </li >
            `;
        
    });
    contenido+= "</ul>";
    carritoDiv.innerHTML= contenido; 
}