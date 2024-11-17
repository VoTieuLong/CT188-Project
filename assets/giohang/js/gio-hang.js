//tải dữ liệu sản phẩm từ localStorage
function loadCart() {
  let totalHTML = document.querySelector(".totalQuantity");
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  listCart = listCart.filter((product) => product !== null);
  if (listCart.length === 0) {
    let containerHTML = document.querySelector(".container");
    containerHTML.classList.add("emptyCart");
    containerHTML.innerHTML = `
    <div class="emptyCart">
      <h3><i class="fa-solid fa-bell"></i>Giỏ hàng của bạn chưa có sản phẩm nào. Quay lại <a href="index.html">trang chủ</a> để tiếp tục mua sắm nhé!</h3>
    </div>`;
  } else {
    const cartItems = document.querySelector(".listProduct");
    cartItems.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;

    listCart.forEach((product, index) => {
      if (product) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${product.image}" style="width: 100px" alt="${
          product.name
        }" /></td>
          <td>${product.name}</td>
          <td class="quantityButton">
            <button class="btn" onclick="changeQuantity(${index}, '-')">-</button>
            <span class="value">${product.quantity}</span>
            <button class="btn" onclick="changeQuantity(${index}, '+')">+</button>
          </td>
          <td>${formatNumber(product.price * product.quantity)} VNĐ</td>
          <td><button class="deleteButton" onclick="removeItem(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
        `;
        cartItems.appendChild(row);

        // Update total quantity and total price
        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
      }
    });

    document.getElementById("totalQuantity").innerText = totalQuantity;
    document.getElementById("totalPrice").innerText =
      formatNumber(totalPrice) + " VNĐ";
    totalHTML.innerText = totalQuantity;
    localStorage.setItem("totalQuantity", totalQuantity);
  }
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Thay đổi số lượng của một sản phẩm
function changeQuantity(index, type) {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];

  // Kiểm tra xem sản phẩm tại vị trí index có tồn tại hay không
  if (listCart[index] && listCart[index].quantity != null) {
    if (type === "+") {
      listCart[index].quantity++;
    } else if (type === "-" && listCart[index].quantity > 1) {
      listCart[index].quantity--;
    } else if (type === "-" && listCart[index].quantity === 1) {
      // Nếu giảm xuống 0 thì xóa sản phẩm khỏi giỏ hàng
      listCart.splice(index, 1);
    }

    // Lưu lại giỏ hàng sau khi thay đổi
    localStorage.setItem(
      "listCart",
      JSON.stringify(listCart.filter((product) => product !== null))
    );
    loadCart(); // Cập nhật giao diện
  } else {
    console.error(`Sản phẩm tại index ${index} không tồn tại hoặc bị null`);
  }
}

// Remove an item from the cart
function removeItem(index) {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  listCart.splice(index, 1); // Remove item at the specified index
  localStorage.setItem("listCart", JSON.stringify(listCart));
  loadCart(); // Reload cart to reflect the removal
}

//Khởi tạo giỏ hành khi trang web được tải

window.onload = loadCart;
