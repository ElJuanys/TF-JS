let url = "https://vps-3858808-x.dattaweb.com:8443/platos/traerPlatos?id=1"

console.log("Probando fetch");
fetch(url)

    .then(response => response.json())
    .then(data => {
        const platos= data;
        let carrito= JSON.parse(localStorage.getItem('carrito')) || [];
        console.log(carrito);
        crearCategorias(platos);
        mostrarPlatos(platos);
        mostrarCarrito(carrito);

    })
    .catch(error =>{
        const menu = document.getElementById("menu");
        msjError=`<h2>Lo Sentimos</h2>
            <p>Estamos teniendo un error al conectarse con nuestros servidores XD</p>`
        console.error("Ocurrió el siguiente error: ", error)
        menu.innerHTML=msjError}
    )


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
                        <img src="./assets/${plato.id}.webp" class="card-img-top" alt="Ilustracion de ${plato.nombre}">
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
                Swal.fire({
                    position: "bottom-end",
                    toast: true,
                    width:"20%",
                    heightAuto:"auto",
                    icon: "success",
                    title: "Se agrego al carrito",
                    showConfirmButton: false,
                    timer: 1500
                });
                // Crear el objeto plato
                
                const plato= platos.find(p=>p.id == button.value);
                const platoObj= {
                    id: plato.id,
                    nombre: plato.nombre,
                    precio: plato.precio,
                    cant: plato.cant
                };
                
                crearCarrito(platoObj);       
                
            });  
        });
    }
    
}

function mostrarCarrito(carro) {
    let dentroCarrito=document.getElementById("carrito");
    contenido="<ul class='list-group list-group-flush'>";
    let precioTotal=0;
    carro.forEach(plato=>{
        precioTotal+=parseFloat(plato.precio);
        contenido +=
        `<li class="list-group-item">${plato.nombre} - $${plato.precio} - cant (max 10):<input type="number" id="cant-${plato.id}" value="1" min="1" max="10"/>
        <button type="button" class="btn-close" aria-label="Close" value="${plato.id}"></button>
        </li>`
    })
    contenido+=`<li class="list-group-item">Precio Total de Compra: $`+precioTotal+`</li></ul>`
    dentroCarrito.innerHTML = contenido;

    dentroCarrito.querySelectorAll('.btn-close').forEach(button => {
        button.addEventListener('click', () => {
            Swal.fire({
                title: "Quieres borrar este producto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si,borrar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Articulo Borrado",
                    icon: "success"
                    });
                    eliminarDelCarrito(button.value);
                }
            });
            
        });
    });
    
}

function eliminarDelCarrito(id) { 
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(vino => vino.id.toString() !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(carrito); 
}

function crearCarrito(platoObj) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el plato ya está en el carrito
    const existe = carrito.some(plato => plato.id === platoObj.id);
    
    if (!existe) {
        carrito.push(platoObj);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(carrito);
    } else {
        console.log(`El plato ${platoObj.nombre} ya está en el carrito.`);
    }
}
