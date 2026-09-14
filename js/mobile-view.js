// ==============================
// MOBILE VIEW PRODUCTS
// ==============================

if (window.innerWidth <= 768) {

    // ==========================
    // LOAD MOBILE PRODUCTS
    // ==========================

    window.productsPromise
        .then(async products => {

            await loadReviews();


            // ==========================
            // LATEST PRODUCTS (2 ONLY)
            // ==========================

            const latestProductsContainer =
                document.getElementById("latest-products");

            if (latestProductsContainer) {

                latestProductsContainer.innerHTML = "";

                products.slice(0, 2).forEach(product => {

                    latestProductsContainer.innerHTML += `

                        <a
                            href="product.html?id=${product.id}"
                            class="product-card"
                        >

                            <div class="product-image">

                                <img
                                  src="${product.images[0]}"
                                  alt="${product.name}"
                                  loading="lazy"
                                  decoding="async"
                                >

                            </div>

                            <div class="product-info">

                                <h3>${product.name}</h3>

                                <div
                                    id="latest-rating-${product.id}"
                                ></div>

                                <p>Rs. ${product.price}</p>

                            </div>

                        </a>

                    `;

                    renderProductRating(
                        product.id,
                        `latest-rating-${product.id}`
                    );

                });

            }


            // ==========================
            // FEATURED PRODUCTS
            // ==========================

            const featuredContainer =
                document.getElementById("featured-products");

            if (featuredContainer) {

                featuredContainer.innerHTML = "";


                // Featured categories
                const featuredCategories = [
                    "female-care",
                    "female-care"
                ];


                let featuredProducts = [];


                featuredCategories.forEach(category => {

                    const categoryProducts =
                        products.filter(product =>
                            product.category === category
                        );

                    featuredProducts.push(
                        ...categoryProducts.slice(0, 2)
                    );

                });


                console.log(
                    "Featured Products:",
                    featuredProducts
                );


                // Existing behavior preserve
                featuredProducts
                    .slice(0, 2)
                    .forEach(product => {

                        featuredContainer.innerHTML += `

                            <a
                                href="product.html?id=${product.id}"
                                class="product-card"
                            >

                                <div class="product-image">

                                  <img
                                       src="${product.images[0]}"
                                       alt="${product.name}"
                                       loading="lazy"
                                       decoding="async"
                                   >

                                </div>

                                <div class="product-info">

                                    <h3>${product.name}</h3>

                                    <div
                                        id="featured-rating-${product.id}"
                                    ></div>

                                    <p>Rs. ${product.price}</p>

                                </div>

                            </a>

                        `;

                        renderProductRating(
                            product.id,
                            `featured-rating-${product.id}`
                        );

                    });

            }

        })
        .catch(error => {

            console.error(
                "Mobile Products Load Error:",
                error
            );

        });

}


// ==============================
// MOBILE CATEGORY LOAD
// ==============================

fetch("data/categories.json")
    .then(response => response.json())
    .then(categories => {

        const mobileMenu =
            document.querySelector(".mobile-menu");

        if (!mobileMenu) return;

        mobileMenu.innerHTML = "";

        categories.forEach(category => {

            mobileMenu.innerHTML += `

                <li class="mobile-category-item">

                    <div class="mobile-category-title">

                        ${category.name}

                        <i class="fa-solid fa-angle-down"></i>

                    </div>

                    <ul class="mobile-sub-category">

                        ${category.subcategories
                            .map(sub => `

                                <li>

                                    <a href="${sub.link}">
                                        ${sub.name}
                                    </a>

                                </li>

                            `)
                            .join("")}

                    </ul>

                </li>

            `;

        });

    })
    .catch(error => {

        console.error(
            "Mobile Categories Load Error:",
            error
        );

    });


// ==============================
// MOBILE CATEGORY BUTTON
// ==============================

const mobileCategoryBtn =
    document.querySelector(".mobile-category-btn");

const mobileMenu =
    document.querySelector(".mobile-menu");

if (mobileCategoryBtn && mobileMenu) {

    mobileCategoryBtn.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle("active");

        }
    );

}