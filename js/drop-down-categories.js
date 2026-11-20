
// ======================================
// TOUCH ON SCREEN - CATEGORY DROPDOWN
// Supports Unlimited Nested Categories
// ======================================


// Build Category Menu Recursively

function buildCategoryMenu(items, level = 0) {

    return items.map(item => {

        const children = item.subcategories || [];
        const hasChildren = children.length > 0;

        const link = item.link ||
            (item.slug
                ? `category.html?cat=${encodeURIComponent(item.slug)}`
                : "#");

        return `
            <li data-level="${level}">

                <a href="${link}">
                    ${item.name}

                    ${hasChildren
                        ? '<i class="fa-solid fa-angle-right"></i>'
                        : ''
                    }
                </a>

                ${hasChildren ? `
                    <ul class="sub-category"
                        style="display:none;">

                        ${buildCategoryMenu(children, level + 1)}

                    </ul>
                ` : ''}

            </li>
        `;

    }).join("");

}


// Load Categories

fetch("data/categories.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Categories could not be loaded.");
        }

        return response.json();

    })
    .then(categories => {

        const desktopMenu =
            document.querySelector(".category-menu");

        if (!desktopMenu) return;

        desktopMenu.innerHTML =
            buildCategoryMenu(categories);


        // ==================================
        // HOVER - OPEN NESTED SUBCATEGORIES
        // ==================================

        desktopMenu.querySelectorAll("li").forEach(li => {

            const submenu =
                li.querySelector(":scope > .sub-category");

            if (!submenu) return;

            const level =
                Number(li.dataset.level);

            // Nested menu positioning
            if (level > 0) {

                li.style.position = "relative";

                submenu.style.position = "absolute";
                submenu.style.left = "100%";
                submenu.style.top = "0";
                submenu.style.zIndex = "9999";

            }

            // Mouse enters category
            li.addEventListener("mouseenter", () => {

                submenu.style.display = "block";

            });

            // Mouse leaves category
            li.addEventListener("mouseleave", () => {

                submenu.style.display = "none";

            });

        });

    })
    .catch(error => {

        console.error(
            "Categories Load Error:",
            error
        );

    });


// ======================================
// CATEGORY BUTTON
// ======================================

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
