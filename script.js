document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Running Shoes",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Casual T-Shirt",
      price: 799,
      image:
        "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Analog Watch",
      price: 1599,
      image:
        "https://images.unsplash.com/photo-1659972325161-518bc57f14e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5hbG9nJTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Backpack",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 6,
      name: "Sunglasses",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 7,
      name: "Gaming Mouse",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 8,
      name: "Denim Jacket",
      price: 2199,
      image:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const cart = [];
  const grid = document.getElementById("productGrid");
  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const clearCartBtn = document.getElementById("clearCart");
  const cartPanel = document.getElementById("cartPanel");
  const cartItemsEl = document.getElementById("cartItems");
  const totalQtyEl = document.getElementById("totalQty");
  const totalPriceEl = document.getElementById("totalPrice");
  const cartCountEl = document.getElementById("cartCount");

  function renderProducts() {
    grid.innerHTML = "";
    for (const p of products) {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div class="body">
          <div class="name">${p.name}</div>
          <div class="price">₹${p.price}</div>
          <button class="add" data-id="${p.id}">Add to Cart</button>
        </div>
      `;
      grid.appendChild(card);
    }
  }

  function renderCart() {
    cartItemsEl.innerHTML = "";
    let totalQty = 0,
      totalPrice = 0;
    for (const item of cart) {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <div>${item.name}</div>
          <div>₹${item.price} each</div>
          <div class="qty">
            <button class="dec" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <div>
          <div>₹${item.price * item.qty}</div>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(row);
    }
    totalQtyEl.textContent = totalQty;
    totalPriceEl.textContent = totalPrice;
    cartCountEl.textContent = totalQty;
  }

  function addToCart(id) {
    const product = products.find((p) => p.id === id);
    const existing = cart.find((i) => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    renderCart();
  }

  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      const idx = cart.findIndex((i) => i.id === id);
      cart.splice(idx, 1);
    }
    renderCart();
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add");
    if (btn) addToCart(Number(btn.dataset.id));
  });
  cartItemsEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("inc"))
      changeQty(Number(e.target.dataset.id), 1);
    if (e.target.classList.contains("dec"))
      changeQty(Number(e.target.dataset.id), -1);
    if (e.target.classList.contains("remove")) {
      const id = Number(e.target.dataset.id);
      const idx = cart.findIndex((i) => i.id === id);
      cart.splice(idx, 1);
      renderCart();
    }
  });
  openCartBtn.addEventListener("click", () => cartPanel.classList.add("open"));
  closeCartBtn.addEventListener("click", () =>
    cartPanel.classList.remove("open")
  );
  clearCartBtn.addEventListener("click", () => {
    cart.length = 0;
    renderCart();
  });

  renderProducts();
  renderCart();
});
