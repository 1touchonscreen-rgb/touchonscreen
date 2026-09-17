// ==============================
// Touch On Screen Logo - MAIN SCRIPT
// ==============================


// ==============================
// SHARED PRODUCTS DATA
// ==============================
// products.json ko baar-baar fetch hone se bachata hai

window.productsPromise = window.productsPromise || fetch("data/products.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Products could not be loaded.");
        }

        return response.json();

    });


// ==============================
// CATEGORY CLICK DROPDOWN
// ==============================

fetch("data/categories.json")
    .then(response => response.json())
    .then(categories => {

        const desktopMenu =
            document.querySelector(".category-menu");

        if (!desktopMenu) return;

        desktopMenu.innerHTML = "";

        categories.forEach(category => {

            desktopMenu.innerHTML += `

                <li>

                    <a href="#">
                        ${category.name}
                        <i class="fa-solid fa-angle-right"></i>
                    </a>

                    <ul class="sub-category">

                        ${category.subcategories.map(sub => `

                            <li>
                                <a href="${sub.link}">
                                    ${sub.name}
                                </a>
                            </li>

                        `).join("")}

                    </ul>

                </li>

            `;

        });

    })
    .catch(error => {

        console.error(
            "Categories Load Error:",
            error
        );

    });


// ==============================
// CATEGORY BUTTON
// ==============================

const categoryBtn =
    document.querySelector(".category-dropdown > a");

const categoryBox =
    document.querySelector(".category-dropdown");

if (categoryBtn && categoryBox) {

    categoryBtn.addEventListener("click", function(e) {

        e.preventDefault();

        categoryBox.classList.toggle("active");

    });

}


// ==============================
// DESKTOP VIEW ONLY
// ==============================

