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

// Fetch product information
let products = null;
fetch("./assets/product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
  });

let listCart = [];
function checkCart() {
  const storedCart = localStorage.getItem("listCart");
  if (storedCart) {
    listCart = JSON.parse(storedCart).filter((product) => product !== null);
    addCartToHTML();
  }
}
checkCart();

function addCart(idProduct) {
  if (!products) {
    console.error("Products data chưa được tải!");
    return;
  }

  if (!listCart.find((item) => item && item.id === idProduct)) {
    const dataProduct = products.find((product) => product.id === idProduct);
    if (dataProduct) {
      const productToAdd = { ...dataProduct, quantity: 1 };
      listCart.push(productToAdd);
    }
  } else {
    listCart = listCart.map((item) =>
      item && item.id === idProduct
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  localStorage.setItem("listCart", JSON.stringify(listCart));
  addCartToHTML();
}
function updateTotalQuantity() {
  let totalQuantity = listCart.reduce(
    (acc, product) => acc + (product ? product.quantity : 0),
    0
  );
  localStorage.setItem("totalQuantity", totalQuantity); // Lưu tổng số lượng vào localStorage
}
function addCartToHTML() {
  let listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = "";
  let totalHTML = document.querySelector(".totalQuantity");
  let totalPriceHTML = document.querySelector(".total_Price");
  let totalQuantityHTML = document.querySelector(".total_Quantity");
  let totalQuantity = 0;
  let totalPrice = 0;

  if (listCart && listCart.length > 0) {
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
        totalPrice += product.quantity * product.price;
      }
    });
  }

  totalHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = formatNumber(totalPrice) + " VNĐ";
  totalQuantityHTML.innerText = totalQuantity;
  updateTotalQuantity();
}

function changeQuantity(idProduct, type) {
  listCart = listCart
    .map((product) => {
      if (product && product.id === idProduct) {
        if (type === "+") {
          product.quantity++;
        } else if (type === "-" && product.quantity > 1) {
          product.quantity--;
        } else if (type === "-" && product.quantity === 1) {
          return null; // Đánh dấu sản phẩm để xóa
        }
      }
      return product;
    })
    .filter((product) => product !== null); // Loại bỏ sản phẩm bị null

  localStorage.setItem("listCart", JSON.stringify(listCart));
  addCartToHTML();
  updateTotalQuantity();
}
