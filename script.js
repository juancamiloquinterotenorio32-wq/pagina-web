// =====================================================
// SPORTZONE - script.js
// Productos, filtro, carrito, localStorage y WhatsApp
// =====================================================

// ----- 1. DATOS -----------------------------------------
// Número de WhatsApp con código de país y SIN el signo +
const NUMERO_WHATSAPP = "573204624468";

// Cada camiseta es un objeto. category: "club" o "seleccion".
// REVISAR: los nombres salen de los enlaces de las imágenes; confirma cada uno.
// Los que dicen "REVISAR" no pude identificarlos. Cambia también los precios (en pesos).
const products = [
  { id: 1,  name: "Camiseta Barcelona",         price: 79900, category: "club",      img: "https://w7.pngwing.com/pngs/187/688/png-transparent-fc-barcelona-t-shirt-real-madrid-c-f-jersey-kit-fc-barcelona-thumbnail.png" },
  { id: 2,  name: "Camiseta Bayern Múnich",     price: 79900, category: "club",      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqLM_fGlWa2N1LXb80PWD84aFxqA0osWSdbVJntirpA&s" },
  { id: 3,  name: "Camiseta Juventus",          price: 79900, category: "club",      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotUzzx69g87AclGL40YVnFgqK5EQNC_W0XQ4tQVcZ9Q&s" },
  { id: 4,  name: "Camiseta Liverpool",         price: 79900, category: "club",      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDtLaou00aETKOTohCVdq1Wd7M6_nGEf9_X7J-q9Hayw&s" },
  { id: 5,  name: "Camiseta Real Madrid",       price: 79900, category: "club",      img: "https://w7.pngwing.com/pngs/83/281/png-transparent-real-madrid-c-f-adidas-jersey-football-adidas-tshirt-white-logo.png" },
  { id: 6,  name: "Camiseta Inter de Milán",    price: 79900, category: "club",      img: "https://w7.pngwing.com/pngs/566/333/png-transparent-inter-milan-serie-a-a-c-milan-jersey-kit-shirt-tshirt-blue-active-shirt.png" },
  { id: 7,  name: "Camiseta Brasil",            price: 79900, category: "seleccion", img: "https://w7.pngwing.com/pngs/209/353/png-transparent-brazil-national-football-team-2018-world-cup-nike-jersey-nike-tshirt-jersey-active-shirt-thumbnail.png" },
  { id: 8,  name: "Camiseta PSG",                price: 79900, category: "club",      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF9G55c8qB00hyeztLilIbRZwTIi6HsNvq6EkOCkuMYg&s=10" },
  { id: 9,  name: "Camiseta Arsenal",           price: 79900, category: "club",      img: "https://w7.pngwing.com/pngs/343/108/png-transparent-arsenal-f-c-emirates-stadium-arsenal-stadium-2016-17-premier-league-t-shirt-arsenal.png" },
  { id: 10, name: "Camiseta Manchester United", price: 79900, category: "club",      img: "https://e7.pngegg.com/pngimages/144/505/png-clipart-manchester-united-f-c-premier-league-old-trafford-f-c-united-of-manchester-jersey-premier-league-tshirt-logo.png" },
  { id: 11, name: "Camiseta Alemania",          price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/674/485/png-transparent-2018-world-cup-germany-national-football-team-jersey-adidas-shirt-adidas-tshirt-angle-white.png" },
  { id: 12, name: "Camiseta Colombia",          price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/914/955/png-transparent-2018-world-cup-colombia-national-football-team-t-shirt-argentina-national-football-team-jersey-t-shirt-tshirt-active-shirt-adidas-thumbnail.png" },
  { id: 13, name: "Camiseta Francia",           price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/895/757/png-transparent-2018-world-cup-france-national-football-team-t-shirt-jersey-argentina-national-football-team-t-shirt-tshirt-logo-active-shirt.png" },
  { id: 14, name: "Camiseta Países Bajos",      price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/934/563/png-transparent-netherlands-national-football-team-t-shirt-nike-jersey-t-shirt-tshirt-orange-active-shirt.png" },
  { id: 15, name: "Camiseta Inglaterra",        price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/495/923/png-transparent-sports-fan-jersey-t-shirt-england-national-football-team-tennis-polo-england-jersey-tshirt-angle-white.png" },
  { id: 16, name: "Camiseta Italia",            price: 69900, category: "seleccion", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9bSqx0rT0o0BvX9OvAiJu60SiGH210zxAnBjwpeg7Q&s=10" },
  { id: 17, name: "Camiseta España",            price: 69900, category: "seleccion", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDd4NXNV4x4pXzTBC2Y-YvUll4HNJnwl0PWh18CD5XNGZixiWSS4wPm5os&s=10" },
  { id: 18, name: "Camiseta Polonia",           price: 69900, category: "seleccion", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvZ0XxRbRT6AGLd6fIpTRsCVCcS0V9A0Sk5QsfQbqhbNj_K2v1l4FWtI&s=10" },
  { id: 19, name: "Camiseta Uruguay",           price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/815/674/png-transparent-2018-world-cup-uruguay-national-football-team-t-shirt-jersey-t-shirt-tshirt-blue-sport-thumbnail.png" },
  { id: 20, name: "Camiseta México",            price: 69900, category: "seleccion", img: "https://w7.pngwing.com/pngs/151/674/png-transparent-mexico-national-football-team-2018-world-cup-copa-america-centenario-t-shirt-jersey-soccer-jerseys-tshirt-active-shirt-adidas-thumbnail.png" }
];

// ----- 2. ESTADO ----------------------------------------
// El carrito guarda { idProducto: cantidad }, por ejemplo { 1: 2, 5: 1 }
let cart = cargarCarrito();
let filtroActual = "todas";

// ----- 3. UTILIDADES ------------------------------------
// Convierte 79900 en "$79.900"
function formatear(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });
}

// Lee el carrito guardado en el navegador (si no hay nada, devuelve uno vacío)
function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem("carrito")) || {};
  } catch (error) {
    return {};
  }
}

// Guarda el carrito en el navegador para que no se borre al recargar
function guardarCarrito() {
  try {
    localStorage.setItem("carrito", JSON.stringify(cart));
  } catch (error) {
    console.error("No se pudo guardar el carrito", error);
  }
}

// ----- 4. MOSTRAR PRODUCTOS -----------------------------
function renderProducts() {
  const container = document.getElementById("products-container");

  // Si el filtro es "todas" mostramos todo; si no, solo la categoría elegida
  const lista = filtroActual === "todas"
    ? products
    : products.filter(prod => prod.category === filtroActual);

  container.innerHTML = lista.map(prod => `
    <article class="producto">
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <strong>${formatear(prod.price)}</strong>
      <button class="boton comprar" data-action="add-to-cart" data-product-id="${prod.id}">Agregar al carrito</button>
    </article>
  `).join("");
}

// Botones de filtro (Todas / Clubes / Selecciones)
document.querySelectorAll(".btn-filtro").forEach(boton => {
  boton.addEventListener("click", () => {
    filtroActual = boton.dataset.filtro;
    document.querySelectorAll(".btn-filtro").forEach(filtro => {
      filtro.classList.toggle("activo", filtro === boton);
      filtro.setAttribute("aria-pressed", String(filtro === boton));
    });
    renderProducts();
  });
});

// ----- 5. CARRITO ---------------------------------------
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id]--;
    if (cart[id] === 0) delete cart[id];
  }
  updateCartUI();
}

document.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.productId);
  if (!Number.isInteger(id)) return;

  if (button.dataset.action === "add-to-cart") {
    addToCart(id);
  } else if (button.dataset.action === "remove-from-cart") {
    removeFromCart(id);
  }
});

function updateCartUI() {
  guardarCarrito();

  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const ids = Object.keys(cart);

  // Carrito vacío
  if (ids.length === 0) {
    cartItems.innerHTML = '<p class="empty-msg">El carrito está vacío</p>';
    totalPrice.innerText = formatear(0);
    return;
  }

  let total = 0;

  cartItems.innerHTML = ids.map(id => {
    const product = products.find(p => p.id == id);
    if (!product) return ""; // por si quedó guardado un producto que ya no existe

    const quantity = cart[id];
    const subtotal = product.price * quantity;
    total += subtotal;

    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <span>${formatear(product.price)} x ${quantity} = ${formatear(subtotal)}</span>
        </div>
        <div class="quantity-controls">
          <button class="btn-qty" data-action="remove-from-cart" data-product-id="${product.id}">-</button>
          <span>${quantity}</span>
          <button class="btn-qty" data-action="add-to-cart" data-product-id="${product.id}">+</button>
        </div>
      </div>
    `;
  }).join("");

  totalPrice.innerText = formatear(total);
}

// ----- 6. PEDIDO POR WHATSAPP ---------------------------
document.getElementById("btn-checkout").addEventListener("click", () => {
  const ids = Object.keys(cart);

  if (ids.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "¡Hola! Quisiera realizar el siguiente pedido:\n\n";
  let total = 0;

  ids.forEach(id => {
    const product = products.find(p => p.id == id);
    if (!product) return;

    const quantity = cart[id];
    const subtotal = product.price * quantity;
    total += subtotal;
    mensaje += `• ${product.name} x${quantity} - ${formatear(subtotal)}\n`;
  });

  mensaje += `\n*Total a pagar: ${formatear(total)}*`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});

// ----- 7. INICIO ----------------------------------------
renderProducts();
updateCartUI();