if (window.innerWidth > 768) {


    // ==========================
    // LOAD HOMEPAGE PRODUCTS
    // ==========================

    window.productsPromise
        .then(async products => {

            await loadReviews();


            // ==========================
            // LATEST PRODUCTS
            // ==========================

            const latestProductsContainer =
                document.getElementById("latest-products");

            if (latestProductsContainer) {

                latestProductsContainer.innerHTML = "";

                products.slice(0, 4).forEach(product => {

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
                                    class="latest-rating"
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


                // Yahan featured category change karni hai

                 const featuredCategory = "breast-enlargement";

const featuredProducts = products
    .filter(product => product.category === featuredCategory)
    .slice(0, 4);
featuredProducts.forEach(product => {


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
                                        class="featured-rating"
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
                "Homepage Products Error:",
                error
            );

        });

}


// ==============================
// PRODUCT SEARCH
// ==============================

const searchInputs =
    document.querySelectorAll(
        ".search-box input, .mobile-search input"
    );

const searchButtons =
    document.querySelectorAll(
        ".search-box button, .mobile-search button"
    );


// ==============================
// SEARCH DATA
// ==============================

let allSearchProducts = [];


// Search products ko same shared request se load karo

if (searchInputs.length > 0 || searchButtons.length > 0) {

    window.productsPromise
        .then(products => {

            allSearchProducts = products;


            // ==========================
            // SEARCH INPUTS
            // ==========================

            searchInputs.forEach(input => {

                const suggestionsBox =
                    document.createElement("div");

                suggestionsBox.className =
                    "search-suggestions";

                input.parentElement.appendChild(
                    suggestionsBox
                );


                // ==========================
                // LIVE SEARCH
                // ==========================

                input.addEventListener(
                    "input",
                    function() {

                        const searchText =
                            this.value
                                .trim()
                                .toLowerCase();

                        suggestionsBox.innerHTML = "";


                        if (!searchText) {

                            suggestionsBox.style.display =
                                "none";

                            return;

                        }


                        const matches =
                            allSearchProducts
                                .filter(product => {

                                    const name =
                                        product.name
                                            .toLowerCase();

                                    return name.includes(
                                        searchText
                                    );

                                })
                                .slice(0, 6);


                        // ==========================
                        // NO RESULT
                        // ==========================

                        if (matches.length === 0) {

                            suggestionsBox.innerHTML = `

                                <div class="no-search-result">
                                    No Products Found
                                </div>

                            `;

                            suggestionsBox.style.display =
                                "block";

                            return;

                        }


                        // ==========================
                        // SUGGESTIONS
                        // ==========================

                        matches.forEach(product => {

                            const suggestion =
                                document.createElement("a");

                            suggestion.href =
                                `product.html?id=${product.id}`;

                            suggestion.className =
                                "search-suggestion";


                            const image =
                                product.images &&
                                product.images.length
                                    ? product.images[0]
                                    : product.image;


                            suggestion.innerHTML = `

                                <img
                                    src="${image}"
                                    alt="${product.name}"
                                >

                                <span>
                                    ${product.name}
                                </span>

                            `;

                            suggestionsBox.appendChild(
                                suggestion
                            );

                        });


                        suggestionsBox.style.display =
                            "block";

                    }
                );


                // ==========================
                // ENTER KEY SEARCH
                // ==========================

                input.addEventListener(
                    "keydown",
                    function(e) {

                        if (e.key !== "Enter") return;


                        const searchText =
                            this.value
                                .trim()
                                .toLowerCase();

                        if (!searchText) return;


                        const product =
                            allSearchProducts.find(
                                product =>
                                    product.name
                                        .toLowerCase()
                                        .includes(searchText)
                            );


                        if (product) {

                            window.location.href =
                                `product.html?id=${product.id}`;

                        }

                    }
                );


                // ==========================
                // CLOSE SUGGESTIONS
                // ==========================

                input.addEventListener(
                    "blur",
                    function() {

                        setTimeout(() => {

                            suggestionsBox.style.display =
                                "none";

                        }, 150);

                    }
                );

            });


            // ==========================
            // SEARCH BUTTON
            // ==========================

            searchButtons.forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const input =
                            this.parentElement
                                .querySelector("input");

                        if (!input) return;


                        const searchText =
                            input.value
                                .trim()
                                .toLowerCase();

                        if (!searchText) return;


                        const product =
                            allSearchProducts.find(
                                product =>
                                    product.name
                                        .toLowerCase()
                                        .includes(searchText)
                            );


                        if (product) {

                            window.location.href =
                                `product.html?id=${product.id}`;

                        }

                    }
                );

            });

        })
        .catch(error => {

            console.error(
                "Search Products Load Error:",
                error
            );

        });

}


// ==============================
// FLOATING WHATSAPP
// ==============================

const floatingWhatsApp =
    document.querySelector(".floating-whatsapp");

if (floatingWhatsApp) {

    floatingWhatsApp.addEventListener(
        "click",
        function(e) {

            e.preventDefault();


            const currentURL =
                window.location.href;


            // ==========================
            // PRODUCT PAGE
            // ==========================

            const productId =
                new URLSearchParams(
                    window.location.search
                ).get("id");


            if (productId) {

                window.productsPromise
                    .then(products => {

                        const product =
                            products.find(
                                item =>
                                    item.id == productId
                            );


                        if (product) {

                            const message =
                                `Hello, I am interested in:\n\n` +
                                `📦 Product: ${product.name}\n` +
                                `🔗 Product Link: ${currentURL}`;


                            window.open(
                                `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
                                "_blank"
                            );

                        }

                    })
                    .catch(error => {

                        console.error(
                            "Floating WhatsApp Error:",
                            error
                        );

                    });

                return;

            }


            // ==========================
            // OTHER PAGES
            // ==========================

            const message =
                `Hello, I am interested in your products.\n\n` +
                `🔗 Page Link: ${currentURL}`;


            window.open(
                `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
                "_blank"
            );

        }
    );

}
