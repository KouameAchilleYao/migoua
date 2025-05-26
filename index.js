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
// Variables globales
const cartCountElement = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const checkout = document.getElementById('checkout');
const orderTowhatsapp = document.getElementById("orderTowhatsapp");
const quantityInput = document.getElementById('quantity');
const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
const increaseQuantityBtn = document.getElementById('increaseQuantity');
const cartIcon = document.getElementById('cartIcon');
const addToCartBtn = document.getElementById('addToCart');

function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

function updateCartModal() {
    cartItems.innerHTML = `
        <div class="cart-item">
            <img src="usb.png">
            <div class="cart-item-info">
                <h4>Usb 8 en 1 pro</h4>
                
                <p>Prix: ${(cartCount * 12000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} FCFA</p>
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


// Compte à rebours - 3 jours à partir de maintenant
const now = new Date();
const launchDate = new Date(now);
launchDate.setDate(now.getDate() + 3);
launchDate.setHours(0, 0, 0, 0);
const countdownElement = document.querySelector(".countdown-blocks");

// Your existing createBlock function
const createBlock = (label, value) => {
	const block = document.createElement("div");
	block.className = "time-block";

	const valueEl = document.createElement("span");
	valueEl.className = "time-value";
	// Add leading zeros for single-digit values
	valueEl.textContent = value < 10 ? `0${value}` : value;

	const labelEl = document.createElement("p");
	labelEl.className = "time-label";
	labelEl.textContent = label;

	// Add pulsing animation to seconds block
	if (label === "Seconds") {
		valueEl.style.animation = "pulse 1s infinite";
	}

	block.appendChild(valueEl);
	block.appendChild(labelEl);
	return block;
};

// Modified updateCountdown function
const updateCountdown = () => {
	const now = new Date();
	const difference = launchDate - now;

	if (difference > 0) {
		const timeLeft = {
			Jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
			Minutes: Math.floor((difference / (1000 * 60)) % 60),
			Secondes: Math.floor((difference / 1000) % 60)
		};

		countdownElement.innerHTML = "";
		for (const [label, value] of Object.entries(timeLeft)) {
			countdownElement.appendChild(createBlock(label, value));
		}
	} else {
		// Gestion de la fin du compte à rebours
		countdownElement.innerHTML = "";
		document.querySelector(".countdown-title").textContent = "C'est le grand jour !";
		document.querySelector(".countdown-description").textContent =
			"Fin de la promotion !";

		const messageBlock = document.createElement("div");
		messageBlock.className = "time-block expired-message";
		messageBlock.style.gridColumn = "1 / -1";
		messageBlock.style.padding = "2rem";
		messageBlock.textContent = "We're live now!";

		countdownElement.appendChild(messageBlock);
		clearInterval(timer);
	}
};

// Initialize and set the interval
updateCountdown();
const timer = setInterval(updateCountdown, 1000);
