function cargarCarrito() {
    const contenedor = document.querySelector("#lista-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let html = "";
    let total = 0;

    carrito.forEach(item => {
        html += `
            <article class="carrito-item">
                <h3>${item.titulo}</h3>
                <p>Precio: $${item.precio}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <button onclick="eliminarItem(${item.id})">Eliminar</button>
            </article>
        `;
        total += item.precio * item.cantidad;
    });

    html += `<h2>Total: $${total.toFixed(2)}</h2>`;
    contenedor.innerHTML = html;
}

function eliminarItem(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

cargarCarrito();
