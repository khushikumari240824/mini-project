let container = document.getElementById("product-details");
let productId = localStorage.getItem("selectedProductId");

if (!productId) {
    container.innerHTML = "<h2>No product selected</h2>";
} else {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(res => res.json())
        .then(product => showProduct(product))
        .catch(err => console.log(err));
}

function showProduct(product) {
    container.innerHTML = `
        <div class="detail-card">
            <img src="${product.thumbnail}">
            <h2>${product.title}</h2>
            <p><b>Price:</b> $${product.price}</p>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Description:</b> ${product.description}</p>
            <p><b>Rating:</b> ⭐ ${product.rating}</p>
            <p><b>Stock:</b> ${product.stock}</p>
        </div>
    `;
}

function goBack() {
    window.history.back();
}
