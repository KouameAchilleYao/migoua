document.addEventListener('DOMContentLoaded', function() {
    const orderModal = document.getElementById('orderModal');
    const orderForm = document.getElementById('orderForm');
    const checkoutButton = document.getElementById('checkout');
    const closeModal = document.querySelector('.close-modal');
    const modalContent = document.querySelector('.modal-content');
    const quantityInput = document.getElementById('quantity');

    // Fonction pour ouvrir le modal
    function openModal() {
        orderModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fonction pour fermer le modal
    function closeModalFunc() {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Afficher le modal quand on clique sur le bouton checkout
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Fonction générique de confirmation et fermeture
    function confirmAndCloseModal() {
        Swal.fire({
            title: 'Annuler la commande',
            text: 'Voulez-vous vraiment annuler votre commande ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c3e50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, annuler',
            cancelButtonText: 'Non, continuer'
        }).then((result) => {
            if (result.isConfirmed) {
                closeModalFunc();
            }
        });
    }

    // Gestion de la fermeture avec la croix
    closeModal.onclick = function(e) {
        e.preventDefault();
        confirmAndCloseModal();
    };

    // Gestion du clic en dehors du modal
    orderModal.onclick = function(e) {
        if (e.target === orderModal) {
            confirmAndCloseModal();
        }
    };

    // Empêcher la fermeture quand on clique sur le contenu du modal
    if (modalContent) {
        modalContent.onclick = function(e) {
            e.stopPropagation();
        };
    }
    


    // Gestion de la soumission du formulaire
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const quantity = parseInt(formData.get('quantity')) || 1;
        const totalPrice = quantity * 13000;

        // Désactiver le bouton de soumission
        const submitButton = orderForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Redirection...';

        try {
            // Récupération et validation des champs
            const name = (formData.get('name') || '').toString().trim();
            const email = (formData.get('email') || '').toString().trim();
            const address = (formData.get('address') || '').toString().trim();

            // Validation des champs obligatoires
            if (!name) throw new Error('Le nom est requis');
            if (!email) throw new Error('L\'email est requis');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Veuillez entrer une adresse email valide');
            }
            if (!address) throw new Error('L\'adresse est requise');

            // Message pour WhatsApp
            const message = `Nouvelle commande !%0A%0A` +
                           `*Nom*: ${name}%0A` +
                           `*Email*: ${email}%0A` +
                           `*Adresse*: ${address}%0A` +
                           `*Quantité*: ${quantity}%0A` +
                           `*Prix total*: ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;

            // Réinitialiser le formulaire
            orderForm.reset();
            orderModal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Redirection vers WhatsApp
            window.open(`https://wa.me/2250703946623?text=${message}`, '_blank');
            
        } catch (error) {
            console.error('Erreur:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: error.message || 'Une erreur est survenue lors de la préparation de la commande.'
            });
        } finally {
            // Réactiver le bouton dans tous les cas
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Mettre à jour le prix total dynamiquement
    const orderTotal = document.getElementById('orderTotal');
    const PRIX_UNITAIRE = 13000;
    function updateTotal() {
        const quantity = parseInt(quantityInput.value) || 1;
        orderTotal.textContent = (quantity * PRIX_UNITAIRE).toLocaleString();
    }
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            let quantity = parseInt(quantityInput.value) || 1;
            quantity = Math.max(1, quantity);
            quantityInput.value = quantity;
            updateTotal();
        });
        // Mise à jour initiale au chargement
        updateTotal();
    }
});
