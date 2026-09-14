// ==============================
// ORDER PAGE LOAD
// ==============================

// URL se product ID lena

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


// ==============================
// LOAD PRODUCTS
// ==============================

fetch("data/products.json")

    .then(response => response.json())

    .then(products => {

        // ==============================
        // FIND PRODUCT
        // ==============================

        const product = products.find(
            item => item.id == productId
        );


        // ==============================
        // PRODUCT NOT FOUND
        // ==============================

        if (!product) {

            console.log("Product Not Found");

            return;

        }


        // ==============================
        // PRODUCT IMAGE
        // ==============================

        const orderImage =
            document.getElementById("order-image");

        if (orderImage) {

            const images =
                product.images || [product.image];

            orderImage.src = images[0];
            orderImage.alt = product.name;

        }


        // ==============================
        // PRODUCT NAME
        // ==============================

        const orderName =
            document.getElementById("order-name");

        if (orderName) {

            orderName.textContent =
                product.name;

        }


        // ==============================
        // PRODUCT PRICE
        // ==============================

        const orderPrice =
            document.getElementById("order-price");

        if (orderPrice) {

            orderPrice.textContent =
                "Rs. " + Number(product.price);

        }


        // ==============================
        // WHATSAPP ORDER BUTTON
        // ==============================

        const whatsappButton =
            document.getElementById("whatsapp-order");


        if (whatsappButton) {

            whatsappButton.addEventListener("click", function () {


                // ==============================
                // CUSTOMER DETAILS
                // ==============================

                const name =
                    document
                        .getElementById("customer-name")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("customer-phone")
                        .value
                        .trim();


                const address =
                    document
                        .getElementById("customer-address")
                        .value
                        .trim();


                // ==============================
                // CHECK REQUIRED FIELDS
                // ==============================

                if (!name || !phone || !address) {

                    alert(
                        "Please fill all required fields."
                    );

                    return;

                }


                // ==============================
                // WHATSAPP MESSAGE
                // ==============================

                const message = `🛒 New Order

📦 Product:
${product.name}

💰 Price:
Rs. ${product.price}

👤 Customer:
${name}

📞 Phone:
${phone}

📍 Address:
${address}

Please confirm my order.`;


                // ==============================
                // OPEN WHATSAPP
                // ==============================

                window.open(
                    `https://wa.me/923286848461?text=${encodeURIComponent(message)}`,
                    "_blank"
                );

            });

        }

    })


    // ==============================
    // ERROR
    // ==============================

    .catch(error => {

        console.error(
            "Order Page Error:",
            error
        );

    });