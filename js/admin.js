// Admin Panel JavaScript for Cofi Tea Cack

// Set initialization flag
window.adminInitialized = true;

// Main initialization function
document.addEventListener('DOMContentLoaded', function () {
    console.log('Admin JS loaded and DOM ready');
    try {
        // No longer need login initialization
        initializeAdminTabs();
        initializeProductsTable();
        initializeAddProductForm();
        setupNightMode();
        console.log('Admin panel initialized successfully');
    } catch (error) {
        console.error('Error initializing admin panel:', error);
    }
});

// Tab navigation functionality
function initializeAdminTabs() {
    const tabLinks = document.querySelectorAll('.admin-nav li');
    const tabs = document.querySelectorAll('.admin-tab');

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            if (tabId) {
                // Hide all tabs
                tabs.forEach(tab => tab.classList.remove('active'));
                tabLinks.forEach(item => item.classList.remove('active'));

                // Show selected tab
                document.getElementById(`${tabId}-tab`).classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

// Products Table Functionality
function initializeProductsTable() {
    const productTable = document.querySelector('.product-table');
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const addProductTab = document.getElementById('add-product-tab');
    const productsTab = document.getElementById('products-tab');
    const addNewBtn = document.querySelector('.add-new-btn');

    // Sample product data - in a real app, this would come from a database
    const productData = [
        {
            id: 1,
            name: "Caramel Cack",
            category: "Cack (Cola)",
            price: 4.99,
            stock: 156,
            image: "Product Thumbnails.png",
            description: "Our signature caramel infused cola with hints of vanilla and cinnamon.",
            ingredients: "Filtered water, organic cane sugar, natural caramel flavor, vanilla bean, cinnamon, coffee extract",
            tags: ["bestseller", "sweet"]
        },
        {
            id: 2,
            name: "Mocha Tea Fizz",
            category: "Tea Based",
            price: 5.49,
            stock: 125,
            image: "Product Thumbnails.png",
            description: "A refreshing blend of black tea with coffee notes and a fizzy finish.",
            ingredients: "Filtered water, black tea, coffee extract, organic cane sugar, natural flavors",
            tags: ["bestseller", "caffeine"]
        },
        {
            id: 3,
            name: "Spicy Chai Cack",
            category: "Cack (Cola)",
            price: 4.99,
            stock: 18,
            image: "Product Thumbnails.png",
            description: "Our spiced chai version of cola with cardamom, ginger, and clove.",
            ingredients: "Filtered water, organic cane sugar, cardamom, ginger, clove, black tea, coffee extract",
            tags: ["spicy", "seasonal"]
        },
        {
            id: 4,
            name: "Citrus Cofi",
            category: "Coffee Based",
            price: 5.29,
            stock: 0,
            image: "Product Thumbnails.png",
            description: "A zesty blend of espresso with lemon and orange notes.",
            ingredients: "Filtered water, espresso, lemon extract, orange extract, organic cane sugar",
            tags: ["citrusy"]
        },
        {
            id: 5,
            name: "Maple Pecan Cofi",
            category: "Limited Edition",
            price: 6.49,
            stock: 42,
            image: "Product Thumbnails.png",
            description: "Our seasonal maple-infused coffee drink with hints of pecan.",
            ingredients: "Filtered water, coffee extract, maple syrup, natural pecan flavor, organic cane sugar",
            tags: ["sweet", "limited", "seasonal"]
        }
    ];

    // Handle edit buttons
    if (editButtons) {
        editButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Fill the add/edit product form with the product data
                const product = productData[index];
                fillProductForm(product);

                // Change the form heading and button text to indicate editing mode
                const formHeading = document.querySelector('#add-product-tab h2');
                const submitButton = document.querySelector('#add-product-tab .form-actions button[type="submit"]');

                if (formHeading) formHeading.textContent = 'Edit Product';
                if (submitButton) submitButton.textContent = 'Update Product';

                // Store the product ID being edited
                if (submitButton) submitButton.dataset.editId = product.id;

                // Switch to the add product tab (which now serves as edit product tab)
                switchToTab('add-product');
            });
        });
    }

    // Handle delete buttons
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this product?')) {
                    // In a real application, you would send a request to delete from the database
                    // For this demo, just remove the table row
                    const row = button.closest('tr');
                    if (row) {
                        row.remove();
                        showNotification('Product deleted successfully');
                    }
                }
            });
        });
    }

    // Add New Product button
    if (addNewBtn) {
        addNewBtn.addEventListener('click', () => {
            resetProductForm();
            switchToTab('add-product');
        });
    }

    // Function to fill the product form with data
    function fillProductForm(product) {
        const nameInput = document.getElementById('product-name');
        const categorySelect = document.getElementById('product-category-select');
        const priceInput = document.getElementById('product-price');
        const stockInput = document.getElementById('product-stock');
        const descriptionInput = document.getElementById('product-description');
        const ingredientsInput = document.getElementById('product-ingredients');
        const tagCheckboxes = document.querySelectorAll('input[name="tags"]');

        if (nameInput) nameInput.value = product.name;
        if (categorySelect) categorySelect.value = getCategoryValue(product.category);
        if (priceInput) priceInput.value = product.price;
        if (stockInput) stockInput.value = product.stock;
        if (descriptionInput) descriptionInput.value = product.description;
        if (ingredientsInput) ingredientsInput.value = product.ingredients;

        // Reset all checkboxes first
        tagCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Check the appropriate tags
        if (product.tags) {
            tagCheckboxes.forEach(checkbox => {
                if (product.tags.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });
        }
    }

    // Function to reset the product form for adding a new product
    function resetProductForm() {
        const form = document.querySelector('.product-form');
        const formHeading = document.querySelector('#add-product-tab h2');
        const submitButton = document.querySelector('#add-product-tab .form-actions button[type="submit"]');

        if (form) form.reset();
        if (formHeading) formHeading.textContent = 'Add New Product';
        if (submitButton) {
            submitButton.textContent = 'Add Product';
            submitButton.removeAttribute('data-edit-id');
        }
    }

    // Helper function to get the category value for the select element
    function getCategoryValue(categoryName) {
        switch (categoryName) {
            case "Tea Based": return "tea";
            case "Coffee Based": return "coffee";
            case "Cack (Cola)": return "cack";
            case "Limited Edition": return "limited";
            default: return "";
        }
    }

    // Helper function to switch to a specific tab
    function switchToTab(tabId) {
        const tabLinks = document.querySelectorAll('.admin-nav li');
        const tabs = document.querySelectorAll('.admin-tab');

        // Remove active class from all tabs and links
        tabLinks.forEach(link => link.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to the selected tab and link
        const selectedTab = document.getElementById(`${tabId}-tab`);
        const selectedLink = document.querySelector(`[data-tab="${tabId}"]`);

        if (selectedTab) selectedTab.classList.add('active');
        if (selectedLink) selectedLink.classList.add('active');
    }

    // Function to show a notification message
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.admin-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'admin-notification';
            document.body.appendChild(notification);

            // Add styles for notification
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--primary-color)';
            notification.style.color = 'white';
            notification.style.padding = '12px 20px';
            notification.style.borderRadius = '4px';
            notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            notification.style.zIndex = '9999';
            notification.style.transition = 'opacity 0.3s ease';
        }

        notification.textContent = message;
        notification.style.opacity = '1';

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 3000);
    }
}

// Add Product Form Functionality
function initializeAddProductForm() {
    const productForm = document.querySelector('.product-form');

    if (productForm) {
        productForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category-select').value;
            const price = document.getElementById('product-price').value;
            const stock = document.getElementById('product-stock').value;

            // Get selected tags
            const selectedTags = [];
            document.querySelectorAll('input[name="tags"]:checked').forEach(checkbox => {
                selectedTags.push(checkbox.value);
            });

            // Check if we're editing or adding a new product
            const submitButton = document.querySelector('.form-actions button[type="submit"]');
            const isEditing = submitButton && submitButton.hasAttribute('data-edit-id');

            if (isEditing) {
                // In a real app, would update the product in the database
                showNotification(`Product "${name}" has been updated successfully`);
            } else {
                // In a real app, would add a new product to the database
                showNotification(`New product "${name}" has been added successfully`);
            }

            // Switch back to the products tab
            switchToTab('products');

            // Reset the form
            productForm.reset();
        });
    }
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