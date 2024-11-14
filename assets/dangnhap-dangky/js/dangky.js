//lấy ra elements của trang
const registerForm = document.getElementById('registerForm');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const numberphone = document.getElementById('numberphone');
const psw = document.getElementById('psw1');
const repsw = document.getElementById('repsw');

// element liên quan password
const pswMessageInput = document.getElementById("psw1");
const eightChar = document.getElementById("eightChar");
const lowerCase = document.getElementById("lowerCase");
const upperCase = document.getElementById("upperCase");
const aNumber = document.getElementById("aNumber");
const specialChar = document.getElementById("specialChar");

//element liên quan lỗi
const formMessage = document.getElementsByClassName('form-message');
const userNameError = document.getElementById('userNameError');
const emailError = document.getElementById('emailError');
const numberphoneError = document.getElementById('numberphoneError');
const pswError = document.getElementById('pswError');
const repswError = document.getElementById('repswError');
 

//lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
/**
 * validate email address
 * @param {*} email: chuỗi email ng dùng nhập
 * @returns: dữ liệu nếu email đúng định dạng, undefined nếu sai
 */

// an hien mat khau


function pswVisibility(inputId, eyeIconId){
    const pswInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeIconId);

    if(pswInput.type==="password"){
        pswInput.type = "text";
        eyeIcon.src = "./assets/dangnhap-dangky/images/view.png";

    } else {
        pswInput.type = "password";
        eyeIcon.src = "./assets/dangnhap-dangky/images/hide.png";
    }
}


function validateEmail(email)  {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let isNumber = false;
  function validateNumberPhone(numberphone){
    return /^[0-9]{10}$/.test(numberphone);
  }
  pswMessageInput.onfocus = function() {
    document.getElementById("psw-message").style.display = "block";
}

pswMessageInput.onblur = function() {
    document.getElementById("psw-message").style.display = "none";
}

pswMessageInput.onkeyup = function(){
        var numberChar = /[0-9]/g;
        if(pswMessageInput.value.match(numberChar)) {  
        aNumber.className = "valid";
         } else {
            aNumber.className = "invalid";
         }


         var lowerCaseChar = /[a-z]/g;
         if(pswMessageInput.value.match(lowerCaseChar)) {  
         lowerCase.className = "valid";
        } else {
            lowerCase.className = "invalid";
        }


        var upperCaseChar = /[A-Z]/g;
            if(pswMessageInput.value.match(upperCaseChar)) {  
            upperCase.className = "valid";
        } else {
            upperCase.className = "invalid";
        }

        var specChar =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if(pswMessageInput.value.match(specChar)) {  
            specialChar.className = "valid";
        } else {
            specialChar.className = "invalid";
        }

        if (pswMessageInput.value.length >=8){
            eightChar.className ="valid";
        }
        else {
                eightChar.className ="invalid";
        }
    }
 
    //lắng nghe sự kiện
    registerForm.addEventListener("submit", function(e){
        
        e.preventDefault();
        if(!userName.value){
            //hiển thị lỗi
            userNameError.style.display = "block";
        } else {
            //ẩn lỗi
            userNameError.style.display = "none";
        }

        if(!email.value){
            //hiển thị lỗi
            emailError.style.display = "block";
        } else {
            //ẩn lỗi
            emailError.style.display = "none";
            if(!validateEmail(email.value)){
                emailError.style.display = "block";
                emailError.innerHTML = "Email chưa đúng định dạng";
            }
        }

        if(!numberphone.value){
            //hiển thị lỗi
            numberphoneError.style.display = "block";
        } else {
            //ẩn lỗi
        numberphoneError.style.display = "none";
        if(!validateNumberPhone(numberphone.value)){
                numberphoneError.style.display = "block";
                numberphoneError.innerHTML = "Số điện thoại chưa đúng định dạng";
        }
        }
            
        if(!psw.value){
            //hiển thị lỗi
            pswError.style.display = "block";
            
        } else {
            //ẩn lỗi
           pswError.style.display = "none";
        }

        if(!repsw.value){
            //hiển thị lỗi
        repswError.style.display = "block";
        } else {
            //ẩn lỗi
        repswError.style.display = "none";
        }

        // kt mật khẩu vs nhập lại mật khẩu
        if(psw.value !== repsw.value) {
            repswError.style.display = "block";
            repswError.innerHTML = "Mật khẩu không khớp";
        } 

        //gửi dữ liệu lên local storage
        if(userName.value 
            && email.value 
            && numberphone.value 
            && psw.value
            && validateNumberPhone(numberphone.value)
            && repsw.value 
            && psw.value === repsw.value
            && validateEmail(email.value)
        ) {
            //lấy dữ liệu từ form và gộp thành đối tượng user

            const user = {
                userId: Math.ceil(Math.random()*10000000),
                userName: userName.value,
                userEmail: email.value,
                userPhoneNumber: numberphone.value,
                userPsw: psw.value,
            }
        
            // push user vào mảng userLocal
            userLocal.push(user);
            // lưu dữ liệu trên local

            localStorage.setItem("users", JSON.stringify(userLocal));
            alert("Đăng ký thành công");
            //chuyển hướng về trang đăng nhập
            window.location.href = "./dangnhap.html";
    }
    
});