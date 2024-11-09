//tải dữ liệu sản phẩm từ localStorage
function loadCart() {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
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
          <td>
            <button onclick="changeQuantity(${index}, '-')">-</button>
            <span class="value">${product.quantity}</span>
            <button onclick="changeQuantity(${index}, '+')">+</button>
          </td>
          <td>${formatNumber(product.price * product.quantity)} VNĐ</td>
          <td><i class="fa-solid fa-trash-can" onclick="removeItem(${index})"></i></td>
        `;
      cartItems.appendChild(row);

      //Cập nhật số lượng và tổng giá
      totalQuantity += product.quantity;
      totalPrice += product.price * product.quantity;
    }
  });

  document.getElementById("totalQuantity").innerText = totalQuantity;
  document.getElementById("totalPrice").innerText =
    formatNumber(totalPrice) + " VNĐ";
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Thay đổi số lượng của một sản phẩm
function changeQuantity(index, type) {
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];

  if (type === "+") {
    listCart[index].quantity++;
  } else if (type === "-" && listCart[index].quantity > 1) {
    listCart[index].quantity--;
  } else if (type === "-" && listCart[index].quantity === 1) {
    listCart.splice(index, 1); // Remove item if quantity is zero
  }

  localStorage.setItem("listCart", JSON.stringify(listCart));
  loadCart(); // Reload cart to update changes
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
