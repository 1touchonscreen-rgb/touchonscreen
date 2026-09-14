// ==========================
// LOAD CART
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// DISPLAY CART
// ==========================

function displayCart(){

    const cartContainer=document.getElementById("cart-items");
    const subtotal=document.getElementById("cart-subtotal");
    const total=document.getElementById("cart-total");

    if(!cartContainer) return;

    cartContainer.innerHTML="";

    if(cart.length===0){

        cartContainer.innerHTML=`
            <h2>Your Cart Is Empty</h2>
        `;

        subtotal.innerText="Rs. 0";
        total.innerText="Rs. 0";

        return;
    }

    let grandTotal=0;

    cart.forEach((product,index)=>{

        const itemTotal=product.price*product.quantity;

        grandTotal+=itemTotal;

       cartContainer.innerHTML += `
    <div class="cart-product">

        <img src="${product.images[0]}" alt="${product.name}">

        <div class="cart-info">

            <h3>${product.name}</h3>
             <div class="cart-rating" id="cart-rating-${product.id}"></div>

            <p>Rs. ${product.price}</p>

            <div class="cart-qty">

                <button onclick="decreaseQty(${index})">-</button>

                <span>${product.quantity}</span>

                <button onclick="increaseQty(${index})">+</button>

            </div>

            <p>
                <strong>Rs. ${itemTotal}</strong>
            </p>

            <button class="remove-btn" onclick="removeCart(${index})">
                Remove
            </button>

        </div>

    </div>
`;
renderProductRating(product.id, `cart-rating-${product.id}`);

    });

    subtotal.innerText="Rs. "+grandTotal;
    total.innerText="Rs. "+grandTotal;

}

displayCart();


// ==========================
// INCREASE
// ==========================

function increaseQty(index){

    cart[index].quantity++;

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}


// ==========================
// DECREASE
// ==========================

function decreaseQty(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}


// ==========================
// REMOVE
// ==========================

function removeCart(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}

// ==========================
// CLEAR CART  Pura cart ek click mein empty ho jaye.
// ==========================

function clearCart(){

    if(confirm("Are you sure you want to clear the cart?")){

        cart = [];

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

}

// ==========================
// CHECKOUT   Agar cart empty ho to checkout page par na jane de.
// ==========================

const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", function(e){

        if(cart.length === 0){

            e.preventDefault();

            alert("Your cart is empty.");

        }

    });

}

// ==========================
// UPDATE CART COUNT Baad mein jab header mein badge lagayenge to ye function kaam aayega.
// ==========================

function updateCartCount(){

    const badge = document.getElementById("cart-count");

    if(!badge) return;

    let count = 0;

    cart.forEach(item=>{

        count += item.quantity;

    });

    badge.innerText = count;

}

