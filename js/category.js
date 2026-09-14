// URL se category lo
const params = new URLSearchParams(window.location.search);
const currentCategory = params.get("cat");

const canonicalUrl = document.getElementById("canonical-url");

if (canonicalUrl) {
    canonicalUrl.href =
        window.location.origin +
        window.location.pathname +
        (currentCategory ? "?cat=" + encodeURIComponent(currentCategory) : "");
}


// ==============================
// DYNAMIC SEO
// ==============================

const seoCategory = currentCategory
    ? currentCategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase())
    : "Products";

document.title =
    seoCategory.toLowerCase().endsWith("products")
        ? `${seoCategory} in Pakistan | Touch On Screen`
        : `${seoCategory} Products in Pakistan | Touch On Screen`;

const metaDescription = document.querySelector('meta[name="description"]');

if (metaDescription) {
    metaDescription.content =
        `Shop ${seoCategory} in Pakistan with discreet packaging, fast delivery, and trusted quality from Touch On Screen.`;
}


// ==============================
// OPEN GRAPH
// ==============================

const ogTitle = document.getElementById("og-title");
const ogDescription = document.getElementById("og-description");
const ogUrl = document.getElementById("og-url");
const ogImage = document.getElementById("og-image");

if (ogTitle) {
    ogTitle.content =
        `${seoCategory} Products in Pakistan | Touch On Screen`;
}

if (ogDescription) {
    ogDescription.content =
        `Shop ${seoCategory} products in Pakistan with discreet packaging, fast delivery, and trusted quality from Touch On Screen.`;
}

if (ogUrl) {
    ogUrl.content = window.location.href;
}

if (ogImage) {
    ogImage.content =
        window.location.origin + "/images/hero-product.webp";
}

// Elements
const title = document.getElementById("category-title");
const container = document.getElementById("category-products");

// Products Load
window.productsPromise
    .then(async products => {

    await loadReviews();

        // Sirf current category ke products
        const filtered = products.filter(product => product.category === currentCategory);
        
        // Category Title
        title.textContent = currentCategory
            ? currentCategory.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
            : "Products";

            // Breadcrumb
document.getElementById("breadcrumb-category").textContent = title.textContent;

// Product Count
document.getElementById("category-count").textContent =
`${filtered.length} Products Found`;

// No Products Found
if(filtered.length === 0){

    container.innerHTML = "<h2>No Products Found</h2>";

    return;

}
      container.innerHTML = "";
        // Products Show
        filtered.forEach(product => {

    container.innerHTML += `
    

    <a href="product.html?id=${product.id}" class="product-card">

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
                <div class="product-rating" id="rating-${product.id}"></div>
            <p>Rs. ${product.price}</p>

        </div>

    </a>

    `;
renderProductRating(product.id, `rating-${product.id}`);
});

    })
    .catch(error => console.log(error));