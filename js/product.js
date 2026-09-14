// ==============================
// SINGLE PRODUCT LOAD
// ==============================

// URL se product id lena

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const canonicalUrl = document.getElementById("canonical-url");

if (canonicalUrl) {
    canonicalUrl.href = window.location.origin + window.location.pathname + "?id=" + productId;
}


// ==============================
// PRODUCT LOAD
// ==============================

 window.productsPromise

.then(async products => {

    await loadReviews();


    // ==============================
    // FIND PRODUCT
    // ==============================

    const product = products.find(item => item.id == productId);

    if (!product) {

        console.log("Product Not Found");
        return;

    }
    // YAHAN OG CODE PASTE KARNA HAI
    const ogTitle = document.getElementById("og-title");
const ogDescription = document.getElementById("og-description");
const ogUrl = document.getElementById("og-url");
const ogImage = document.getElementById("og-image");

if (ogTitle) {
    ogTitle.content = `${product.name} | Touch On Screen`;
}

if (ogDescription) {
    ogDescription.content =
        `Buy ${product.name} in Pakistan with discreet packaging and fast delivery from Touch On Screen.`;
}

if (ogUrl) {
    ogUrl.content =
        window.location.origin + window.location.pathname + "?id=" + product.id;
}

if (ogImage) {
    ogImage.content =
    window.location.origin + "/" + (product.images ? product.images[0] : product.image);
}


    // ==============================
    // PRODUCT RATING
    // ==============================

    renderProductRating(product.id, "product-rating");


    // ==============================
    // PRODUCT IMAGES
    // ==============================

    const mainImage = document.getElementById("product-image");
    const thumbnails = document.getElementById("product-thumbnails");

    const images = product.images || [product.image];

    galleryImages = images;

    if (mainImage) {
        mainImage.src = images[0];
    }

    if (thumbnails) {

        thumbnails.innerHTML = "";

        if (images.length > 1) {

            images.forEach(img => {

                thumbnails.innerHTML += `
                    <img
                       src="${img}"
                       class="thumb"
                       alt="${product.name}"
                       decoding="async"
                    >
                `;

            });


            document.querySelectorAll(".thumb").forEach(thumb => {

                thumb.addEventListener("click", function () {

                    mainImage.src = this.src;

                });

            });

        } else {

            thumbnails.style.display = "none";

        }

    }


    // ==============================
    // PRODUCT INFORMATION
    // ==============================

    document.getElementById("product-name").textContent =
        product.name;

    document.getElementById("product-price").textContent =
        "Rs. " + Number(product.price);

    document.getElementById("product-short-description").textContent =
        product.shortDescription || "Product details coming soon";


    // ==============================
    // BUY NOW
    // ==============================

    document.getElementById("buy-now-btn").href =
        `order.html?id=${product.id}`;
   

    // ==============================
    // LONG DESCRIPTION
    // ==============================

    const longDescription =
        document.getElementById("product-long-description");

    if (longDescription) {

        longDescription.innerHTML =
            product.longDescription || "Full description coming soon";

    }


    // ==============================
    // PRODUCT TAGS
    // ==============================

    const tagsContainer =
        document.getElementById("product-tags");

    if (tagsContainer && product.tags) {

        tagsContainer.innerHTML = product.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join("");

    }


    // ==============================
    // RELATED PRODUCTS
    // ==============================

    const relatedContainer =
        document.getElementById("related-products");

    if (relatedContainer) {

        const relatedProducts = products.filter(item =>
            item.category === product.category &&
            item.id != product.id
        );

        relatedContainer.innerHTML = "";

        relatedProducts.forEach(item => {

            relatedContainer.innerHTML += `

                <div class="product-card">

                    <img
                       src="${item.images ? item.images[0] : item.image}"
                       alt="${item.name}"
                       loading="lazy"
                       decoding="async"
                  >

                    <h3>${item.name}</h3>

                    <div id="related-rating-${item.id}"></div>

                    <p>Rs. ${Number(item.price)}</p>

                    <a href="product.html?id=${item.id}">
                        View Product
                    </a>

                </div>

            `;

            renderProductRating(
                item.id,
                `related-rating-${item.id}`
            );

        });

    }


    // ==============================
    // SHOW PRODUCT REVIEWS
    // ==============================

    const productReviews =
        getProductReviews(product.id);

    const reviewsList =
        document.getElementById("reviews-list");

    if (reviewsList) {

        reviewsList.innerHTML = "";

        if (productReviews.length === 0) {

            reviewsList.innerHTML =
                "<p>No reviews yet.</p>";

        } else {

            productReviews.forEach(review => {

                reviewsList.innerHTML += `

                    <div class="review-item">

                        <div class="product-stars">
                            ${renderStars(review.rating)}
                        </div>

                       <h4>${review.name}</h4>

     ${review.email ? `<p class="review-email">${review.email}</p>` : ""}

                      <p>${review.comment}</p>

                    </div>

                `;

            });

        }

    }


    // ==============================
    // ADD TO CART
    // ==============================

    const addToCartBtn =
        document.getElementById("add-to-cart-btn");


    if (addToCartBtn) {

        addToCartBtn.addEventListener("click", function () {

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];


            const existing =
                cart.find(item => item.id == product.id);


            if (existing) {

                existing.quantity += 1;

            } else {

                cart.push({

                    id: product.id,

                    name: product.name,

                    price: Number(product.price),

                    images: product.images || [product.image],

                    quantity: 1

                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            // Check save

            console.log(
                "Cart Saved:",
                JSON.parse(localStorage.getItem("cart"))
            );


            // Cart page open

            window.location.href = "cart.html";

        });

    } else {

        console.log("Add To Cart button not found.");

    }


// ==============================
// HEADER WISHLIST ICON
// ==============================

const wishlistLinks = document.querySelectorAll(
    'a[title="Wishlist"]'
);

wishlistLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        // Product page پر Wishlist icon کا default link روکیں
        e.preventDefault();

        // Wishlist load
        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        // Check product already exists
        const exists =
            wishlist.find(item => item.id == product.id);

        if (exists) {

            alert("Product is already in your Wishlist ❤️");
            return;

        }

        // Product add
        wishlist.push({

            id: product.id,

            name: product.name,

            price: Number(product.price),

            images: product.images || [product.image]

        });

        // Save
        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("Product added to Wishlist ❤️");

});

});
})

.catch(error => {

    console.error("Product Load Error:", error);

});


// ==============================
// PRODUCT TABS
// ==============================

const tabButtons =
    document.querySelectorAll(".tab-btn");

const descriptionSection =
    document.getElementById("description-section");

const reviewsSection =
    document.getElementById("product-reviews");


tabButtons.forEach(button => {

    button.addEventListener("click", function () {

        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");


        if (this.dataset.tab === "description") {

            descriptionSection.style.display = "block";
            reviewsSection.style.display = "none";

        } else {

            descriptionSection.style.display = "none";
            reviewsSection.style.display = "block";

        }

    });

});