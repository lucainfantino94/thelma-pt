// THELMA.PT — comportamentos de interface (menu mobile, catálogo, carrinho)

const CATEGORY_LABELS = {
  roupas: "Roupas",
  bijuteria: "Bijuteria",
  sacos: "Sacos & Acessórios",
  cintos: "Cintos"
};

// Catálogo gerido através do CMS em /admin (ver data/products.json)
let PRODUCTS = [];

document.addEventListener("DOMContentLoaded", async () => {
  initMobileNav();
  initYear();
  initNewsletterForm();
  await loadProducts();

  if (document.getElementById("featured-products")) {
    const featured = PRODUCTS.filter((p) => p.featured);
    renderProducts("featured-products", (featured.length ? featured : PRODUCTS).slice(0, 4));
  }
  if (document.getElementById("shop-products")) {
    initShopPage();
  }
});

async function loadProducts() {
  try {
    const response = await fetch("data/products.json");
    const data = await response.json();
    PRODUCTS = Array.isArray(data.products) ? data.products : [];
  } catch (err) {
    console.error("Não foi possível carregar o catálogo de produtos.", err);
    PRODUCTS = [];
  }
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-nav");
  const close = document.querySelector(".mobile-nav-close");
  if (!toggle || !drawer) return;
  toggle.addEventListener("click", () => drawer.classList.add("open"));
  close.addEventListener("click", () => drawer.classList.remove("open"));
  drawer.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => drawer.classList.remove("open"))
  );
}

function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function formatPrice(value) {
  return value.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function productCardHTML(product) {
  const name = escapeHtml(product.name);
  const description = escapeHtml(product.description);
  const image = escapeHtml(product.image || "");
  const id = escapeHtml(product.id);
  const outOfStock = product.stock === false;
  const imageContent = product.image
    ? `<img src="${image}" alt="${name}">`
    : `<span>Foto em breve</span>`;

  return `
    <article class="product-card" id="produto-${id}">
      <div class="product-image">${imageContent}</div>
      <span class="product-category">${escapeHtml(CATEGORY_LABELS[product.category] || product.category)}</span>
      <h4>${name}</h4>
      <p class="product-price">${formatPrice(product.price)}</p>
      <button
        class="add-to-cart snipcart-add-item${outOfStock ? " out-of-stock" : ""}"
        ${outOfStock ? "disabled" : ""}
        data-item-id="${id}"
        data-item-name="${name}"
        data-item-price="${product.price}"
        data-item-url="/loja.html"
        data-item-description="${description}"
        data-item-image="${image}"
      >
        ${outOfStock ? "Esgotado" : "Adicionar ao carrinho"}
      </button>
    </article>
  `;
}

function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(productCardHTML).join("");
}

function scrollToHashProduct() {
  if (!location.hash) return;
  const el = document.querySelector(location.hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("highlight");
  setTimeout(() => el.classList.remove("highlight"), 1600);
}

function initShopPage() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  renderProducts("shop-products", PRODUCTS);
  scrollToHashProduct();

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.category;
      const filtered =
        category === "todos"
          ? PRODUCTS
          : PRODUCTS.filter((p) => p.category === category);
      renderProducts("shop-products", filtered);
    });
  });
}

function initNewsletterForm() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (input.value) {
      form.innerHTML = `<p style="padding:14px; margin:0; letter-spacing:0.05em;">Obrigada! Vamos manter-te a par das novidades.</p>`;
    }
  });
}
