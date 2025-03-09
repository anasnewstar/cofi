// Main JavaScript for Cofi Tea Cack Website

document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart functionality
    initializeCart();

    // Initialize flavor carousel
    initializeFlavorCarousel();

    // Initialize accordion (for FAQ section)
    initializeAccordion();

    // Initialize mobile menu
    initializeMobileMenu();

    // Add smooth scrolling for anchor links
    initializeSmoothScroll();

    // Initialize night mode functionality
    setupNightMode();
});

// Cart Functionality
function initializeCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total span');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Load cart from localStorage if available
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart UI on initial load
    updateCartUI();

    // Cart open/close functionality
    if (cartIcon) {
        cartIcon.addEventListener('click', function (e) {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.flavor-card') || this.closest('.product-card');

            if (!productCard) return;

            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex > -1) {
                // Increment quantity if product already exists
                cart[existingProductIndex].quantity += 1;
            } else {
                // Add new product to cart
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart UI
            updateCartUI();

            // Show success message or animation
            showAddToCartAnimation(this);

            // Open cart
            openCart();
        });
    });

    // Update cart UI function
    function updateCartUI() {
        // Update cart count
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Update cart items
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            } else {
                let cartHTML = '';

                cart.forEach((item, index) => {
                    cartHTML += `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="quantity-btn increase" data-index="${index}">+</button>
                                </div>
                            </div>
                            <button class="remove-item" data-index="${index}">×</button>
                        </div>
                    `;
                });

                cartItems.innerHTML = cartHTML;

                // Add event listeners for quantity buttons and remove buttons
                document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
                    button.addEventListener('click', decreaseQuantity);
                });

                document.querySelectorAll('.quantity-btn.increase').forEach(button => {
                    button.addEventListener('click', increaseQuantity);
                });

                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', removeItem);
                });
            }
        }

        // Update cart total
        if (cartTotal) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Cart quantity and removal functions
    function decreaseQuantity() {
        const index = parseInt(this.dataset.index);

        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    function increaseQuantity() {
        const index = parseInt(this.dataset.index);
        cart[index].quantity += 1;

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    function removeItem() {
        const index = parseInt(this.dataset.index);
        cart.splice(index, 1);

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            // In a real implementation, this would redirect to a checkout page
            alert('Checkout functionality would be implemented here.');

            // Clear cart for demo purposes
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            closeCart();
        });
    }

    // Open cart function
    function openCart() {
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close cart function
    function closeCart() {
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Animation when adding to cart
    function showAddToCartAnimation(button) {
        button.textContent = 'Added!';
        button.classList.add('added');

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.classList.remove('added');
        }, 1500);
    }
}

// Flavor Carousel Functionality
function initializeFlavorCarousel() {
    const carousel = document.querySelector('.flavor-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!carousel || !prevBtn || !nextBtn) return;

    const cardWidth = carousel.querySelector('.flavor-card').offsetWidth +
        parseFloat(getComputedStyle(carousel.querySelector('.flavor-card')).marginRight);

    let scrollPosition = 0;

    // Scroll to next card
    nextBtn.addEventListener('click', () => {
        if (scrollPosition < carousel.scrollWidth - carousel.clientWidth) {
            scrollPosition += cardWidth;
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    });

    // Scroll to previous card
    prevBtn.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    });

    // Update buttons on scroll
    carousel.addEventListener('scroll', () => {
        scrollPosition = carousel.scrollLeft;

        // Hide/show prev button based on scroll position
        if (scrollPosition <= 0) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }

        // Hide/show next button based on scroll position
        if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth - 10) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    });

    // Initialize button states
    carousel.dispatchEvent(new Event('scroll'));
}

// Accordion Functionality (for FAQ section)
function initializeAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        if (header) {
            header.addEventListener('click', () => {
                // Toggle active class on clicked item
                item.classList.toggle('active');

                // Close other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu');

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }

                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Night mode toggle functionality
function setupNightMode() {
    const nightModeToggle = document.querySelector('.night-mode-toggle');
    const body = document.body;

    // Check if user preference is stored in localStorage
    const nightMode = localStorage.getItem('nightMode');

    // If user preference is night mode, enable it
    if (nightMode === 'enabled') {
        body.classList.add('night-mode');
        updateNightModeIcon(true);
    }

    // Add click event listener to night mode toggle button
    if (nightModeToggle) {
        nightModeToggle.addEventListener('click', () => {
            // Toggle night mode class
            body.classList.toggle('night-mode');

            // Check if night mode is enabled
            const isNightMode = body.classList.contains('night-mode');

            // Update the icon
            updateNightModeIcon(isNightMode);

            // Store user preference in localStorage
            if (isNightMode) {
                localStorage.setItem('nightMode', 'enabled');
            } else {
                localStorage.setItem('nightMode', 'disabled');
            }
        });
    }
}

function updateNightModeIcon(isNightMode) {
    const nightModeIcon = document.querySelector('.night-mode-toggle i');
    if (nightModeIcon) {
        if (isNightMode) {
            nightModeIcon.classList.remove('fa-moon');
            nightModeIcon.classList.add('fa-sun');
        } else {
            nightModeIcon.classList.remove('fa-sun');
            nightModeIcon.classList.add('fa-moon');
        }
    }
} 