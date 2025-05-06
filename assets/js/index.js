// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    const heroSliderControls = document.querySelectorAll('.hero-controls button');
    const heroIndicators = document.querySelectorAll('.indicators span');
    let currentSlide = 0;
    
    // Update the path to match where your images are actually stored
    // Make sure these image files exist in this location
    const heroSlides = ['image4.png', 'image5.png', 'image6.png']; 
    
    // Get the hero section
    const heroSection = document.querySelector('.hero');
    
    // Initialize hero slider
    function initHeroSlider() {
        // Set initial slide
        updateHeroSlider(); // Apply the first slide immediately on page load
        
        // Set up click handlers for previous and next buttons
        if(heroSliderControls.length >= 2) {
            heroSliderControls[0].addEventListener('click', prevSlide);
            heroSliderControls[1].addEventListener('click', nextSlide);
        }
        
        // Set up click handlers for indicators
        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }
    
    function goToSlide(index) {
        // Update current slide
        currentSlide = index;
        updateHeroSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        updateHeroSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        updateHeroSlider();
    }
    
    function updateHeroSlider() {
        // Log for debugging
        console.log(`Changing to slide ${currentSlide}: ${heroSlides[currentSlide]}`);
        
        // Update background image with fade effect
        heroSection.style.opacity = '0';
        
        setTimeout(() => {
            // Change the background image - adjust the path if needed
            // Make sure this path matches where your images are actually stored
            heroSection.style.backgroundImage = `url('assets/img/${heroSlides[currentSlide]}')`;
            
            // Alternative approach: if you're having issues with the path, try absolute path
            // Uncomment this line and adjust the path to your images
            // heroSection.style.backgroundImage = `url('/assets/img/${heroSlides[currentSlide]}')`;
            
            // Fade back in
            heroSection.style.opacity = '1';
            
            // Update indicators
            heroIndicators.forEach((indicator, index) => {
                if(index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }, 300);
    }
    
    // Product Navigation
    const prevProductBtn = document.querySelector('.prev-product');
    const nextProductBtn = document.querySelector('.next-product');
    const productsGrid = document.querySelector('.products-grid');
    let visibleProducts = 8; // Number of products shown at once
    let productPage = 0;
    
    // Initialize product navigation
    function initProductNav() {
        if(prevProductBtn && nextProductBtn) {
            prevProductBtn.addEventListener('click', prevProducts);
            nextProductBtn.addEventListener('click', nextProducts);
        }
    }
    
    function prevProducts() {
        if(productPage > 0) {
            productPage--;
            updateProductDisplay();
        }
    }
    
    function nextProducts() {
        // This would need to check against total number of products
        productPage++;
        updateProductDisplay();
    }
    
    function updateProductDisplay() {
        // This function would update which products are visible
        // For now, it's a placeholder as we'd need to know total products
        
        // Disable/enable buttons as needed
        prevProductBtn.disabled = productPage === 0;
        
        // Animation effect
        productsGrid.style.opacity = '0';
        setTimeout(() => {
            // Here you would update the products
            productsGrid.style.opacity = '1';
        }, 300);
    }
    
    // Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-cart-btn');
    const cartCounter = document.querySelector('.cart-button span');
    let cartItems = 0;
    
    // Initialize cart functionality
    function initCart() {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    function addToCart(e) {
        e.preventDefault();
        cartItems++;
        updateCart();
        
        // Animation for button
        const button = this;
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 500);
    }
    
    function updateCart() {
        cartCounter.textContent = cartItems;
        
        // Animation for cart counter
        cartCounter.classList.add('updated');
        setTimeout(() => {
            cartCounter.classList.remove('updated');
        }, 300);
    }
    
    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    function initSearch() {
        if(searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        
        if(searchBox) {
            searchBox.addEventListener('keypress', function(e) {
                if(e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }
    
    function performSearch() {
        const searchTerm = searchBox.value.trim();
        if(searchTerm) {
            // In a real application, this would redirect to search results
            alert(`Searching for: ${searchTerm}`);
            searchBox.value = '';
        }
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-form input');
    
    function initNewsletter() {
        if(newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = newsletterInput.value.trim();
                if(email && validateEmail(email)) {
                    // In a real application, this would submit to a server
                    alert(`Thank you for subscribing with: ${email}`);
                    newsletterInput.value = '';
                } else {
                    alert('Please enter a valid email address');
                }
            });
        }
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    const navMenu = document.querySelector('.nav-menu');
    
    function initMobileMenu() {
        const headerActions = document.querySelector('.header-actions');
        if(headerActions && window.innerWidth <= 768) {
            headerActions.parentNode.insertBefore(mobileMenuToggle, headerActions);
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }
    }
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    }
    
    // Window resize handling for responsive adjustments
    function handleResize() {
        if(window.innerWidth <= 768) {
            if(!document.querySelector('.mobile-menu-toggle')) {
                initMobileMenu();
            }
        } else {
            if(document.querySelector('.mobile-menu-toggle')) {
                mobileMenuToggle.remove();
                navMenu.classList.remove('active');
            }
        }
    }
    
    // Initialize all functionality
    initHeroSlider();
    initProductNav();
    initCart();
    initSearch();
    initNewsletter();
    handleResize();
    
    // Add auto slideshow for hero section
    setInterval(nextSlide, 5000);
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Additional CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .hero {
            transition: opacity 0.3s ease;
            background-size: cover;
            background-position: center;
            height: 500px; /* Adjust this height as needed */
            width: 100%;
            position: relative;
        }
        .add-cart-btn.added {
            transform: scale(1.2);
        }
        .cart-button span.updated {
            animation: pulse 0.3s ease-out;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .mobile-menu-toggle {
            display: none;
        }
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            .mobile-menu-toggle {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 21px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
            }
            .mobile-menu-toggle span {
                display: block;
                width: 100%;
                height: 3px;
                background: var(--text-dark);
                transition: transform 0.3s, opacity 0.3s;
            }
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
    `;
    document.head.appendChild(style);
});