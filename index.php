<?php
// Configuration de base
$site_title = "BioLife Marketplace";
$cart_count = 0; // Peut être récupéré depuis une session ou base de données

// Produits en vedette (peuvent venir d'une base de données)
$featured_products = [
    [
        'id' => 1,
        'name' => 'MARROW SPAGHETTI',
        'image' => 'assets/img/marrow spaghetti.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ],
    [
        'id' => 2,
        'name' => 'Turtle COCOA PILLOWS',
        'image' => 'assets/img/turtle cocoa pillows.png',
        'original_price' => 70.00,
        'sale_price' => 50.00
    ],
    [
        'id' => 3,
        'name' => 'OLIVE OIL extra virgin',
        'image' => 'assets/img/olive oil.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ],
    [
        'id' => 4,
        'name' => 'White rice',
        'image' => 'assets/img/white rice.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ],
    [
        'id' => 5,
        'name' => 'Strawberry Jar',
        'image' => 'assets/img/strawbery jar.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ],
    [
        'id' => 6,
        'name' => 'Tomato sauce',
        'image' => 'assets/img/tomato sauce.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ],
    [
        'id' => 7,
        'name' => 'Alchemilla Vulgaris',
        'image' => 'assets/img/alchemilla.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ],
    [
        'id' => 8,
        'name' => 'Détox',
        'image' => 'assets/img/detox.png',
        'original_price' => 72.00,
        'sale_price' => 60.00
    ]
];

// Partenaires
$partners = [
    ['name' => 'African Blue', 'logo' => 'assets/img/AfricainBleu.png'],
    ['name' => 'Woerle', 'logo' => 'assets/img/woerle-logo-298-x-114-1.png'],
    ['name' => 'KTC', 'logo' => 'assets/img/ktc-logo.png'],
    ['name' => 'Partner', 'logo' => 'assets/img/image-12.png']
];

// Navigation menu
$nav_menu = [
    ['name' => 'Home', 'url' => '#'],
    ['name' => 'Eggs', 'url' => '#'],
    ['name' => 'Products', 'url' => '#'],
    ['name' => 'Dairy', 'url' => '#'],
    ['name' => 'Beef/Mutton', 'url' => '#'],
    ['name' => 'More', 'url' => '#']
];

// Footer links
$footer_links = [
    'Links' => [
        ['name' => 'Contact', 'url' => '#'],
        ['name' => 'Affiliation', 'url' => '#'],
        ['name' => 'Terms of Use', 'url' => '#']
    ],
    'Company' => [
        ['name' => 'Blog', 'url' => '#'],
        ['name' => 'Shop', 'url' => '#'],
        ['name' => 'About', 'url' => '#']
    ],
    'Categories' => [
        ['name' => 'Eggs', 'url' => '#'],
        ['name' => 'Drinks', 'url' => '#'],
        ['name' => 'Eatables', 'url' => '#'],
        ['name' => 'Milk & Cheese', 'url' => '#']
    ],
    'Terms' => [
        ['name' => 'Privacy Policy', 'url' => '#'],
        ['name' => 'Terms & Conditions', 'url' => '#']
    ]
];

// Traitement du formulaire newsletter (exemple)
if ($_POST && isset($_POST['newsletter_email'])) {
    $email = filter_var($_POST['newsletter_email'], FILTER_SANITIZE_EMAIL);
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Traitement de l'inscription newsletter
        $message = "Merci pour votre inscription !";
    } else {
        $error = "Email invalide";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $site_title; ?></title>
    <link rel="stylesheet" href="assets\style\index.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;700&family=Just+Another+Hand&display=swap"
      rel="stylesheet"
    />
    <link
      rel="icon"
      type="image/png"
      href="assets\img\bio market logo (new).png"
    />
  </head>
  <body>
    <!-- Header Section -->
    <header>
      <div class="container header-container">
        <div class="logo">
          <a href="index.php">
            <img
              src="assets/img/bio market logo (new).png"
              alt="BioLife Logo"
            />
          </a>
        </div>
        <nav class="nav-menu">
          <?php foreach ($nav_menu as $menu_item): ?>
            <a href="<?php echo $menu_item['url']; ?>"><?php echo $menu_item['name']; ?></a>
          <?php endforeach; ?>
        </nav>
        <div class="header-actions">
          <a href="card.html">
            <div class="cart-button">
              <img src="assets/img/panier.png" alt="Cart" />
              <span><?php echo $cart_count; ?></span>
            </div>
          </a>
          <div class="search-box">
            <form method="GET" action="">
              <input type="text" name="search" placeholder="Search" value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>" />
              <button type="submit">
                <img src="assets/img/search.png" alt="Search" />
              </button>
            </form>
          </div>
          <a href="login.html" class="register-button">Register/Login</a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-next-slide"></div>
      <div class="container">
        <div class="hero-content">
          <h1>Welcome!</h1>
          <p>
            Welcome to our site dedicated to organic products! We offer a wide
            range of healthy and natural items designed to respect both your
            well-being and the environment. Discover a unique experience where
            quality and sustainability come together for a more balanced and
            eco-friendly lifestyle.
          </p>
          <a href="#" class="hero-button">Our Products</a>
        </div>
        <div class="hero-controls">
          <button class="prev-slide">
            <img src="assets/img/left-arrow.png" alt="Previous" />
          </button>
          <div class="indicators">
            <span class="active"></span>
            <span></span>
            <span></span>
          </div>
          <button class="next-slide">
            <img src="assets/img/right-arrow.png" alt="Next" />
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="featured-products">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <div class="products-grid">
          <?php foreach ($featured_products as $product): ?>
          <!-- Product <?php echo $product['id']; ?> -->
          <div class="product-card" data-product-id="<?php echo $product['id']; ?>">
            <div class="product-image">
              <img
                src="<?php echo $product['image']; ?>"
                alt="<?php echo htmlspecialchars($product['name']); ?>"
              />
            </div>
            <div class="product-details">
              <h3 class="product-title"><?php echo htmlspecialchars($product['name']); ?></h3>
              <div class="product-price">
                <span class="original-price">MAD <?php echo number_format($product['original_price'], 2); ?></span>
                <span class="sale-price">MAD <?php echo number_format($product['sale_price'], 2); ?></span>
              </div>
              <button class="add-cart-btn" onclick="addToCart(<?php echo $product['id']; ?>)">
                <img src="assets/img/plus.png" alt="Add to cart" />
              </button>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="products-navigation">
          <button class="prev-product">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#0b7c2c" />
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <a href="PROD.html" class="view-all-btn">View all Products</a>
          <button class="next-product">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#ff6b35" />
              <path
                d="M9 6L15 12L9 18"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="about-us">
      <div class="container">
        <h2 class="section-title">Who we are</h2>
        <div class="about-content">
          <div class="about-text">
            <p>
              We are a leading bio marketplace connecting innovative suppliers
              with forward-thinking buyers in the life sciences and
              biotechnology industries. Our platform simplifies access to
              high-quality biological products, fostering collaboration and
              driving advancements in research and development. By bridging the
              gap between suppliers and consumers, we empower scientific
              progress and ensure the seamless exchange of essential resources
              for groundbreaking discoveries.
            </p>
            <div class="bio-quote">
              <div class="quote-icon">
                <img src="assets/img/virgules.png" alt="Quote" />
              </div>
              <p class="quote-text">Bio Life, Stay Alive.</p>
              <p class="quote-author">Signature</p>
            </div>
            <a href="#" class="read-more-btn">Read More</a>
          </div>
          <div class="about-images">
            <img src="assets/img/image0.png" alt="About Us" class="about-img" />
            <img src="assets/img/image1.png" alt="About Us" class="about-img" />
            <img src="assets/img/image2.png" alt="About Us" class="about-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="partners">
      <div class="container">
        <h2 class="section-title">Our Partners</h2>
        <div class="partners-logos">
          <?php foreach ($partners as $partner): ?>
          <div class="partner-logo">
            <img src="<?php echo $partner['logo']; ?>" alt="<?php echo htmlspecialchars($partner['name']); ?>" />
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- Launch Sale Section -->
    <div class="launch-sale">
      <div class="decorative-curves">
        <div class="curve curve-1"></div>
        <div class="curve curve-2"></div>
        <div class="curve curve-3"></div>
        <div class="circle-accent"></div>
      </div>
      <div class="content-wrapper">
        <h2>Launch Sale is On</h2>
        <p>Shop today</p>
        <div class="text-content"></div>
        <a href="#" class="shop-btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Messages de notification -->
    <?php if (isset($message)): ?>
    <div class="notification success">
      <?php echo htmlspecialchars($message); ?>
    </div>
    <?php endif; ?>

    <?php if (isset($error)): ?>
    <div class="notification error">
      <?php echo htmlspecialchars($error); ?>
    </div>
    <?php endif; ?>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <h2 class="footer-title">BIOLIFE Products</h2>

        <div class="footer-content">
          <?php foreach ($footer_links as $section_title => $links): ?>
          <div class="footer-section">
            <h3><?php echo $section_title; ?></h3>
            <ul class="footer-links">
              <?php foreach ($links as $link): ?>
              <li><a href="<?php echo $link['url']; ?>"><?php echo $link['name']; ?></a></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <?php endforeach; ?>

          <div class="footer-section">
            <h3>Subscribe to Newsletter</h3>
            <form class="newsletter-form" method="POST" action="">
              <input
                type="email"
                name="newsletter_email"
                class="newsletter-input"
                placeholder="Enter your email"
                required
              />
              <button type="submit" class="newsletter-btn">Submit</button>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            All Rights Reserved - BioLife Products &copy; <?php echo date('Y'); ?>
          </div>

          <div class="payment-methods-footer">
            <img src="assets/img/mastercard.png" alt="Mastercard" />
            <img src="assets/img/cartvisa.png" alt="Visa" />
            <img src="assets/img/unionpay.png" alt="Union Pay" />
            <img src="assets/img/applepay.png" alt="Apple Pay" />
            <img src="assets/img/googlepay.png" alt="Google Pay" />
          </div>

          <div class="footer-terms">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>

    <script src="assets\js\index.js"></script>
    
    <!-- Script PHP pour gestion du panier -->
    <script>
    function addToCart(productId) {
        // Envoyer une requête AJAX pour ajouter au panier
        fetch('add_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mettre à jour le compteur du panier
                document.querySelector('.cart-button span').textContent = data.cart_count;
                alert('Produit ajouté au panier !');
            } else {
                alert('Erreur lors de l\'ajout au panier');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    }
    </script>
  </body>
</html>