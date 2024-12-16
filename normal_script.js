document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productsDiv = document.getElementById("products");
  const apiUrl = "http://localhost:3000/product";

  fetchProducts();

  productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("price", document.getElementById("price").value);
    const fileInput = document.getElementById("image");
    if (fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]);
    }
    console.log("formdata image is ", formData.get("image"));

    const productId = document.getElementById("productId").value;

    if (productId) {
      fetch(`${apiUrl}/${productId}`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          fetchProducts();
          productForm.reset();
        });
    } else {
      // Create product
      fetch(apiUrl, {
        method: "POST",
        body: formData,
        // Removing Content-Type header as it is automatically set by FormData
      })
        .then((response) => response.json())
        .then(() => {
          fetchProducts();
          productForm.reset();
        })
        .catch((err) => console.log(err));
    }
  });

  // Fetch and display products
  function fetchProducts() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((products) => {
        productsDiv.innerHTML = "";
        products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.innerHTML = `
             <img src="http://localhost:3000/${product.image_url}" alt="${product.name}" width="250px"><br>
                <h4>${product.name} <h4>
               <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <h4 class="money">$${product.price}</h4>
                                  <i class="fas -regular fa-cart-shopping"></i>
              
              `;
          productDiv.className = "cart";
          productsDiv.appendChild(productDiv);
        });
      });
  }

  // Edit product
  window.editProduct = (id, name, price, image_url) => {
    document.getElementById("productId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    // Note: Not setting the image file input here; it should be re-selected by the user
  };

  // Delete product
  window.deleteProduct = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchProducts();
    });
  };
});
