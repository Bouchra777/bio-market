
      document.addEventListener("DOMContentLoaded", function () {
        // Add hamburger menu button to the header
        const header = document.querySelector("header");
        const navMenu = document.querySelector(".nav-menu");

        // Create the menu toggle button
        const menuToggle = document.createElement("button");
        menuToggle.className = "menu-toggle";
        menuToggle.innerHTML = "☰";
        header.appendChild(menuToggle);

        // Toggle menu when hamburger is clicked
        menuToggle.addEventListener("click", function () {
          navMenu.classList.toggle("active");
        });

        // Close menu when clicking elsewhere
        document.addEventListener("click", function (event) {
          if (!header.contains(event.target)) {
            navMenu.classList.remove("active");
          }
        });

        // Cart functionality
        const decreaseBtn = document.querySelector(".quantity-btn-decrease");
        const increaseBtn = document.querySelector(".quantity-btn-increase");
        const quantityDisplay = document.querySelector(".quantity");
        const removeBtn = document.querySelector(".remove-btn");
        const itemPrice = document.querySelector(".item-price");
        const subtotalPrice = document.querySelector(".summary-row .price");

        // Initial values
        let quantity = 1;
        const unitPrice = 60.0; // MAD per item

        // Update price display based on quantity
        function updatePrices() {
          const total = unitPrice * quantity;
          itemPrice.textContent = `MAD ${total.toFixed(2)}`;
          subtotalPrice.textContent = `MAD ${total.toFixed(2)}`;
        }

        // Increase quantity
        increaseBtn.addEventListener("click", function () {
          quantity++;
          quantityDisplay.textContent = quantity;
          updatePrices();
        });

        // Decrease quantity
        decreaseBtn.addEventListener("click", function () {
          if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updatePrices();
          }
        });

        // Remove item
        removeBtn.addEventListener("click", function () {
          const cartItem = this.closest(".cart-item");
          cartItem.style.opacity = "0";
          setTimeout(() => {
            cartItem.remove();
            // Update cart to show empty state
            document.querySelector(".cart-page").innerHTML =
              '<p class="empty-cart">Your cart is empty</p>';
          }, 300);
        });
      });

        // CART PAGE WITH ITEMS: Handle the remove button functionality
        const removeBtn = document.querySelector(".remove-btn");
        if (removeBtn) {
          removeBtn.addEventListener("click", function () {
            const cartItem = this.closest(".cart-item");
            cartItem.style.opacity = "0";
            setTimeout(() => {
              // Instead of modifying the DOM, redirect to empty cart page
              window.location.href = "empty-cart.html";
            }, 300);
          });
        }

        // EMPTY CART PAGE: Handle the "View all Products" button
        const viewProductsBtn = document.querySelector(".view-products-btn");
        if (viewProductsBtn) {
          viewProductsBtn.addEventListener("click", function () {
            // Redirect to products page or cart with items page
            window.location.href = "cart-with-items.html";
          });
        }

        // Update cart count in header when items are added/removed
        function updateCartCount(count) {
          const cartCountElement = document.querySelector(".cart-btn span");
          if (cartCountElement) {
            cartCountElement.textContent = count;
          }
        }

        // CART PAGE WITH ITEMS: Handle quantity changes
        const decreaseBtn = document.querySelector(".quantity-btn-decrease");
        const increaseBtn = document.querySelector(".quantity-btn-increase");
        const quantityDisplay = document.querySelector(".quantity");

        if (decreaseBtn && increaseBtn && quantityDisplay) {
          let quantity = parseInt(quantityDisplay.textContent) || 1;
          const unitPrice = 60.0; // MAD per item

          // Update price display based on quantity
          function updatePrices() {
            const total = unitPrice * quantity;
            const itemPrice = document.querySelector(".item-price");
            const subtotalPrice = document.querySelector(".summary-row .price");

            if (itemPrice) itemPrice.textContent = `MAD ${total.toFixed(2)}`;
            if (subtotalPrice)
              subtotalPrice.textContent = `MAD ${total.toFixed(2)}`;

            // Update cart icon count too
            updateCartCount(quantity);
          }

          // Increase quantity
          increaseBtn.addEventListener("click", function () {
            quantity++;
            quantityDisplay.textContent = quantity;
            updatePrices();
          });

          // Decrease quantity (and redirect if reaches 0)
          decreaseBtn.addEventListener("click", function () {
            if (quantity > 1) {
              quantity--;
              quantityDisplay.textContent = quantity;
              updatePrices();
            } else {
              // If quantity would go to 0, redirect to empty cart
              window.location.href = "empty-cart.html";
            }
          });

          // Initialize prices on page load
          updatePrices();
        }

        // CART BUTTON: Make cart button navigate between pages
        const cartBtn = document.querySelector(".cart-btn");
        if (cartBtn) {
          cartBtn.addEventListener("click", function () {
            // Check if we're on empty cart page or cart page
            const isEmptyCartPage = document.querySelector(
              ".empty-cart-container"
            );

            if (isEmptyCartPage) {
              window.location.href = "cart-with-items.html";
            } else {
              window.location.href = "empty-cart.html";
            }
          });
        }

      document.addEventListener("DOMContentLoaded", function () {
        // Références aux conteneurs des deux états du panier
        const cartWithItemsContainer = document.querySelector(".cart-page");
        const emptyCartContainer = document.querySelector(
          ".empty-cart-container"
        );

        // Si les deux conteneurs n'existent pas, nous devons les créer
        if (!emptyCartContainer) {
          // Créer le conteneur pour le panier vide
          const emptyCartHTML = `
      <div class="empty-cart-container" style="display: none;">
        <div class="cart-icon">
          <img src="./emptycard.png" alt="Empty Cart" />
        </div>
        <h2 class="empty-cart-title">Cart is empty</h2>
        <p class="empty-cart-message">Add some item to the cart</p>
        <button class="view-products-btn">View all Products</button>
      </div>
    `;

          // Insérer le HTML du panier vide après le conteneur du panier avec articles
          cartWithItemsContainer.insertAdjacentHTML("afterend", emptyCartHTML);
        }

        // Obtenir une référence au conteneur du panier vide (qu'il soit original ou nouvellement créé)
        const updatedEmptyCartContainer = document.querySelector(
          ".empty-cart-container"
        );

        // Fonction pour basculer entre les deux états du panier
        function toggleCartState(isEmpty) {
          if (isEmpty) {
            // Masquer le panier avec articles et afficher le panier vide
            if (cartWithItemsContainer)
              cartWithItemsContainer.style.display = "none";
            if (updatedEmptyCartContainer)
              updatedEmptyCartContainer.style.display = "flex";

            // Mettre à jour l'indicateur de quantité dans le bouton du panier en haut
            const cartCountElement = document.querySelector(".cart-btn span");
            if (cartCountElement) cartCountElement.textContent = "0";
          } else {
            // Afficher le panier avec articles et masquer le panier vide
            if (cartWithItemsContainer)
              cartWithItemsContainer.style.display = "block";
            if (updatedEmptyCartContainer)
              updatedEmptyCartContainer.style.display = "none";

            // Mettre à jour l'indicateur de quantité dans le bouton du panier en haut
            const cartCountElement = document.querySelector(".cart-btn span");
            if (cartCountElement) cartCountElement.textContent = "1";
          }
        }

        // Initialiser l'état du panier au chargement de la page
        // Si le panier contient des articles (vérifier si l'élément .cart-item existe)
        const hasItems = document.querySelector(".cart-item") !== null;
        toggleCartState(!hasItems);

        // Gestion du bouton de suppression d'un article
        const removeBtn = document.querySelector(".remove-btn");
        if (removeBtn) {
          removeBtn.addEventListener("click", function () {
            const cartItem = this.closest(".cart-item");
            cartItem.style.opacity = "0";

            // Après l'animation de fade-out, basculer vers le panier vide
            setTimeout(() => {
              toggleCartState(true);
            }, 300);
          });
        }

        // Gestion du bouton "View all Products" pour revenir au panier avec articles
        const viewProductsBtn = document.querySelector(".view-products-btn");
        if (viewProductsBtn) {
          viewProductsBtn.addEventListener("click", function () {
            toggleCartState(false);
          });
        }

        // Gestion des boutons de quantité
        const decreaseBtn = document.querySelector(".quantity-btn-decrease");
        const increaseBtn = document.querySelector(".quantity-btn-increase");
        const quantityDisplay = document.querySelector(".quantity");

        if (decreaseBtn && increaseBtn && quantityDisplay) {
          let quantity = parseInt(quantityDisplay.textContent) || 1;
          const unitPrice = 60.0; // MAD par article

          // Mise à jour des prix en fonction de la quantité
          function updatePrices() {
            const total = unitPrice * quantity;
            const itemPrice = document.querySelector(".item-price");
            const subtotalPrice = document.querySelector(".summary-row .price");

            if (itemPrice) itemPrice.textContent = `MAD ${total.toFixed(2)}`;
            if (subtotalPrice)
              subtotalPrice.textContent = `MAD ${total.toFixed(2)}`;

            // Mise à jour du compteur dans l'icône du panier
            const cartCountElement = document.querySelector(".cart-btn span");
            if (cartCountElement) cartCountElement.textContent = quantity;
          }

          // Augmenter la quantité
          increaseBtn.addEventListener("click", function () {
            quantity++;
            quantityDisplay.textContent = quantity;
            updatePrices();
          });

          // Diminuer la quantité (et afficher le panier vide si elle atteint 0)
          decreaseBtn.addEventListener("click", function () {
            if (quantity > 1) {
              quantity--;
              quantityDisplay.textContent = quantity;
              updatePrices();
            } else {
              // Si la quantité atteint 0, basculer vers le panier vide
              toggleCartState(true);
            }
          });
        }

        // Gestion du bouton panier dans l'en-tête
        const cartBtn = document.querySelector(".cart-btn");
        if (cartBtn) {
          cartBtn.addEventListener("click", function () {
            // Vérifier si le panier est actuellement vide en examinant l'état d'affichage
            const isCurrentlyEmpty =
              updatedEmptyCartContainer &&
              window.getComputedStyle(updatedEmptyCartContainer).display !==
                "none";

            // Basculer vers l'état opposé
            toggleCartState(!isCurrentlyEmpty);
          });
        }
      });

      document.addEventListener("DOMContentLoaded", function () {
        // Cart functionality
        const decreaseBtn = document.querySelector(".quantity-btn-decrease");
        const increaseBtn = document.querySelector(".quantity-btn-increase");
        const quantityDisplay = document.querySelector(".quantity");
        const removeBtn = document.querySelector(".remove-btn");
        const itemPrice = document.querySelector(".item-price");
        const subtotalPrice = document.querySelector(".summary-row .price");
        const checkoutBtn = document.querySelector(".checkout-btn");

        // Initial values
        let quantity = parseInt(quantityDisplay.textContent) || 1;
        const unitPrice = 60.0; // MAD per item - this is your base price

        // Update price display based on quantity
        function updatePrices() {
          const total = unitPrice * quantity;
          itemPrice.textContent = `MAD ${total.toFixed(2)}`;
          subtotalPrice.textContent = `MAD ${total.toFixed(2)}`;

          // Update cart count in header
          const cartCountElement = document.querySelector(".cart-btn span");
          if (cartCountElement) {
            cartCountElement.textContent = quantity;
          }
        }

        // Increase quantity
        if (increaseBtn) {
          increaseBtn.addEventListener("click", function () {
            quantity++;
            quantityDisplay.textContent = quantity;
            updatePrices();
          });
        }

        // Decrease quantity
        if (decreaseBtn) {
          decreaseBtn.addEventListener("click", function () {
            if (quantity > 1) {
              quantity--;
              quantityDisplay.textContent = quantity;
              updatePrices();
            }
          });
        }

        // Remove item
        if (removeBtn) {
          removeBtn.addEventListener("click", function () {
            const cartItem = this.closest(".cart-item");
            cartItem.style.opacity = "0";
            setTimeout(() => {
              cartItem.remove();
              // Update cart to show empty state
              document.querySelector(".cart-page").innerHTML =
                '<p class="empty-cart">Your cart is empty</p>';
              // Clear the cart in localStorage
              localStorage.removeItem("cart");
            }, 300);
          });
        }

        // Checkout button - properly save cart data
        if (checkoutBtn) {
          checkoutBtn.addEventListener("click", function () {
            // Get current cart data
            let cart = [];

            // Get the product information from the current page
            const productName =
              document.querySelector(".item-details h3").textContent;
            const productId =
              document.querySelector(".item-details p").textContent;
            const productImage = document.querySelector(".item-image img").src;

            // Create cart item with proper price structure
            cart.push({
              name: productName,
              id: productId,
              quantity: quantity, // Current quantity
              price: unitPrice, // Store the UNIT price, not the total
              image: productImage,
            });

            // Save cart to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Redirect to checkout page
            window.location.href = "./1.html";
          });
        }
      });
