// ==============================
// LOAD REVIEWS
// ==============================

let allReviews = [];


// ==============================
// GET PRODUCT REVIEWS
// ==============================

function getProductReviews(productId) {

    return allReviews.filter(review => review.productId == productId);

}

// ==============================
// GET AVERAGE RATING
// ==============================

function getAverageRating(productId) {

    const reviews = getProductReviews(productId);

    if (reviews.length === 0) {

        return {
            average: 0,
            total: 0
        };

    }

    const totalRating = reviews.reduce((sum, review) => {

        return sum + review.rating;

    }, 0);

    return {

        average: totalRating / reviews.length,

        total: reviews.length

    };

}

// ==============================
// RENDER STARS
// ==============================

function renderStars(rating) {

    const fullStars = Math.round(rating);

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars += i <= fullStars ? "★" : "☆";

    }

    return stars;

}

// ==============================
// RENDER PRODUCT RATING
// ==============================

function renderProductRating(productId, elementId) {

    const element = document.getElementById(elementId);

    if (!element) return;

    const ratingData = getAverageRating(productId);
    if (ratingData.total === 0) {

    element.innerHTML = `
        <span class="product-stars">☆☆☆☆☆</span>
        <span class="product-rating-number">
            (0 Reviews)
        </span>
    `;

    return;
}

  const isMobile = window.innerWidth <= 768;

element.innerHTML = `
    <span class="product-stars">
        ${renderStars(ratingData.average)}
    </span>

    ${
        !isMobile
        ? `<span class="product-rating-number">
            ${ratingData.average.toFixed(1)}
            (${ratingData.total} Reviews)
          </span>`
        : ""
    }
`;

}

let reviewsLoaded = false;

async function loadReviews() {

    if (reviewsLoaded) return;

    try {

        const response = await fetch("data/reviews.json");

        allReviews = await response.json();

        reviewsLoaded = true;

    } catch (error) {

        console.log("Reviews Error:", error);

    }

}