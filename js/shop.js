// ==========================
// SHOP PAGE
// ==========================

let allProducts = [];

window.productsPromise
.then(products => {

    allProducts = products;

    displayProducts(allProducts);

    document.getElementById("product-count").textContent =
        allProducts.length + " Products Found";

})
.catch(error => console.log(error));



// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(products){

    const container = document.getElementById("shop-products");

    container.innerHTML = "";

    products.forEach(product => {

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
        <div class="shop-rating" id="shop-rating-${product.id}"></div>
        <p>Rs. ${product.price}</p>

    </div>

</a>

`;
renderProductRating(product.id, `shop-rating-${product.id}`);
    });

}

// ==========================
// SORT PRODUCTS
// ==========================


const sortProducts = document.getElementById("sort-products");

if (sortProducts) {

    sortProducts.addEventListener("change", function(){

        let sorted = [...allProducts];

        if(this.value === "low-high"){

            sorted.sort((a,b)=>
                Number(a.price.toString().replace(/[^\d]/g,'')) -
                Number(b.price.toString().replace(/[^\d]/g,''))
            );

        }

        else if(this.value === "high-low"){

            sorted.sort((a,b)=>
                Number(b.price.toString().replace(/[^\d]/g,'')) -
                Number(a.price.toString().replace(/[^\d]/g,''))
            );

        }

        displayProducts(sorted);

    });

}