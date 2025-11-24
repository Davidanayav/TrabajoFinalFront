// Obtener el ID desde la URL
const queryString = location.search;
const stringToObj = new URLSearchParams(queryString);
const id = stringToObj.get("id");

// Seleccionar elementos del DOM donde se van a insertar los datos
const title = document.querySelector("#prod-title");
const img = document.querySelector("#prod-img");
const desc = document.querySelector("#prod-description");
const price = document.querySelector("#prod-price");
const buyBtn = document.querySelector("#buy-btn");
const prodSize = document.querySelector("#prod-size");
const prodLongDesc = document.querySelector("#prod-longdesc");
const reviewsBox = document.querySelector("#reviews");

// Llamar a la API para obtener los datos del producto
fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json()) // Convertir la respuesta en formato JSON
  .then(data => {
    // Mostrar la información del producto
    title.textContent = data.title; // Título del producto
    img.src = data.thumbnail; // Imagen del producto
    img.alt = data.title; // Atributo alt de la imagen
    desc.textContent = data.description // Descripción corta
    price.textContent = `$${data.price}`; // Precio
    buyBtn.href = `./carrito.html?id=${data.id}`; // Enlace para comprar

    // Tamaño (dimensiones)
    prodSize.textContent = `${data.dimensions.width} x ${data.dimensions.height} x ${data.dimensions.depth} cm`; // Mostrar tamaño del producto

    // Descripción larga
    prodLongDesc.textContent = data.description; // Descripción larga (puedes modificar este campo según lo que necesites)

    // Reseñas del producto
    let reviewsHTML = "";
    data.reviews.forEach(review => {
      reviewsHTML += `
        <div class="comment">
          <h4>${review.reviewerName}</h4>
          <p>${review.comment}</p>
          <h5>${new Date(review.date).toLocaleDateString()}</h5>
        </div>
      `;
    });
    reviewsBox.innerHTML = reviewsHTML; // Insertar reseñas en el contenedor
  })
  .catch(err => console.log("Error:", err)); // Mostrar cualquier error en la consola
