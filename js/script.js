// Call this function on page load
document.addEventListener("DOMContentLoaded", updateLoginButton);

// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");

//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan nav

const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Memperbaruhi tombol login dan logout
function updateLoginButton() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginLink = document.getElementById("login-link");

  if (loggedInUser) {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      logoutUser();
    });
  } else {
    loginLink.textContent = "Masuk";
    loginLink.href = "login.html";
  }
}

// Memanggil fungsi updateLoginButton
document.addEventListener("DOMContentLoaded", updateLoginButton);

// logout user
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// fungsi login
function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // mengambil data dari locastorage
  const storedUser = JSON.parse(localStorage.getItem(username));

  // validasi login
  if (storedUser && storedUser.password === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");

    if (username === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    alert("Invalid username or password");
  }
}

// Register user
function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;

  // cek apakah username sudah ada atau belum
  if (localStorage.getItem(username)) {
    alert("User already exists!");
  } else {
    const userData = { username, password, address };
    localStorage.setItem(username, JSON.stringify(userData));
    alert("Registration successful!");
    window.location.href = "login.html";
  }
}

function addToCart(index) {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    alert("Anda harus login terlebih dahulu untuk menambahkan item ke keranjang.");
    window.location.href = "#"; // Redirect ke halaman login
    return;
  }

  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const selectedCard = cards[index];

  // Cari apakah kartu sudah ada di keranjang
  const existingItemIndex = cart.findIndex(item => item.name === selectedCard.name);

  if (existingItemIndex !== -1) {
    // Jika ada, tambahkan jumlahnya
    cart[existingItemIndex].quantity += 1;
  } else {
    // Jika tidak ada, tambahkan kartu ke keranjang
    cart.push({ ...selectedCard, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item berhasil ditambahkan ke keranjang!");
}

function displayMenuCards() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const row = document.querySelector(".row-card");
  row.innerHTML = ""; // Bersihkan konten row

  cards.forEach((card, index) => {
    const cardHTML = `
      <div class="menu-card" data-name="${card.name}">
        <img src="${card.image}" alt="${card.name}" class="menu-card-img" />
        <h3 class="menu-card-title">${card.name}</h3>
        <p class="menu-card-price">IDR ${card.price}</p>
        <p class="menu-card-quantity">Jumlah: ${card.quantity}</p>
        <button class="btn-add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    row.innerHTML += cardHTML;
  });
}

document.addEventListener("DOMContentLoaded", displayMenuCards);

function displayMenuCardsIndex() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  const row2 = document.querySelector(".row-card-2");
  row2.innerHTML = "";
  const limitedCards = cards.slice(0, 4);

  limitedCards.forEach((card, index) => {
    const cardHTML = `
      <div class="menu-card" data-name="${card.name}">
        <img src="${card.image}" alt="${card.name}" class="menu-card-img" />
        <h3 class="menu-card-title">${card.name}</h3>
        <p class="menu-card-price">IDR ${card.price}</p>
        <p class="menu-card-quantity">Jumlah: ${card.quantity}</p>
        <button class="btn-add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    row2.innerHTML += cardHTML;
  });
}

document.addEventListener("DOMContentLoaded", displayMenuCardsIndex);

// modal cart
function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  cartTableBody.innerHTML = ""; // Kosongkan isi tabel terlebih dahulu

  cartItems.forEach((item, index) => {
    const itemTotalPrice = item.price * item.quantity;
    totalPrice += itemTotalPrice;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>IDR ${item.price}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" />
      </td>
      <td>IDR ${itemTotalPrice}</td>
      <td>
        <button onclick="removeFromCart(${index})">Hapus</button>
      </td>
    `;

    cartTableBody.appendChild(row);
  });

  totalPriceElement.textContent = totalPrice;
}

// Fungsi untuk memperbarui jumlah barang di keranjang
function updateQuantity(index, newQuantity) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems[index].quantity = parseInt(newQuantity);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart(); // Refresh tampilan keranjang
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1); // Hapus item dari array
  localStorage.setItem("cart", JSON.stringify(cartItems));
  displayCart(); // Refresh tampilan keranjang
}

//cart fungsi
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceContainer = document.getElementById("total-price");

  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.name}</td>
          <td>IDR ${item.price}</td>
          <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="form-control update-quantity"></td>
          <td>IDR ${itemTotal}</td>
          <td>
              <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Hapus</button>
          </td>
      `;
    cartItemsContainer.appendChild(row);
  });

  totalPriceContainer.textContent = totalPrice;
}

// Fungsi untuk mengupdate jumlah barang
function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Fungsi untuk menghapus barang dari keranjang
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    alert("Berhasil checkout!");
    localStorage.removeItem("cart"); // Hapus barang dari keranjang
    displayCart(); // Refresh tampilan keranjang
  } else {
    alert("Keranjang Anda kosong!");
  }
}

// Event Listener untuk perubahan jumlah barang
document.addEventListener("input", function (event) {
  if (event.target.classList.contains("update-quantity")) {
    const index = event.target.getAttribute("data-index");
    const newQuantity = parseInt(event.target.value, 10);
    updateQuantity(index, newQuantity);
  }
});

// Event Listener untuk tombol hapus barang
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
    const index = event.target.getAttribute("data-index");
    removeItem(index);
  }
});

// Event Listener untuk tombol checkout
document.getElementById("checkout-btn").addEventListener("click", checkoutCart);

// Panggil fungsi displayCart saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayCart);
