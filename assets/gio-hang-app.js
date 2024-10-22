let iconCart = document.querySelector(".header__icon-cart");
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
//fetch thông tin sản phẩm
let products = null;
fetch("./assets/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
  });

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
        console.log(totalQuantity);
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
