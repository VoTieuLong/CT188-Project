// element của trang

const formLogin = document.getElementById("formLogin");
const username = document.getElementById("username");
const psw = document.getElementById("psw");
const email = document.getElementById("email");
const alertError = document.getElementById("alertError");
const viewEye = document.getElementById("view-eye");
//lắng nghe sự kiện đăng nhập

function pswVisibility(){
    var x = document.getElementById("psw");
    if(x.type==="password"){
        x.type = "text";
        viewEye.src = "../images/view.png";

    } else {
        x.type = "password";
        viewEye.src = "../images/hide.png";
    }
}
formLogin.addEventListener("submit", function(e){
    // ngăn load trang
    e.preventDefault();

    //validate dữ liệu

    //lấy dữ liệu từ local
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    //tìm kiếm email và mật khẩu ng dùng nhập có trùng vs đki hay ko
    const findUser = userLocal.find(
    (user) =>
        user.userEmail === email.value && 
        user.userPsw === psw.value
        
    );
    if (!findUser){
         alertError.style.display = "block"
;        
    } else {
    //nếu ko thì báo chưa có tk và nhập lại dữ liệu
        window.location.href = "../../index.html"

    // lưu thông tin
    localStorage.setItem("userLogin", JSON.stringify(findUser));
    }
   
});