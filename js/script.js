// Wholesaler Functions
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const product = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value,
        timestamp: new Date().toISOString()
    };

    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory.push(product);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    alert('Product added!');
    displayInventory();
});

function displayInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const container = document.getElementById('inventoryDisplay');
    
    container.innerHTML = inventory.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.quantity}</p>
        </div>
    `).join('');
}

// Retailer Functions
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    
    const results = inventory.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    displayResults(results);
}

function displayResults(products) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

let cart = [];

function addToCart(productId) {
    const inventory = JSON.parse(localStorage.getItem('inventory'));
    const product = inventory.find(p => p.id === productId);
    
    if(product) {
        cart.push(product);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const container = document.getElementById('cartItems');
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <p>${item.name} - $${item.price}</p>
        </div>
    `).join('');
}

function placeOrder() {
    localStorage.setItem('orders', JSON.stringify(cart));
    alert('Order placed successfully!');
    cart = [];
    updateCartDisplay();
}

// Initialize
if(document.getElementById('inventoryDisplay')) displayInventory();
