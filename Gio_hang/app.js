let iconCart = document.querySelector(".iconCart");
let closeBtn = document.querySelector(".cartTab .close");
let body = document.querySelector("body");

iconCart.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});
closeBtn.addEventListener("click", () => {
  body.classList.toggle("activeTabCart");
});

function formatNumber(num) {
  let parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
let products = null;
fetch("product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });

function addDataToHTML() {
  let listProductHTML = document.querySelector(".listProduct");
  listProductHTML.innerHTML = "";

  if (products != null) {
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.innerHTML = `
          <img src="${product.image}" />
          <h2>${product.name}</h2>
          <div class="price">${formatNumber(product.price)} VNĐ</div>
          <button onclick="addCart(${product.id})">Thêm vào giỏ hàng</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
}

let listCart = [];

function checkCart() {
  var cookieValue = document.cookie
    .split(";")
    .find((row) => row.startsWith("listCart="));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split("=")[1]);
    addCartToHTML();
  }
}
checkCart();

function addCart($idProduct) {
  let productCopy = JSON.parse(JSON.stringify(products));
  if (!listCart[$idProduct]) {
    let dataProduct = productCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    listCart[$idProduct] = dataProduct;
    listCart[$idProduct].quantity = 1;
  } else {
    listCart[$idProduct].quantity++;
  }
  let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie =
    "listCart=" + JSON.stringify(listCart) + ";" + timeSave + "; path=/";
  addCartToHTML();
}

function addCartToHTML() {
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";
  let totalHTML = document.querySelector(".totalQuantity");
  let totalPriceHTML = document.querySelector(".total_Price");
  let totalQuantityHTML = document.querySelector(".total_Quantity");
  let totalQuantity = 0;
  let totalPrice = 0;
  if (listCart) {
    listCart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `
        <img src="${product.image}" />
            <div class="content">
              <div class="name">${product.name}</div>
              <div class="price">${formatNumber(product.price)} VNĐ</div>
            </div>
            <div class="quantity">
              <button onclick="changeQuantity(${product.id},'-')">-</button>
              <span class="value">${product.quantity}</span>
              <button onclick="changeQuantity(${product.id},'+')">+</button>
            </div>
        `;
        listCartHTML.appendChild(newCart);
        totalQuantity += product.quantity;
        totalPrice = totalPrice + product.quantity * product.price;
      }
    });
    totalHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = formatNumber(totalPrice) + " VNĐ";
    totalQuantityHTML.innerText = totalQuantity;
  }
}
function changeQuantity(idProduct, type) {
  if (type == "+") {
    listCart[idProduct].quantity++;
  } else {
    listCart[idProduct].quantity--;
    if (listCart[idProduct].quantity <= 0) {
      delete listCart[idProduct];
    }
  }
  //save new data in cookie
  let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie =
    "listCart=" + JSON.stringify(listCart) + ";" + timeSave + "; path=/";
  //reload list cart in HTML
  addCartToHTML();
}
