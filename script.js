let products = [];
let container = document.getElementById("main");
let searchInput = document.getElementById("box");
let suggestionBox = document.getElementById("sugesstions");
let btn = document.getElementById("btn");

// Fetch products
fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        products = data.products;
        display(products);
    })
    .catch(error => console.log("Error:", error));

function display(products) {
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<h2>No product available</h2>";
        return;
    }

    products.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";

        let img = document.createElement("img");
        img.src = product.thumbnail;

        let name = document.createElement("h3");
        name.textContent = product.title;

        let price = document.createElement("p");
        price.textContent = "$ " + product.price;

        card.append(img, name, price);
        container.appendChild(card);
    });
}

// Button search
btn.addEventListener("click", () => {
    let val = searchInput.value.toLowerCase();

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (val && !history.some(item => item.query === val)) {
        history.push({ query: val, time: Date.now() });
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }

    let filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(val)
    );

    display(filteredProducts);
});

// Suggestions
searchInput.addEventListener("input", () => {
    let text = searchInput.value.toLowerCase();
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    let matches = history.filter(item =>
        item.query.includes(text)
    );

    suggestionBox.innerHTML = "";

    matches.forEach(item => {
        let div = document.createElement("div");
        div.textContent = item.query;
        div.onclick = () => {
            searchInput.value = item.query;
            suggestionBox.innerHTML = "";
        };
        suggestionBox.appendChild(div);
    });
});
