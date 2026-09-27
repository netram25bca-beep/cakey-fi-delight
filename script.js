// Cakey Fi Delight - Cart System

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    { id: 1, name: "Chocolate Cake", price: 800 },
    { id: 2, name: "Vanilla Cake", price: 800 },
    { id: 3, name: "Simple Dream Cake", price: 600 },
    { id: 4, name: "Chocolate Dream Cake", price: 700 },
    { id: 5, name: "Nutella Dream Cake", price: 750 },
    { id: 6, name: "Ganache Cake", price: 700 },
    { id: 7, name: "Cupcake", price: 20 },
    { id: 8, name: "Simple Chocolate", price: 10 },
    { id: 9, name: "Dry Fruit Chocolate", price: 15 }
];


// ================= ADD TO CART =================

function addToCart(productId) {

    let product = products.find(p => p.id === productId);

    if (!product) {
        alert("Product not found!");
        return;
    }

    let existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart! 🎂");

    displayCart();
}


// ================= REMOVE FROM CART =================

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// ================= CALCULATE TOTAL =================

function getTotal() {

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    return total;
}


// ================= DISPLAY CART =================

function displayCart() {

    const cartBox = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartBox) return;

    // Empty cart
    if (cart.length === 0) {

        cartBox.innerHTML = "<h3>Your cart is empty 🛒</h3>";

        if (cartTotal) {
            cartTotal.innerText = "0";
        }

        return;
    }

    cartBox.innerHTML = "";

    cart.forEach(item => {

        cartBox.innerHTML += `
            <div>
                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>
                    Subtotal: ₹${item.price * item.quantity}
                </p>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>

            <hr>
        `;
    });

    // FIX: Update Cart Total
    if (cartTotal) {
        cartTotal.innerText = getTotal();
    }
}


// ================= DEMO PAYMENT =================

function showPayment() {

    const total = getTotal();

    if (total <= 0) {
        alert("Please add items to cart first.");
        return;
    }

    const paymentBox = document.getElementById("paymentBox");
    const paymentAmount = document.getElementById("paymentAmount");

    if (!paymentBox || !paymentAmount) {
        alert("Payment section not found.");
        return;
    }

    // Show correct payment amount
    paymentAmount.innerText = "₹" + total;

    // Show payment section
    paymentBox.style.display = "block";

    // Smoothly scroll to payment section
    setTimeout(() => {
        paymentBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 100);
}


// ================= COMPLETE DEMO PAYMENT =================

function completeDemoPayment() {

    const total = getTotal();

    if (total <= 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Demo Payment Successful! ✅\n\n" +
        "Amount Paid: ₹" + total +
        "\n\nThis is a college project demo payment."
    );

    // Clear cart after successful demo payment
    cart = [];

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    // Update cart on screen
    displayCart();

    // Hide payment section
    const paymentBox = document.getElementById("paymentBox");

    if (paymentBox) {
        paymentBox.style.display = "none";
    }
}


// ================= PAGE LOAD =================

// Show saved cart when page opens
displayCart();