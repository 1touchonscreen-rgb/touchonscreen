const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const productsPath = path.join(root, "data", "products.json");
const outputDir = path.join(root, "share");
const sitemapPath = path.join(root, "sitemap.xml");

const products = JSON.parse(
    fs.readFileSync(productsPath, "utf8")
);

fs.mkdirSync(outputDir, { recursive: true });

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, "-and-")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function escapeHtml(text = "") {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================
   GENERATE FACEBOOK SHARE PAGES
   ========================================= */

products.forEach((product) => {
    const slug = slugify(product.name);

    const productUrl =
        `https://touchonscreen.com/product.html?id=${product.id}`;

    const shareUrl =
        `https://touchonscreen.com/share/${slug}/`;

    const imageUrl =
        `https://touchonscreen.com/${product.images[0]}`;

    const description =
        product.shortDescription ||
        `Shop ${product.name} online from TouchOnScreen.`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>${escapeHtml(product.name)} | TouchOnScreen</title>

    <meta
        name="description"
        content="${escapeHtml(description)}"
    >

    <meta property="og:type" content="product">

    <meta
        property="og:title"
        content="${escapeHtml(product.name)}"
    >

    <meta
        property="og:description"
        content="${escapeHtml(description)}"
    >

    <meta
        property="og:image"
        content="${imageUrl}"
    >
    <meta property="og:image:url" content="${imageUrl}">
    <meta property="og:image:secure_url" content="${imageUrl}">
    <meta property="og:image:alt" content="${escapeHtml(product.name)}">

    <meta
        property="og:url"
        content="${shareUrl}"
    >

    <meta
        property="og:site_name"
        content="TouchOnScreen"
    >

    <meta
        name="twitter:card"
        content="summary_large_image"
    >

    <meta
        name="twitter:title"
        content="${escapeHtml(product.name)}"
    >

    <meta
        name="twitter:description"
        content="${escapeHtml(description)}"
    >

    <meta
        name="twitter:image"
        content="${imageUrl}"
    >

    <link
        rel="canonical"
        href="${productUrl}"
    >
    <script>
        window.location.replace(${JSON.stringify(productUrl)});
    </script>
</head>

<body>
    <p>
        Opening
        <a href="${productUrl}">
            ${escapeHtml(product.name)}
        </a>
    </p>
</body>
</html>`;

    const productDir = path.join(outputDir, slug);

    fs.mkdirSync(productDir, { recursive: true });

    fs.writeFileSync(
        path.join(productDir, "index.html"),
        html,
        "utf8"
    );

    console.log(`Created share page: /share/${slug}/`);
});


/* =========================================
   GENERATE SITEMAP.XML
   ========================================= */

const staticUrls = [
    "https://touchonscreen.com/",
    "https://touchonscreen.com/shop.html",
    "https://touchonscreen.com/about.html",
    "https://touchonscreen.com/contact.html"
];

/*
   Get all unique categories directly
   from products.json
*/
const categories = [
    ...new Set(
        products
            .map(product => product.category)
            .filter(Boolean)
    )
];

const categoryUrls = categories.map(
    category =>
        `https://touchonscreen.com/category.html?cat=${encodeURIComponent(category)}`
);

const productUrls = products.map(
    product =>
        `https://touchonscreen.com/product.html?id=${product.id}`
);

const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...productUrls
];

const sitemapEntries = allUrls
    .map(url => `    <url>\n        <loc>${url}</loc>\n    </url>`)
    .join("\n\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${sitemapEntries}

</urlset>
`;

fs.writeFileSync(
    sitemapPath,
    sitemap,
    "utf8"
);

console.log("Sitemap generated successfully.");
console.log(`Products: ${products.length}`);
console.log(`Categories: ${categories.length}`);
console.log(`Total sitemap URLs: ${allUrls.length}`);
