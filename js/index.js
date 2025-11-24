// Seleccionamos los contenedores
const productsContainer = document.querySelector(".section-products");
const commentsContainer = document.querySelector(".section-comments");

// Función para inicializar todo
async function init() {
    try {
        // Llamamos a la API
        const response = await fetch("https://fakestoreapi.com/products/category/electronics");
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Asumimos que la respuesta es un array de productos
        const allProducts = await response.json(); 
        
        // ===============================================
        // 1. RENDERIZAR PRODUCTOS (8 ELEMENTOS)
        // ===============================================
        
        // Tomamos los primeros 8 productos
        const productsToShow = allProducts.slice(0, 8); 

        let productsHTML = "";
for (const prod of productsToShow) {
    productsHTML += `
        <article class="product">
            <h2>${prod.title.slice(0, 80)}</h2>
            <img src="${prod.image}" alt="${prod.title}">
            <p>${prod.description.slice(0, 50)}...</p>
            <h3>$${prod.price}</h3>
            <div class="card-footer"> 
                <a href="./detalle.html?id=${prod.id}" class="info">Más info</a>

            <a class="compra" onclick="agregarAlCarrito(${prod.id}, '${prod.title.replace(/'/g, "\\'")}', ${prod.price}); return false;" href="#">
              Comprar
            </a>
              </div>
              </article>
    `;
}
        // Asegúrate de que productsContainer existe antes de intentar modificarlo
        if (productsContainer) {
            productsContainer.innerHTML = productsHTML;
        }

        // ===============================================
        // 2. RENDERIZAR RESEÑAS (4 ELEMENTOS)
        // ===============================================

        let allReviews = [];
        
        // Recopilamos las reseñas de TODOS los productos (no solo los 8 mostrados)
        for (const prod of allProducts) {
            if (prod.reviews && Array.isArray(prod.reviews)) {
                allReviews = allReviews.concat(prod.reviews);
            }
        }

        // Limitamos a las 4 primeras reseñas encontradas
        const reviewsToShow = allReviews.slice(0, 4); 

        let reviewsHTML = "";
        for (const review of reviewsToShow) {
            // Verificación de fecha para evitar errores si 'date' no existe o es nulo
            const reviewDate = review.date 
                ? new Date(review.date).toLocaleDateString()
                : 'Fecha desconocida';

            reviewsHTML += `
                <div class="comment">
                    <h4>${review.reviewerName}</h4>
                    <p>${review.comment}</p>
                    <h5>Fecha: ${reviewDate}</h5>
                </div>
            `;
        }

        // Asegúrate de que commentsContainer existe antes de intentar modificarlo
        if (commentsContainer) {
            commentsContainer.innerHTML = reviewsHTML;
        }
        
    } catch (error) {
        console.error("Error cargando la API:", error);
        // Mostrar un mensaje de error en el contenedor si es necesario
        if (productsContainer) {
             productsContainer.innerHTML = '<p class="error-message">No se pudieron cargar los productos.</p>';
        }
    }
}

init(); // Llamamos a la función asíncrona para iniciar el proceso

function agregarAlCarrito(id, titulo, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === id);
    
    // Si el producto ya está en el carrito, aumentamos la cantidad
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        // Si no está, lo agregamos al carrito
        carrito.push({ id, titulo, precio, cantidad: 1 });
    }

    // Guardamos el carrito en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizamos el contador del carrito
    actualizarContadorCarrito();

    // Alerta al usuario
    alert(`"${titulo}" agregado al carrito.`);
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const badge = document.querySelector(".cart-count");
    if (badge) badge.textContent = total;
}