// THELMA.PT — comportamentos de interface (menu mobile, catálogo, carrinho)

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initYear();
  if (document.getElementById("featured-products")) {
    renderProducts("featured-products", PRODUCTS.slice(0, 4));
  }
  if (document.getElementById("shop-products")) {
    initShopPage();
  }
  initNewsletterForm();
});

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

function productCardHTML(product) {
  const imageContent = product.image
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<span>Foto em breve</span>`;

  return `
    <article class="product-card">
      <div class="product-image">${imageContent}</div>
      <span class="product-category">${CATEGORY_LABELS[product.category] || product.category}</span>
      <h4>${product.name}</h4>
      <p class="product-price">${formatPrice(product.price)}</p>
      <button
        class="add-to-cart snipcart-add-item"
        data-item-id="${product.id}"
        data-item-name="${product.name}"
        data-item-price="${product.price}"
        data-item-url="/loja.html"
        data-item-description="${product.description}"
        data-item-image="${product.image || ""}"
      >
        Adicionar ao carrinho
      </button>
    </article>
  `;
}

function renderProducts(containerId, products) {
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(productCardHTML).join("");
}

function initShopPage() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  renderProducts("shop-products", PRODUCTS);

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
