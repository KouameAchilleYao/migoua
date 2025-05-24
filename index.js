// En-tête fixe
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fonctionnalités du panier
let cartCount = 0;
const cartCountElement = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const addToCartBtn = document.getElementById('addToCart');
const orderTowhatsapp = document.getElementById("orderTowhatsapp");
const quantityInput = document.getElementById('quantity');
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');
const cartIcon = document.getElementById('cartIcon');

const checkout = document.getElementById("checkout");

function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

function updateCartModal() {
    cartItems.innerHTML = `
        <div class="cart-item">
            <img src="usb.png">
            <div class="cart-item-info">
                <h4>Usb 8 en 1 pro</h4>
                <p>Quantité: ${cartCount}</p>
                <p>Prix: ${cartCount * 13000}F CFA</p>
            </div>
        </div>
    `;
}



addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const quantity = parseInt(quantityInput.value);
    cartCount += quantity;
    updateCartCount();
    updateCartModal();
    cartModal.style.display = 'block';
});

orderTowhatsapp.addEventListener('click', (e) => {
    e.preventDefault();
    const quantity = parseInt(quantityInput.value);
    cartCount += quantity;
    updateCartCount();
    updateCartModal();
    cartModal.style.display = 'block';
});

// Le bouton checkout est maintenant géré par order.js pour ouvrir le formulaire de commande




cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
});

decreaseQuantityBtn.addEventListener('click', () => {
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

increaseQuantityBtn.addEventListener('click', () => {
    if (quantityInput.value < 10) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
});