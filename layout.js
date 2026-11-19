
const STORE_WHATSAPP = "2349128008647";

// Add your real social media links here
const SOCIAL_LINKS = {
    whatsapp: "https://234 9132699110/" + STORE_WHATSAPP,
    instagram: "https://instagram.com/FOLABABYESSENTIAL",
    tiktok: "https://tiktok.com/@FOLABABYESSENTIAL001",
    telegram: "https://t.me/FOLABABYESSENTIAL001"
};

// PRODUCTS
// Replace sample products and prices with your real inventory.

const products = [
    {
        id: 1,
        name: "Newborn Baby Clothing Set",
        price: 12000,
        category: "Clothing",
        image: "https://images.images/dressjpeg.jpg"
    },
    {
        id: 2,
        name: "Baby Feeding Bottle",
        price: 5500,
        category: "Feeding",
        image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=600"
    },
    {
        id: 3,
        name: "Baby Care Essentials",
        price: 8500,
        category: "Care",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"
    },
    {
        id: 4,
        name: "Baby Gift Hamper",
        price: 25000,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600"
    },
    {
        id: 5,
        name: "Cute Baby Outfit",
        price: 9500,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"
    },
    {
        id: 6,
        name: "Baby Feeding Accessories",
        price: 7000,
        category: "Feeding",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600"
    },
    {
        id: 7,
        name: "Baby Bath Essentials",
        price: 11000,
        category: "Care",
        image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600"
    },
    {
        id: 8,
        name: "Baby Accessories Set",
        price: 6500,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600"
    }
];

// SHOPPING CART
let cart = [];
let currentOrder = null;

// CURRENCY FORMAT
function formatPrice(amount) {
    return "₦" + amount.toLocaleString("en-NG");
}

// DISPLAY PRODUCTS
function displayProducts(category = "All") {
    const grid = document.getElementById("productGrid");

    const filteredProducts = category === "All"
        ? products
        : products.filter(product => product.category === category);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="add-button" onclick="addToCart(${product.id})">
                    Add to Cart +
                </button>
            </div>
        </div>
    `).join("");
}

// FILTER PRODUCTS
function filterProducts(category, button) {
    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");
    displayProducts(category);
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " has been added to your cart! ❤️");
}

// UPDATE CART
function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cartCount").textContent = count;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some lovely baby essentials!</p>
            </div>
        `;

        document.getElementById("cartTotal").textContent = formatPrice(0);
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>${formatPrice(item.price)} × ${item.quantity}</p>
            </div>

            <div>
                <strong>${formatPrice(item.price * item.quantity)}</strong>
                <br>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cartTotal").textContent = formatPrice(total);
}

// CHANGE QUANTITY
function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}

// REMOVE PRODUCT
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// OPEN AND CLOSE CART
function toggleCart() {
    document.getElementById("cartOverlay").classList.toggle("show");
}

function closeCart(event) {
    if (event.target.id === "cartOverlay") {
        toggleCart();
    }
}

// CHECKOUT
function openCheckout() {
    if (cart.length === 0) {
        alert("Please add products to your cart first.");
        return;
    }

    document.getElementById("cartOverlay").classList.remove("show");
    document.getElementById("checkoutOverlay").classList.add("show");
}

function closeCheckout() {
    document.getElementById("checkoutOverlay").classList.remove("show");
}

// PLACE ORDER AND GENERATE RECEIPT
document.getElementById("checkoutForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!name || !phone || !address || !payment) {
        alert("Please complete all the required fields.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const orderNumber = "FOLA-" + Date.now().toString().slice(-8);

    const order = {
        orderNumber,
        name,
        phone,
        address,
        payment,
        items: cart.map(item => ({ ...item })),
        total,
        date: new Date().toLocaleString("en-NG"),
        status: payment === "Bank Transfer"
            ? "Awaiting payment confirmation"
            : "Payment due on delivery"
    };

    currentOrder = order;

    // Save order on this browser for demonstration purposes.
    const savedOrders = JSON.parse(
        localStorage.getItem("folaOrders") || "[]"
    );

    savedOrders.push(order);

    localStorage.setItem("folaOrders", JSON.stringify(savedOrders));

    generateReceipt(order);

    cart = [];
    updateCart();

    document.getElementById("checkoutForm").reset();
    closeCheckout();

    document.getElementById("receiptOverlay").classList.add("show");

    alert("Thank you, " + name + "! Your order has been received. ❤️");
});

// GENERATE CUSTOMER RECEIPT
function generateReceipt(order) {
    const details = document.getElementById("receiptDetails");

    const itemsHTML = order.items.map(item => `
        <div class="receipt-row">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
    `).join("");

    details.innerHTML = `
        <div class="receipt-details">

            <div class="receipt-row">
                <span>Receipt / Order No.</span>
                <strong>${order.orderNumber}</strong>
            </div>

            <div class="receipt-row">
                <span>Customer</span>
                <strong>${escapeHTML(order.name)}</strong>
            </div>

            <div class="receipt-row">
                <span>Phone</span>
                <strong>${escapeHTML(order.phone)}</strong>
            </div>

            <div class="receipt-row">
                <span>Date</span>
                <strong>${order.date}</strong>
            </div>

            <div class="receipt-row">
                <span>Payment Method</span>
                <strong>${order.payment}</strong>
            </div>

            <div class="receipt-row">
                <span>Payment Status</span>
                <strong>${order.status}</strong>
            </div>

            <div class="receipt-row">
                <span>Delivery Address</span>
                <strong>${escapeHTML(order.address)}</strong>
            </div>

            <div class="receipt-items">
                <h3>Order Details</h3>
                ${itemsHTML}
            </div>

            <div class="receipt-row">
                <strong>TOTAL</strong>
                <strong>${formatPrice(order.total)}</strong>
            </div>

        </div>
    `;
}

// BASIC HTML ESCAPING FOR CUSTOMER DETAILS
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// PRINT OR SAVE RECEIPT AS PDF
function printReceipt() {
    if (!currentOrder) return;
    window.print();
}

// SEND ORDER TO WHATSAPP
function sendOrderWhatsApp() {
    if (!currentOrder) return;

    const order = currentOrder;

    const itemDetails = order.items.map(item =>
        `${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    ).join("\n");

    const message = `
Hello FOLABABYESSENTIAL ❤️

I have placed an order.

Order Number: ${order.orderNumber}
Customer: ${order.name}
Phone: ${order.phone}

Products:
${itemDetails}

Total: ${formatPrice(order.total)}
Payment Method: ${order.payment}
Payment Status: ${order.status}

Delivery Address: ${order.address}

Thank you!
    `;

    window.open(
        "https://wa.me/" + STORE_WHATSAPP + "?text=" + encodeURIComponent(message),
        "_blank"
    );
}

// CLOSE RECEIPT
function closeReceipt() {
    document.getElementById("receiptOverlay").classList.remove("show");
}

// MOBILE MENU
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("open");
}

// SOCIAL MEDIA LINKS
document.getElementById("whatsappLink").href = SOCIAL_LINKS.whatsapp;
document.getElementById("instagramLink").href = SOCIAL_LINKS.instagram;
document.getElementById("tiktokLink").href = SOCIAL_LINKS.tiktok;
document.getElementById("telegramLink").href = SOCIAL_LINKS.telegram;

// INITIALIZE WEBSITE
displayProducts();
updateCart();

console.log("FOLABABYESSENTIAL website loaded successfully ❤️");