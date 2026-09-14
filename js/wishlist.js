// ======================================
// WISHLIST
// ======================================

// Wishlist Load

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Save Wishlist

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// ======================================
// ADD TO WISHLIST
// ======================================

function addToWishlist(product) {

    // Check if product already exists
    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {

        alert("Product is already in your Wishlist ❤️");
        return;

    }

    // Add product
    wishlist.push(product);

    // Save Wishlist
    saveWishlist();

    alert("Product added to Wishlist ❤️");

}

// ======================================
// DISPLAY WISHLIST
// ======================================

function displayWishlist() {

    const container = document.getElementById("wishlist-items");

    if (!container) return;

    container.innerHTML = "";


    // Wishlist Empty

    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="empty-wishlist">

                <h2>Your Wishlist Is Empty</h2>

                <p>
                    You haven't added any products to your wishlist yet.
                </p>

                <a href="shop.html" class="wishlist-btn">
                    Continue Shopping
                </a>

            </div>
        `;

        return;
    }


    // Display Products

    wishlist.forEach((product, index) => {

        const image =
            product.images && product.images.length
                ? product.images[0]
                : product.image;

        container.innerHTML += `

            <div class="wishlist-item">

                <a href="product.html?id=${product.id}">

                    <img
                        src="${image}"
                        alt="${product.name}"
                    >

                </a>

                <div class="wishlist-info">

                    <h3>${product.name}</h3>

                    <p>Rs. ${product.price}</p>

                    <a
                        href="product.html?id=${product.id}"
                        class="wishlist-btn"
                    >
                        View Product
                    </a>

                    <button
                        class="remove-btn"
                        onclick="removeFromWishlist(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;
    });
}


// ======================================
// REMOVE FROM WISHLIST
// ======================================

function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    saveWishlist();

    displayWishlist();

}


// ======================================
// LOAD WISHLIST
// ======================================

displayWishlist();