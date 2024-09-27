let url = "https://vps-3858808-x.dattaweb.com:8443/platos/traerPlatos?id=1"

console.log("Probando fetch");
fetch(url)

    .then(response => response.json())
    .then(data => {
        let carrito= JSON.parse(localStorage.getItem('carrito')) || [];
        console.log(carrito);
        const platos= data;
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



