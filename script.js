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
  { id: 1,  name: "Camiseta Barcelona",         price: 79900, category: "club",      img: "https://i.pinimg.com/736x/29/14/f7/2914f73a1c5884399e28a5c6f1fba61d.jpg" },
  { id: 2,  name: "Camiseta Bayern Múnich Retro", price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/6c/30/a1/6c30a1faefc25d39ebb82ee489769dd6.jpg" },
  { id: 3,  name: "Camiseta Juventus Retro",    price: 79900, category: "club",      img: "https://i.pinimg.com/736x/e6/c0/ad/e6c0ad1676c5fdcf2dd825b5e7992cc8.jpg" },
  { id: 4,  name: "Camiseta Liverpool",         price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/34/82/4b/34824bdf437e86f84004f7fd30590320.jpg" },
  { id: 5,  name: "Camiseta Real Madrid",       price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/0e/84/13/0e84130637d58463450b29f969cc4cf6.jpg" },
  { id: 6,  name: "Camiseta Inter de Milán",    price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/6c/21/ee/6c21ee6fbf0d86643848cd386347cd96.jpg" },
  { id: 7,  name: "Camiseta Brasil",            price: 79900, category: "seleccion", img: "https://i.pinimg.com/736x/14/3e/76/143e7636db3f9ecd357046d0a7587508.jpg" },
  { id: 8,  name: "Camiseta PSG",                price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/8e/a8/de/8ea8deb6941a4607821148c89303eaef.jpg" },
  { id: 9,  name: "Camiseta Arsenal Visitante", price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/6c/99/68/6c99681f1c12d26f9d07d601f5b82dc0.jpg" },
  { id: 10, name: "Camiseta Manchester United Retro", price: 79900, category: "club",      img: "https://i.pinimg.com/736x/de/18/0e/de180e6c2afe6d1d4c2c8f1657c03e9e.jpg" },
  { id: 11, name: "Camiseta Alemania Retro",    price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/32/e0/54/32e054d182382537ec1ae95896ba909b.jpg" },
  { id: 12, name: "Camiseta Colombia",          price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/12/df/a2/12dfa282c21ce29b2a55f3aad06faecb.jpg" },
  { id: 13, name: "Camiseta Francia",           price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/56/fd/b8/56fdb8c98e75758d24e3d6a35f0f5413.jpg" },
  { id: 14, name: "Camiseta Países Bajos",      price: 69900, category: "seleccion", img: "https://i.pinimg.com/736x/87/df/e3/87dfe3fd612090b093d9b373c71bff72.jpg" },
  { id: 15, name: "Camiseta Inglaterra",        price: 69900, category: "seleccion", img: "https://i.pinimg.com/736x/08/b3/3d/08b33d037af67aa74bdf0251c02890da.jpg" },
  { id: 16, name: "Camiseta Italia",            price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/33/da/94/33da943a7d2d6554ad7498088c00ce9f.jpg" },
  { id: 17, name: "Camiseta España",            price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/cf/c0/0e/cfc00ece245ba4fe446167dceb64585a.jpg" },
  { id: 18, name: "Camiseta Polonia",           price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/e8/96/99/e8969983a7924fd7463f23ae533bf725.jpg" },
  { id: 19, name: "Camiseta Uruguay",           price: 69900, category: "seleccion", img: "https://i.pinimg.com/736x/09/2f/ee/092fee635a76a8733be65cf931356e8f.jpg" },
  { id: 20, name: "Camiseta México",            price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/8e/9e/f5/8e9ef57a9697658ef100b3ea3d746847.jpg" },
  { id: 21, name: "Camiseta Manchester City",   price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/39/dd/e1/39dde1df361ad4b7fd3a9b3d1a9e1428.jpg" },
  { id: 22, name: "Camiseta Borussia Dortmund", price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/08/e0/8a/08e08ad812dbe10590b5a4dfb4ece13e.jpg" },
  { id: 23, name: "Camiseta AC Milan Retro",    price: 79900, category: "club",      img: "https://i.pinimg.com/736x/a1/ea/1b/a1ea1b8e9cf3624b9bd52b623818325b.jpg" },
  { id: 24, name: "Camiseta Atlético de Madrid", price: 79900, category: "club",     img: "https://i.pinimg.com/1200x/08/fe/7a/08fe7a8f4a680f0cc813279457a31de3.jpg" },
  { id: 25, name: "Camiseta Napoli",            price: 79900, category: "club",      img: "https://i.pinimg.com/736x/c5/71/06/c571060ca18c5eb2ce0dc51751af0aaa.jpg" },
  { id: 26, name: "Camiseta Chelsea",           price: 79900, category: "club",      img: "https://i.pinimg.com/1200x/15/49/16/15491697cde712fb23faff899d5146fa.jpg" },
  { id: 27, name: "Camiseta Roma",              price: 79900, category: "club",      img: "https://i.pinimg.com/736x/9d/54/da/9d54daec836efb4b497c9940de486b57.jpg" },
  { id: 28, name: "Camiseta Argentina",        price: 69900, category: "seleccion", img: "https://i.pinimg.com/736x/3d/2e/e6/3d2ee648a8a8c51a342bcf1c7407737d.jpg" },
  { id: 29, name: "Camiseta Portugal",          price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/ae/08/5a/ae085a8387ec4215ebf43f79cdd325a8.jpg" },
  { id: 30, name: "Camiseta Marruecos",         price: 69900, category: "seleccion", img: "https://i.pinimg.com/1200x/ec/db/a0/ecdba09853d1597f593651008e9f93ac.jpg" },
  { id: 31, name: "Camiseta Noruega",           price: 69900, category: "seleccion", img: "https://i.pinimg.com/736x/50/5b/f8/505bf8e28b243af1f8ceff20ee3e5b8b.jpg" },
  { id: 32, name: "Camiseta Croacia",           price: 69900, category: "seleccion", img: "https://i.pinimg.com/736x/7b/3a/09/7b3a09baec7b5caa164b79a86392f3e1.jpg" }
];
const tallas = ["S", "M", "L", "XL"];

// ----- 2. ESTADO ----------------------------------------
// El carrito guarda cantidades por producto y talla, por ejemplo { "1|M": 2 }.
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
    const guardado = JSON.parse(localStorage.getItem("carrito")) || {};
    const carritoNormalizado = {};

    Object.entries(guardado).forEach(([clave, cantidad]) => {
      if (!Number.isInteger(cantidad) || cantidad < 1) return;

      const [id, talla] = clave.split("|");
      const productoId = Number(id);
      if (!Number.isInteger(productoId) || !products.some(product => product.id === productoId)) return;

      const tallaValida = tallas.includes(talla) ? talla : "";
      const claveNormalizada = `${productoId}|${tallaValida}`;
      carritoNormalizado[claveNormalizada] = (carritoNormalizado[claveNormalizada] || 0) + cantidad;
    });

    return carritoNormalizado;
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
    <article class="producto" data-product-id="${prod.id}">
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <strong>${formatear(prod.price)}</strong>
      <fieldset class="tallas-producto">
        <legend>ELIGE TU TALLA</legend>
        <div class="opciones-talla">
          ${tallas.map(talla => `
            <label class="talla-opcion">
              <input type="radio" name="talla-producto-${prod.id}" value="${talla}" aria-label="Talla ${talla}">
              <span>${talla}</span>
            </label>
          `).join("")}
        </div>
        <span class="talla-seleccionada" aria-live="polite">Selecciona una talla</span>
      </fieldset>
      <button class="boton comprar" data-action="add-to-cart" data-product-id="${prod.id}" disabled>ELIGE UNA TALLA</button>
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
function addToCart(id, talla) {
  const clave = `${id}|${talla}`;
  cart[clave] = (cart[clave] || 0) + 1;
  updateCartUI();
}

function removeFromCart(clave) {
  if (cart[clave]) {
    cart[clave]--;
    if (cart[clave] === 0) delete cart[clave];
  }
  updateCartUI();
}

document.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;

  const boton = event.target.closest("button[data-action]");
  if (!boton) return;

  if (boton.dataset.action === "add-to-cart") {
    if (boton.dataset.cartKey) {
      cart[boton.dataset.cartKey] = (cart[boton.dataset.cartKey] || 0) + 1;
      updateCartUI();
      return;
    }

    const id = Number(boton.dataset.productId);
    if (!Number.isInteger(id)) return;

    const talla = boton.closest(".producto")?.querySelector(".tallas-producto input:checked")?.value;
    if (!talla) {
      alert("Selecciona una talla antes de agregar la camiseta.");
      return;
    }
    addToCart(id, talla);
  } else if (boton.dataset.action === "remove-from-cart") {
    const clave = boton.dataset.cartKey;
    if (clave) removeFromCart(clave);
  }
});

document.addEventListener("change", event => {
  if (event.target instanceof HTMLInputElement && event.target.matches(".tallas-producto input[type=\"radio\"]")) {
    const producto = event.target.closest(".producto");
    const botonAgregar = producto?.querySelector(".comprar");
    const tallaSeleccionada = producto?.querySelector(".talla-seleccionada");
    if (!botonAgregar || !tallaSeleccionada) return;

    botonAgregar.disabled = false;
    botonAgregar.textContent = "AGREGAR AL CARRITO";
    tallaSeleccionada.textContent = `Talla seleccionada: ${event.target.value}`;
    return;
  }

  if (!(event.target instanceof HTMLSelectElement) || !event.target.matches(".talla-pendiente")) return;

  const claveAnterior = event.target.dataset.cartKey;
  const talla = event.target.value;
  if (!claveAnterior || !tallas.includes(talla)) return;
  const [id] = claveAnterior.split("|");
  const claveNueva = `${id}|${talla}`;
  cart[claveNueva] = (cart[claveNueva] || 0) + cart[claveAnterior];
  delete cart[claveAnterior];
  updateCartUI();
});

function updateCartUI() {
  guardarCarrito();

  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const claves = Object.keys(cart);

  // Carrito vacío
  if (claves.length === 0) {
    cartItems.innerHTML = '<p class="empty-msg">El carrito está vacío</p>';
    totalPrice.innerText = formatear(0);
    return;
  }

  let total = 0;

  cartItems.innerHTML = claves.map(clave => {
    const [id, talla] = clave.split("|");
    const product = products.find(p => p.id == id);
    if (!product) return ""; // por si quedó guardado un producto que ya no existe

    const quantity = cart[clave];
    const subtotal = product.price * quantity;
    total += subtotal;

    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <span>Talla: ${talla || "por seleccionar"}</span>
          ${talla ? "" : `
            <label class="selector-talla">
              Selecciona talla
              <select class="talla-pendiente" data-cart-key="${clave}" aria-label="Selecciona la talla de ${product.name}">
                <option value="">Selecciona una talla</option>
                ${tallas.map(opcion => `<option value="${opcion}">${opcion}</option>`).join("")}
              </select>
            </label>
          `}
          <span>${formatear(product.price)} x ${quantity} = ${formatear(subtotal)}</span>
        </div>
        <div class="quantity-controls">
          <button class="btn-qty" data-action="remove-from-cart" data-cart-key="${clave}" aria-label="Quitar una unidad de ${product.name} talla ${talla || "sin seleccionar"}">-</button>
          <span>${quantity}</span>
          ${talla ? `<button class="btn-qty" data-action="add-to-cart" data-product-id="${product.id}" data-cart-key="${clave}" aria-label="Agregar una unidad de ${product.name} talla ${talla}">+</button>` : ""}
        </div>
      </div>
    `;
  }).join("");

  totalPrice.innerText = formatear(total);
}

// ----- 6. PEDIDO POR WHATSAPP ---------------------------
document.getElementById("btn-checkout").addEventListener("click", () => {
  const claves = Object.keys(cart);

  if (claves.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  if (claves.some(clave => !clave.split("|")[1])) {
    alert("Selecciona la talla de los productos pendientes en el carrito.");
    return;
  }

  let mensaje = "¡Hola! Quisiera realizar el siguiente pedido:\n\n";
  let total = 0;

  claves.forEach(clave => {
    const [id, talla] = clave.split("|");
    const product = products.find(p => p.id == id);
    if (!product) return;

    const quantity = cart[clave];
    const subtotal = product.price * quantity;
    total += subtotal;
    mensaje += `• ${product.name} - Talla ${talla} x${quantity} - ${formatear(subtotal)}\n`;
  });

  mensaje += `\n*Total a pagar: ${formatear(total)}*`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});

// ----- 7. INICIO ----------------------------------------
renderProducts();
updateCartUI();
