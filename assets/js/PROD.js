// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
      {
        id: 1,
        name: "6 Fresh and Tasty Eggs",
        price: 20.00,
        image: "assets/img/eggs.png"
      },
      {
        id: 2,
        name: "BABY MARROW SPAGHETTI",
        price: 35.00,
        image: "assets/img/spaghetti.png"
      },
      {
        id: 3,
        name: "Olive Oil EXTRA VIRGIN",
        price: 90.00,
        image: "assets/img/oil.png"
      },
      {
        id: 4,
        name: "FULL FAT SOFT ASIAN CHEESE",
        price: 50.00,
        image: "assets/img/cheese.png"
      },
      {
        id: 5,
        name: "Ajwah Dates",
        price: 100.00,
        image: "assets/img/dates.png"
      },
      {
        id: 6,
        name: "Anchor Butter",
        price: 70.00,
        image: "assets/img/butter.png"
      },
      {
        id: 7,
        name: "HASBAL Honey",
        price: 200.00,
        image: "assets/img/honey.png"
      },
      {
        id: 8,
        name: "Arya Ayoeklezegi",
        price: 35.00,
        image: "assets/img/cocktail.png"
      },
      {
        id: 9,
        name: "Arya Ayoeklezegi Small",
        price: 20.00,
        image: "assets/img/pineapple.png"
      }
    ];
  
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('biolife-cart')) || [];
    updateCartCount();
  
    // Generate products on the page
    generateProducts();
  
    // Bind event listeners
    bindEvents();
  
    // Filter functionality
    initializeFilters();
  
    // Price slider functionality
    initializePriceSlider();
  
    // Set up sort functionality
    initializeSort();
  
    // Function to generate product cards
    function generateProducts() {
      const productsGrid = document.querySelector('.products-grid');
      if (!productsGrid) return;
  
      // Clear existing products
      productsGrid.innerHTML = '';
  
      // Filter products based on current filters (can be expanded later)
      let filteredProducts = [...products];
  
      // Get current price filter
      const priceSlider = document.getElementById('price-slider');
      const maxPrice = priceSlider ? priceSlider.value : 1000;
  
      // Apply price filter
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  
      // Apply active brand filters if any
      const activeBrands = Array.from(document.querySelectorAll('.brand-tags .tag.active'))
        .map(tag => tag.textContent.trim());
      
      if (activeBrands.length > 0) {
        // This is placeholder logic since we don't have brand info in our data
        // In a real app, you'd filter by brand here
      }
  
      // Apply active category filters if any
      const activeCategories = Array.from(document.querySelectorAll('.category-tags .tag.active'))
        .map(tag => tag.textContent.trim());
      
      if (activeCategories.length > 0) {
        // This is placeholder logic since we don't have category info in our data
        // In a real app, you'd filter by category here
      }
  
      // Get sort option
      const sortSelect = document.getElementById('sort-select');
      if (sortSelect) {
        const sortValue = sortSelect.value;
        
        switch(sortValue) {
          case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // Default sorting (by id)
            filteredProducts.sort((a, b) => a.id - b.id);
        }
      }
  
      // Create product cards
      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-img">
          </div>
          <div class="product-details">
            <div class="product-price-tag">MAD ${product.price.toFixed(2)}</div>
            <h3 class="product-name">${product.name}</h3>
            <button class="add-to-cart-button" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
              </svg>
            </button>
          </div>
        `;
        productsGrid.appendChild(productCard);
      });
    }
  
    // Function to bind events
    function bindEvents() {
      // Add to cart button click
      document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart-button')) {
          const button = e.target.closest('.add-to-cart-button');
          const productId = parseInt(button.dataset.id);
          addToCart(productId);
        }
      });
  
      // Tag click for filtering
      document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tag')) {
          e.target.classList.toggle('active');
          generateProducts(); // Regenerate products with new filter
        }
      });
  
      // Sort change
      const sortSelect = document.getElementById('sort-select');
      if (sortSelect) {
        sortSelect.addEventListener('change', function() {
          generateProducts();
        });
      }
    }
  
    // Function to add product to cart
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (!product) return;
  
      // Check if product already in cart
      const existingProduct = cart.find(item => item.id === productId);
      
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
  
      // Save cart to localStorage
      localStorage.setItem('biolife-cart', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Show notification
      showNotification(product);
    }
  
    // Function to update cart count
    function updateCartCount() {
      const cartCount = document.getElementById('cart-count');
      if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
      }
    }
  
    // Function to show notification
    function showNotification(product) {
      // Remove any existing notification
      const existingNotification = document.querySelector('.notification');
      if (existingNotification) {
        existingNotification.remove();
      }
  
      // Create notification element
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.innerHTML = `
        <div class="notification-content">
          <img src="${product.image}" alt="${product.name}" class="notification-img">
          <span>Added to Cart</span>
          <a href="#" class="view-cart-btn">View Cart</a>
        </div>
      `;
      document.body.appendChild(notification);
  
      // Add show class after a small delay (to trigger animation)
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
  
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300); // Wait for fade out animation
      }, 3000);
  
      // View cart button click
      const viewCartBtn = notification.querySelector('.view-cart-btn');
      if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function(e) {
          e.preventDefault();
          // Implement view cart functionality here
          console.log('View cart clicked');
        });
      }
    }
  
    // Initialize price slider
    function initializePriceSlider() {
      const priceSlider = document.getElementById('price-slider');
      const currentPrice = document.getElementById('current-price');
      
      if (priceSlider && currentPrice) {
        priceSlider.addEventListener('input', function() {
          currentPrice.textContent = `MAD ${this.value}`;
          generateProducts(); // Regenerate products with new price filter
        });
      }
    }
  
    // Initialize filters
    function initializeFilters() {
      // This is a placeholder for more complex filter initialization
      // You can expand this based on your needs
    }
  
    // Initialize sort
    function initializeSort() {
      // This is a placeholder for more complex sort initialization
      // You can expand this based on your needs
    }
  
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
      });
    }
  });