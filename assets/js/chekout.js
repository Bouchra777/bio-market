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

        // Responsive handling for window resize
        window.addEventListener("resize", function () {
          if (window.innerWidth > 768) {
            navMenu.classList.remove("active");
          }
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
        // Get the payment option elements
        const creditCardOption = document.getElementById("credit-card-option");
        const paypalOption = document.getElementById("paypal-option");
        const creditCardRadio = document.getElementById("credit-card");
        const paypalRadio = document.getElementById("paypal");

        // Add click event listener for credit card option
        creditCardOption.addEventListener("click", function () {
          creditCardRadio.checked = true;
          creditCardOption.classList.add("selected");
          paypalOption.classList.remove("selected");
        });

        // Add click event listener for PayPal option
        paypalOption.addEventListener("click", function () {
          paypalRadio.checked = true;
          paypalOption.classList.add("selected");
          creditCardOption.classList.remove("selected");
        });

        // Add event listeners for radio buttons too
        creditCardRadio.addEventListener("change", function () {
          if (this.checked) {
            creditCardOption.classList.add("selected");
            paypalOption.classList.remove("selected");
          }
        });

        paypalRadio.addEventListener("change", function () {
          if (this.checked) {
            paypalOption.classList.add("selected");
            creditCardOption.classList.remove("selected");
          }
        });
      });



      document.addEventListener("DOMContentLoaded", function () {
        // Récupérer le panier depuis localStorage
        const cartString = localStorage.getItem("cart");

        if (cartString) {
          const cart = JSON.parse(cartString);

          if (cart.length > 0) {
            // Récupérer le conteneur pour les produits
            const orderSummary = document.querySelector(".order-summary");

            // Garder seulement le titre si présent
            let summaryTitle = orderSummary.querySelector(".summary-title");
            orderSummary.innerHTML = "";
            if (summaryTitle) {
              orderSummary.appendChild(summaryTitle);
            } else {
              // Recréer le titre s'il n'existe pas
              summaryTitle = document.createElement("h2");
              summaryTitle.className = "summary-title";
              summaryTitle.textContent = "Order Summary";
              orderSummary.appendChild(summaryTitle);
            }

            let totalPrice = 0;

            // Ajouter chaque produit à l'order summary
            cart.forEach((item) => {
              // S'assurer que le prix est bien un nombre
              let priceValue;
              if (typeof item.price === "number") {
                priceValue = item.price;
              } else {
                // Extraire le nombre du format "MAD XX.XX"
                priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
              }

              const itemTotal = priceValue * item.quantity;
              totalPrice += itemTotal;

              // Créer l'élément HTML pour le produit
              const productItem = document.createElement("div");
              productItem.className = "product-item";
              productItem.innerHTML = `
          <div class="product-image">
            <img src="${item.image}" alt="${item.name}" class="img">
          </div>
          <div class="product-details">
            <div class="product-name">${item.name} x ${item.quantity}</div>
            <div class="product-meta">${
              item.id || "#" + Math.random().toString(36).substr(2, 8)
            }</div>
          </div>
          <div class="product-price">MAD ${itemTotal.toFixed(2)}</div>
        `;

              orderSummary.appendChild(productItem);
            });

            // Ajouter le total à la fin
            const totalDiv = document.createElement("div");
            totalDiv.innerHTML = `
        <span>Total</span>
        <span class="total">MAD ${totalPrice.toFixed(2)}</span>
      `;
            orderSummary.appendChild(totalDiv);

            // Mettre à jour le compteur dans l'icône du panier
            const cartBtnCounter = document.querySelector(".cart-btn span");
            if (cartBtnCounter) {
              const totalItems = cart.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              cartBtnCounter.textContent = totalItems;
            }
          }
        }
      });


      function addToCart(product) {
        // Récupérer le panier existant ou en créer un nouveau
        let cart = [];
        const cartString = localStorage.getItem("cart");
        if (cartString) {
          cart = JSON.parse(cartString);
        }

        // Vérifier si le produit est déjà dans le panier
        const existingProductIndex = cart.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          // Si le produit existe déjà, augmenter la quantité
          cart[existingProductIndex].quantity += 1;
        } else {
          // Sinon, ajouter le nouveau produit
          cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace(/[^\d.]/g, "")),
            image: product.image,
            quantity: 1,
          });
        }

        // Sauvegarder le panier mis à jour
        localStorage.setItem("cart", JSON.stringify(cart));

        // Mettre à jour l'affichage du panier
        updateCartDisplay();
      }


      
      document.addEventListener("DOMContentLoaded", function () {
        // Retrieve cart data from localStorage
        const cartString = localStorage.getItem("cart");

        if (cartString) {
          const cart = JSON.parse(cartString);

          if (cart.length > 0) {
            // Get the order summary container
            const orderSummary = document.querySelector(".order-summary");

            // Keep only the title if present
            let summaryTitle = orderSummary.querySelector(".summary-title");
            orderSummary.innerHTML = "";

            if (summaryTitle) {
              orderSummary.appendChild(summaryTitle);
            } else {
              // Recreate title if it doesn't exist
              summaryTitle = document.createElement("h2");
              summaryTitle.className = "summary-title";
              summaryTitle.textContent = "Order Summary";
              orderSummary.appendChild(summaryTitle);
            }

            let totalPrice = 0;

            // Add each product to the order summary
            cart.forEach((item) => {
              // Make sure the price is properly handled
              let priceValue;

              if (typeof item.price === "number") {
                priceValue = item.price;
              } else if (typeof item.price === "string") {
                // Extract the number from "MAD XX.XX" format
                priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
              }

              // Important fix: Calculate item total using the unit price
              // and the quantity from the cart
              const itemTotal = priceValue * item.quantity;
              totalPrice += itemTotal;

              // Create HTML element for the product
              const productItem = document.createElement("div");
              productItem.className = "product-item";
              productItem.innerHTML = `
          <div class="product-image">
            <img src="${item.image}" alt="${item.name}" class="img">
          </div>
          <div class="product-details">
            <div class="product-name">${item.name} x ${item.quantity}</div>
            <div class="product-meta">${
              item.id || "#" + Math.random().toString(36).substr(2, 8)
            }</div>
          </div>
          <div class="product-price">MAD ${itemTotal.toFixed(2)}</div>
        `;

              orderSummary.appendChild(productItem);
            });

            // Add the total at the end
            const totalDiv = document.createElement("div");
            totalDiv.innerHTML = `
        <span>Total</span>
        <span class="total">MAD ${totalPrice.toFixed(2)}</span>
      `;
            orderSummary.appendChild(totalDiv);

            // Update counter in cart icon
            const cartBtnCounter = document.querySelector(".cart-btn span");
            if (cartBtnCounter) {
              const totalItems = cart.reduce(
                (sum, item) => sum + item.quantity,
                0
              );
              cartBtnCounter.textContent = totalItems;
            }
          }
        }
      });
