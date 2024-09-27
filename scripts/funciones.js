function mostrarCarrito(carro) {
    let dentroCarrito=document.getElementById("carrito");
    contenido="<ul class='list-group list-group-flush'>";
    let precioTotal=0;
    carro.forEach(plato=>{
        contenido +=
        `<li class="list-group-item">${plato.nombre} - $${plato.precio}
        <button type="button" class="btn-close" aria-label="Close" value="${plato.id}"></button>
        </li>`
        precioTotal+=parseFloat(plato.precio);
    })
    contenido+=`
    <li class="list-group-item">Precio final:$`+precioTotal+`</li>
    <li class="list-group-item">
        <button type="button" class="btn btn-success" id="compra-carrito">Comprar</button>
        <button type="button" class="btn btn-danger" id="limpiar-carrito">Cancelar Compra</button>
    </li>
    </ul>`
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
    const limpiar=document.querySelector("#limpiar-carrito");
    limpiar.addEventListener('click',limpiarCarrito)
    const comprar=document.querySelector("#compra-carrito");
    comprar.addEventListener('click',()=>{
        Swal.fire({
            title: "El precio total de su compra es:$"+precioTotal+"",
            text: "Quiere finalizar la compra",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText: "NO",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si Comprar!"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: "Listo",
                text: "Gracias por comprar con nosotros",
                icon: "success"
                });
                localStorage.clear();
                mostrarCarrito([]);
            }
        }); 
    })
}

function eliminarDelCarrito(id) { 
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(plato => plato.id.toString() !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(carrito); 
}

function crearCarrito(platoObj) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.some(plato => plato.id === platoObj.id);
    if (!existe) {
        carrito.push(platoObj);
        localStorage.setItem('carrito', JSON.stringify(carrito));
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
        mostrarCarrito(carrito);
    } else {
        Swal.fire({
            position: "bottom-end",
            toast: true,
            width:"20%",
            heightAuto:"auto",
            icon: "warning",
            title: "Ya se agrego anteriormente",
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function limpiarCarrito(){
    Swal.fire({
        title: "Estas seguro que quieres borrar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "NO",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI LIMPIAR!"
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: "Listo",
            text: "El carrito esta limpio.",
            icon: "success"
            });
            localStorage.clear();
            mostrarCarrito([]);
        }
    }); 
}


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
                        <img  src="./assets/${plato.id}.webp" class="card-img-top" alt="Ilustracion de ${plato.nombre}">
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
                    precio: plato.precio,
                    cant: plato.cant
                };
                
                crearCarrito(platoObj);       
                
            });  
        });
    }
    
}
