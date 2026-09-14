const fs = require("fs");

const products = JSON.parse(
    fs.readFileSync("data/products.json", "utf8")
);

const baseUrl = "https://touchonscreen.com";

const urls = new Set();

// ==============================
// STATIC PAGES
// ==============================

urls.add(`${baseUrl}/`);
urls.add(`${baseUrl}/shop.html`);
urls.add(`${baseUrl}/about.html`);
urls.add(`${baseUrl}/contact.html`);

// ==============================
// CATEGORIES
// ==============================

const categories = [
    ...new Set(
        products
            .map(product => product.category)
            .filter(Boolean)
    )
];

categories.forEach(category => {
    urls.add(
        `${baseUrl}/category.html?cat=${encodeURIComponent(category)}`
    );
});

// ==============================
// PRODUCTS
// ==============================

products.forEach(product => {

    if (product.id) {
        urls.add(
            `${baseUrl}/product.html?id=${encodeURIComponent(product.id)}`
        );
    }

});

// ==============================
// CREATE SITEMAP
// ==============================

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${[...urls]
    .map(url => `    <url>
        <loc>${url}</loc>
    </url>`)
    .join("\n\n")}

</urlset>
`;

fs.writeFileSync("sitemap.xml", sitemap, "utf8");

console.log("Sitemap generated successfully!");