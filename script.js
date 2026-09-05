let menu = [];

let cartCount = 0;

const foodContainer =
    document.getElementById("foodContainer");

const noFood =
    document.getElementById("noFood");

const searchInput =
    document.getElementById("searchInput");

const cartCounter =
    document.getElementById("cartCount");

const categoriesContainer =
    document.getElementById("categoriesContainer");

const fallbackImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=85";


async function loadMenu() {

    try {

        const response =
            await fetch("menu.json");

        if (!response.ok) {
            throw new Error("Failed to load menu.json");
        }

        const data =
            await response.json();

        menu = data.menu;

        loadFeaturedImages(
            data.featuredImages
        );

        displayCategories(
            data.categories
        );

        displayFood(menu);

    } catch (error) {

        console.error(error);

        foodContainer.innerHTML = "";

        noFood.textContent =
            "Unable to load menu.";

        noFood.style.display =
            "block";
    }
}


function loadFeaturedImages(images) {

    document.getElementById("heroImage").src =
        images.hero;

    document.getElementById("studentDealImage").src =
        images.studentDeal;

    document.getElementById("firstOrderImage").src =
        images.firstOrder;

    document.getElementById("thaliComboImage").src =
        images.thaliCombo;

    document.querySelectorAll(
        "#heroImage, #studentDealImage, #firstOrderImage, #thaliComboImage"
    ).forEach(image => {

        image.onerror = function () {

            this.onerror = null;

            this.src = fallbackImage;

        };

    });
}


function displayCategories(categories) {

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const card =
            document.createElement("div");

        card.className =
            "category-card";

        card.dataset.category =
            category.name;

        card.innerHTML = `
            <h3>
                ${category.title}
            </h3>

            <img
                src="${category.image}"
                alt="${category.title}"
                onerror="this.onerror=null;this.src='${fallbackImage}'"
            >

            <p>
                ${category.name}
            </p>

            <span>
                ${category.items}
            </span>
        `;

        categoriesContainer.appendChild(card);

    });

    document.querySelectorAll(
        ".category-card"
    ).forEach(card => {

        card.addEventListener(
            "click",
            () => {

                filterCategory(
                    card.dataset.category
                );

            }
        );

    });
}


function displayFood(items) {

    foodContainer.innerHTML = "";

    if (items.length === 0) {

        noFood.textContent =
            "No food items found.";

        noFood.style.display =
            "block";

        return;
    }

    noFood.style.display =
        "none";

    items.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "food-card";

        card.innerHTML = `
            <div class="food-image-card">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    onerror="this.onerror=null;this.src='${fallbackImage}'"
                >

                <span class="discount">
                    ${item.discount}
                </span>

            </div>

            <div class="food-details">

                <div class="food-title">

                    <h3>
                        ${item.name}
                    </h3>

                    <span class="rating">
                        ★ ${item.rating}
                    </span>

                </div>

                <p>
                    ${item.description}
                </p>

                <div class="price-row">

                    <span class="price">
                        ₹${item.price}
                    </span>

                    <button
                        class="add-btn"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

            </div>
        `;

        foodContainer.appendChild(card);

    });

    document.querySelectorAll(
        ".add-btn"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    Number(button.dataset.id);

                addToCart(id);

            }
        );

    });
}


function searchFood() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    const filteredFood =
        menu.filter(item =>

            item.name
                .toLowerCase()
                .includes(searchText) ||

            item.category
                .toLowerCase()
                .includes(searchText) ||

            item.description
                .toLowerCase()
                .includes(searchText)

        );

    displayFood(filteredFood);
}


function filterCategory(category) {

    const filteredFood =
        menu.filter(item =>
            item.category === category
        );

    displayFood(filteredFood);

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function showAllFood() {

    displayFood(menu);

    document.getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function addToCart(id) {

    const selectedFood =
        menu.find(item =>
            item.id === id
        );

    if (!selectedFood) {
        return;
    }

    cartCount++;

    cartCounter.textContent =
        cartCount;

    alert(
        selectedFood.name +
        " added to cart!"
    );
}


function showOffer() {

    alert(
        "Use code WELCOME20 to get 20% OFF on your first order!"
    );
}


function subscribe() {

    const email =
        document.getElementById("email")
            .value
            .trim();

    if (email === "") {

        alert(
            "Please enter your email."
        );

        return;
    }

    alert(
        "Thank you for subscribing!"
    );

    document.getElementById("email")
        .value = "";
}


document.getElementById("searchBtn")
    .addEventListener(
        "click",
        searchFood
    );


searchInput.addEventListener(
    "keyup",
    event => {

        if (event.key === "Enter") {
            searchFood();
        }

    }
);


document.getElementById("menuBtn")
    .addEventListener(
        "click",
        showAllFood
    );


document.getElementById("orderBtn")
    .addEventListener(
        "click",
        showAllFood
    );


document.getElementById("studentDealBtn")
    .addEventListener(
        "click",
        showAllFood
    );


document.getElementById("firstOrder")
    .addEventListener(
        "click",
        showOffer
    );


document.getElementById("thaliBtn")
    .addEventListener(
        "click",
        showAllFood
    );


document.getElementById("viewAll")
    .addEventListener(
        "click",
        showAllFood
    );


document.getElementById("viewAllCategories")
    .addEventListener(
        "click",
        () => {

            document.getElementById("categories")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


document.getElementById("subscribeBtn")
    .addEventListener(
        "click",
        subscribe
    );


loadMenu();