// ==============================
// CHECKOUT PAGE
// ==============================

// Load Cart

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ==============================
// DISPLAY CHECKOUT PRODUCTS
// ==============================

function displayCheckout() {
    
    const container =
        document.getElementById("checkout-items");

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const totalElement =
        document.getElementById("checkout-total");


    if (!container) return;


    container.innerHTML = "";


    // ==============================
    // EMPTY CART
    // ==============================

    if (cart.length === 0) {

        container.innerHTML = `
            <h2>Your Cart Is Empty</h2>
        `;

        subtotalElement.textContent = "Rs. 0";
        totalElement.textContent = "Rs. 0";

        return;

    }


    // ==============================
    // TOTAL
    // ==============================

    let grandTotal = 0;


    // ==============================
    // PRODUCTS
    // ==============================

    cart.forEach(product => {

        const price =
            Number(product.price) || 0;

        const quantity =
            Number(product.quantity) || 1;

        const itemTotal =
            price * quantity;


        grandTotal += itemTotal;


        const image =
            product.images
                ? product.images[0]
                : product.image;


        container.innerHTML += `

            <div class="checkout-product">

             <img
                src="${image}"
                alt="${product.name}"
                loading="lazy"
                decoding="async"
            >

                <div class="checkout-product-info">

                    <h3>
                        ${product.name}
                    </h3>
                   
<div class="checkout-rating" id="checkout-rating-${product.id}"></div>
                    <p>
                        Price: Rs. ${price}
                    </p>

                    <p>
                        Quantity: ${quantity}
                    </p>

                    <strong>
                        Total: Rs. ${itemTotal}
                    </strong>

                </div>

            </div>

        `;

    });


    // ==============================
    // SHOW TOTAL
    // ==============================

    subtotalElement.textContent =
        "Rs. " + grandTotal;

    totalElement.textContent =
        "Rs. " + grandTotal;

}


// Display Checkout

displayCheckout();

// ==============================
// LOAD CHECKOUT REVIEWS
// ==============================

loadReviews()
    .then(() => {

        cart.forEach(product => {

            renderProductRating(
                product.id,
                `checkout-rating-${product.id}`
            );

        });

    })
    .catch(error => {

        console.error(
            "Checkout Reviews Error:",
            error
        );

    });


// ==============================
// PLACE ORDER ON WHATSAPP
// ==============================

const whatsappButton =
    document.getElementById("checkout-whatsapp");


if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        function () {


            // ==============================
            // CHECK CART
            // ==============================

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            // ==============================
            // CUSTOMER DETAILS
            // ==============================

            const name =
                document
                    .getElementById("checkout-name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("checkout-phone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("checkout-address")
                    .value
                    .trim();


            // ==============================
            // CHECK REQUIRED FIELDS
            // ==============================

            if (
                !name ||
                !phone ||
                !address
            ) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            // ==============================
            // CREATE ORDER MESSAGE
            // ==============================

            let message =
                `🛒 *New Order*\n\n`;


            cart.forEach(product => {

                const price =
                    Number(product.price) || 0;

                const quantity =
                    Number(product.quantity) || 1;

                const itemTotal =
                    price * quantity;


                message +=
                    `📦 Product: ${product.name}\n`;

                message +=
                    `💰 Price: Rs. ${price}\n`;

                message +=
                    `🔢 Quantity: ${quantity}\n`;

                message +=
                    `💵 Total: Rs. ${itemTotal}\n\n`;

            });


            // ==============================
            // GRAND TOTAL
            // ==============================

            let grandTotal = 0;


            cart.forEach(product => {

                const price =
                    Number(product.price) || 0;

                const quantity =
                    Number(product.quantity) || 1;

                grandTotal +=
                    price * quantity;

            });


            message +=
                `💰 *Grand Total: Rs. ${grandTotal}*\n\n`;


            // ==============================
            // CUSTOMER
            // ==============================

            message +=
                `👤 Customer: ${name}\n`;

            message +=
                `📞 Phone: ${phone}\n`;

            message +=
                `📍 Address: ${address}`;


            // ==============================
            // OPEN WHATSAPP
            // ==============================

            window.open(
                `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
                "_blank"
            );

        }
    );

}