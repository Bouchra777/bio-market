document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is running!'); // Check if JS is loading at all
    
    // ---- Quantity Controls ----
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusBtn && plusBtn && quantityInput) {
        console.log('Quantity controls found');
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    } else {
        console.warn('Quantity controls not found');
    }
    
    // ---- Product Image Gallery ----
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage && thumbnails.length > 0) {
        console.log('Image gallery found');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Update main image
                const thumbImg = this.querySelector('img');
                if (thumbImg) {
                    mainImage.src = thumbImg.src;
                    
                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    } else {
        console.warn('Image gallery elements not found');
    }
    
    // ---- Reviews Navigation ----
    const reviews = document.querySelectorAll('.review');
    const prevReviewBtn = document.querySelector('.review-nav.prev');
    const nextReviewBtn = document.querySelector('.review-nav.next');
    
    if (reviews.length > 0 && prevReviewBtn && nextReviewBtn) {
        console.log('Review navigation found');
        let currentReviewIndex = 0;
        
        function showReview(index) {
            reviews.forEach(review => review.classList.remove('active'));
            reviews[index].classList.add('active');
            currentReviewIndex = index;
        }
        
        prevReviewBtn.addEventListener('click', function() {
            let newIndex = currentReviewIndex - 1;
            if (newIndex < 0) {
                newIndex = reviews.length - 1;
            }
            showReview(newIndex);
        });
        
        nextReviewBtn.addEventListener('click', function() {
            let newIndex = currentReviewIndex + 1;
            if (newIndex >= reviews.length) {
                newIndex = 0;
            }
            showReview(newIndex);
        });
    } else {
        console.warn('Review navigation elements not found');
    }
    
    // ---- Review Rating Selection ----
    const ratingDots = document.querySelectorAll('.rating-dot');
    
    if (ratingDots.length > 0) {
        console.log('Rating dots found');
        ratingDots.forEach(dot => {
            dot.addEventListener('click', function() {
                ratingDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
            });
        });
    } else {
        console.warn('Rating dots not found');
    }
    
    // ---- Review Form Submission ----
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        console.log('Review form found');
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            const selectedRating = document.querySelector('.rating-dot.active');
            
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill all fields');
                return;
            }
            
            // In a real application, you would send this data to your server
            console.log('Review submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                rating: selectedRating ? selectedRating.textContent : '10'
            });
            
            // Reset form
            this.reset();
            alert('Thank you for your review!');
        });
    } else {
        console.warn('Review form not found');
    }
    
    // ---- Cart Notification ----
    const cartNotification = document.getElementById('cart-notification');
    
    function showCartNotification(productImgSrc, productTitle) {
        if (cartNotification) {
            console.log('Showing cart notification for:', productTitle);
            // Update the notification image with the product image
            const notificationImg = cartNotification.querySelector('img');
            if (notificationImg) {
                notificationImg.src = productImgSrc;
                notificationImg.alt = productTitle || 'Product thumbnail';
            }
            
            // Update notification text if title is provided
            const notificationText = cartNotification.querySelector('.notification-text');
            if (notificationText && productTitle) {
                notificationText.textContent = `${productTitle} Added to Cart`;
            } else if (notificationText) {
                notificationText.textContent = 'Added to Cart';
            }
            
            // Show notification
            cartNotification.classList.add('active');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('active');
            }, 3000);
        } else {
            console.warn('Cart notification element not found');
        }
    }
    
    // Add to cart functionality for main product
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        console.log('Add to cart button found');
        addToCartBtn.addEventListener('click', function() {
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            // Get the main product image and title
            const mainProductImg = document.querySelector('.main-image img').src;
            const mainProductTitle = document.querySelector('.product-details h1').textContent;
            
            console.log('Adding to cart:', mainProductTitle, 'x', quantity);
            
            // Show cart notification with main product image and title
            showCartNotification(mainProductImg, mainProductTitle);
            
            // Update cart count - UPDATED for new header structure
            const cartCountSpan = document.querySelector('.cart-btn span');
            if (cartCountSpan) {
                const currentCount = parseInt(cartCountSpan.textContent);
                cartCountSpan.textContent = currentCount + quantity;
            } else {
                console.warn('Cart count span not found');
            }
        });
    } else {
        console.warn('Add to cart button not found');
    }
    
    // Add related product functionality
    const addCartBtns = document.querySelectorAll('.add-cart-btn');
    
    if (addCartBtns.length > 0) {
        console.log('Related product buttons found:', addCartBtns.length);
        addCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product info
                const card = this.closest('.product-card');
                const productTitle = card.querySelector('.product-title').textContent;
                const productImgSrc = card.querySelector('.product-image img').src;
                
                console.log('Adding related product to cart:', productTitle);
                
                // Show cart notification with specific product image and title
                showCartNotification(productImgSrc, productTitle);
                
                // Update cart count - UPDATED for new header structure
                const cartCountSpan = document.querySelector('.cart-btn span');
                if (cartCountSpan) {
                    const currentCount = parseInt(cartCountSpan.textContent);
                    cartCountSpan.textContent = currentCount + 1;
                } else {
                    console.warn('Cart count span not found');
                }
                
                // Optional: Show mini toast notification with product name
                const miniToast = document.createElement('div');
                miniToast.className = 'mini-toast';
                miniToast.textContent = `${productTitle} added to cart`;
                miniToast.style.position = 'fixed';
                miniToast.style.bottom = '20px';
                miniToast.style.right = '20px';
                miniToast.style.backgroundColor = '#4CAF50';
                miniToast.style.color = 'white';
                miniToast.style.padding = '10px 20px';
                miniToast.style.borderRadius = '4px';
                miniToast.style.zIndex = '1000';
                document.body.appendChild(miniToast);
                
                setTimeout(() => {
                    miniToast.remove();
                }, 2000);
            });
        });
    } else {
        console.warn('Related product buttons not found');
    }
    
    // Add cart button functionality (in header) - NEW
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        console.log('Cart button in header found');
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('View Cart clicked');
            // Here you would typically redirect to the cart page or show a cart dropdown
        });
    } else {
        console.warn('Cart button in header not found');
    }
    
    console.log('JavaScript initialization complete');
});