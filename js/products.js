// Products JavaScript for Cofi Tea Cack Website

document.addEventListener('DOMContentLoaded', function () {
    // Initialize product data
    const productsData = [
        {
            id: 1,
            name: "Caramel Cack",
            price: 4.99,
            image: "Product Thumbnails.png",
            category: "cack",
            description: "Our signature cola with rich caramel undertones, vanilla, and a hint of cinnamon.",
            tags: ["sweet", "bestseller"],
            dietary: ["vegan", "gluten-free"],
            stock: 156
        },
        {
            id: 2,
            name: "Mocha Tea Fizz",
            price: 5.49,
            image: "Product Thumbnails.png",
            category: "tea",
            description: "Green tea infused with espresso, chocolate, and a refreshing hint of mint.",
            tags: ["bitter", "sweet"],
            dietary: ["vegan", "gluten-free"],
            stock: 125
        },
        {
            id: 3,
            name: "Spicy Chai Cack",
            price: 4.99,
            image: "Product Thumbnails.png",
            category: "cack",
            description: "Our twist on cola with warming chai spices for a unique and memorable experience.",
            tags: ["spicy", "seasonal"],
            dietary: ["vegan", "gluten-free"],
            stock: 18
        },
        {
            id: 4,
            name: "Citrus Cofi",
            price: 5.29,
            image: "Product Thumbnails.png",
            category: "coffee",
            description: "Cold brew coffee with zesty lemon and orange notes for a refreshing pick-me-up.",
            tags: ["citrusy", "bitter"],
            dietary: ["gluten-free"],
            stock: 0
        },
        {
            id: 5,
            name: "Maple Pecan Cofi",
            price: 6.49,
            image: "Product Thumbnails.png",
            category: "limited",
            description: "Limited edition coffee-based drink with maple syrup and toasted pecan flavor.",
            tags: ["sweet", "limited", "new"],
            dietary: ["gluten-free"],
            stock: 42
        },
        {
            id: 6,
            name: "Lavender Tea Sparkle",
            price: 5.99,
            image: "Product Thumbnails.png",
            category: "tea",
            description: "Sparkling tea with calming lavender and subtle honey sweetness.",
            tags: ["herbal", "new"],
            dietary: ["vegan", "gluten-free"],
            stock: 87
        },
        {
            id: 7,
            name: "Ginger Lemon Cack",
            price: 4.99,
            image: "Product Thumbnails.png",
            category: "cack",
            description: "Spicy ginger and zesty lemon combine in our cola base for a refreshing kick.",
            tags: ["spicy", "citrusy", "bestseller"],
            dietary: ["vegan", "gluten-free", "caffeine-free"],
            stock: 105
        },
        {
            id: 8,
            name: "Vanilla Bean Cofi",
            price: 5.99,
            image: "Product Thumbnails.png",
            category: "coffee",
            description: "Smooth cold brew with Madagascar vanilla beans and a creamy finish.",
            tags: ["sweet", "bestseller"],
            dietary: ["gluten-free"],
            stock: 93
        },
        {
            id: 9,
            name: "Hibiscus Berry Tea",
            price: 5.49,
            image: "Product Thumbnails.png",
            category: "tea",
            description: "Tangy hibiscus tea with mixed berries and a touch of agave sweetness.",
            tags: ["herbal", "sweet", "seasonal"],
            dietary: ["vegan", "gluten-free", "caffeine-free"],
            stock: 76
        },
        {
            id: 10,
            name: "Pumpkin Spice Cack",
            price: 5.99,
            image: "Product Thumbnails.png",
            category: "limited",
            description: "Limited edition fall favorite with pumpkin, cinnamon, and nutmeg in our signature cola.",
            tags: ["spicy", "sweet", "seasonal", "limited"],
            dietary: ["vegan", "gluten-free"],
            stock: 35
        },
        {
            id: 11,
            name: "Mint Chocolate Cofi",
            price: 5.79,
            image: "Product Thumbnails.png",
            category: "coffee",
            description: "Refreshing mint combined with rich chocolate and our signature cold brew.",
            tags: ["sweet", "bestseller"],
            dietary: ["gluten-free"],
            stock: 112
        },
        {
            id: 12,
            name: "Coconut Lime Tea",
            price: 5.49,
            image: "Product Thumbnails.png",
            category: "tea",
            description: "Tropical coconut and zesty lime infused into our green tea base.",
            tags: ["citrusy", "sweet"],
            dietary: ["vegan", "gluten-free"],
            stock: 68
        }
    ];

    // Initialize pagination
    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredProducts = [...productsData];

    // Get DOM elements
    const productsList = document.querySelector('.products-list');
    const paginationPrev = document.querySelector('.pagination-prev');
    const paginationNext = document.querySelector('.pagination-next');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const sortSelect = document.getElementById('sort-select');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    const resetFiltersBtn = document.querySelector('.reset-filters');

    // Initialize products on page load
    initializeProducts();

    // Sorting functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            sortProducts(this.value);
            renderProducts();
        });
    }

    // Filtering functionality
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            filterProducts();
            currentPage = 1;
            renderProducts();
        });
    });

    // Reset filters
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function () {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            filteredProducts = [...productsData];
            sortProducts(sortSelect.value);
            currentPage = 1;
            renderProducts();
        });
    }

    // Pagination functionality
    if (paginationPrev) {
        paginationPrev.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });
    }

    if (paginationNext) {
        paginationNext.addEventListener('click', function () {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
            }
        });
    }

    // Initialize products
    function initializeProducts() {
        // Apply sorting from the select value
        sortProducts(sortSelect.value);

        // Render products
        renderProducts();
    }

    // Sort products function
    function sortProducts(sortBy) {
        switch (sortBy) {
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
            case 'featured':
            default:
                // For featured, we prioritize bestsellers, then new products, then limited edition
                filteredProducts.sort((a, b) => {
                    const aBestseller = a.tags.includes('bestseller') ? 1 : 0;
                    const bBestseller = b.tags.includes('bestseller') ? 1 : 0;
                    const aNew = a.tags.includes('new') ? 1 : 0;
                    const bNew = b.tags.includes('new') ? 1 : 0;
                    const aLimited = a.tags.includes('limited') ? 1 : 0;
                    const bLimited = b.tags.includes('limited') ? 1 : 0;

                    // First compare bestseller status
                    if (aBestseller !== bBestseller) {
                        return bBestseller - aBestseller;
                    }

                    // Then compare new status
                    if (aNew !== bNew) {
                        return bNew - aNew;
                    }

                    // Then compare limited edition status
                    return bLimited - aLimited;
                });
                break;
        }
    }

    // Filter products function
    function filterProducts() {
        // Get all checked filter values
        const checkedFilters = {
            flavor: [],
            dietary: [],
            collection: []
        };

        filterCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const filterType = checkbox.dataset.filter;
                const filterValue = checkbox.value;
                checkedFilters[filterType].push(filterValue);
            }
        });

        // Filter products based on selected filters
        filteredProducts = productsData.filter(product => {
            // Filter by flavor
            if (checkedFilters.flavor.length > 0) {
                if (!product.tags.some(tag => checkedFilters.flavor.includes(tag))) {
                    return false;
                }
            }

            // Filter by dietary
            if (checkedFilters.dietary.length > 0) {
                if (!checkedFilters.dietary.every(diet => product.dietary.includes(diet))) {
                    return false;
                }
            }

            // Filter by collection
            if (checkedFilters.collection.length > 0) {
                if (!product.tags.some(tag => checkedFilters.collection.includes(tag))) {
                    return false;
                }
            }

            return true;
        });
    }

    // Render products function
    function renderProducts() {
        if (!productsList) return;

        // Calculate pagination
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        // Update pagination UI
        if (currentPageSpan) currentPageSpan.textContent = currentPage;
        if (totalPagesSpan) totalPagesSpan.textContent = totalPages;

        // Update pagination buttons
        if (paginationPrev) {
            if (currentPage <= 1) {
                paginationPrev.classList.add('disabled');
            } else {
                paginationPrev.classList.remove('disabled');
            }
        }

        if (paginationNext) {
            if (currentPage >= totalPages) {
                paginationNext.classList.add('disabled');
            } else {
                paginationNext.classList.remove('disabled');
            }
        }

        // Generate HTML for products
        let productsHTML = '';

        if (paginatedProducts.length === 0) {
            productsHTML = '<div class="no-products">No products match your selected filters.</div>';
        } else {
            paginatedProducts.forEach(product => {
                // Determine badge text
                let badgeText = '';
                if (product.tags.includes('new')) {
                    badgeText = 'New';
                } else if (product.tags.includes('limited')) {
                    badgeText = 'Limited Edition';
                } else if (product.tags.includes('bestseller')) {
                    badgeText = 'Best Seller';
                }

                // Determine stock status
                let stockStatus = '';
                if (product.stock <= 0) {
                    stockStatus = '<span class="product-status out-of-stock">Out of Stock</span>';
                } else if (product.stock < 20) {
                    stockStatus = '<span class="product-status low-stock">Low Stock</span>';
                }

                // Create product card
                productsHTML += `
                    <div class="product-card" data-id="${product.id}">
                        ${badgeText ? `<div class="product-badge">${badgeText}</div>` : ''}
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <div class="product-tags">
                                ${product.dietary.map(tag => `<span>${tag.replace('-', ' ')}</span>`).join('')}
                            </div>
                            <p class="product-description">${product.description}</p>
                            ${stockStatus}
                            <button class="add-to-cart" ${product.stock <= 0 ? 'disabled' : ''}>
                                ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        productsList.innerHTML = productsHTML;

        // Initialize cart functionality for new products
        if (typeof initializeCart === 'function') {
            initializeCart();
        }
    }
}); 