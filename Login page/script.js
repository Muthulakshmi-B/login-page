// ===============================
// ELEMENTS
// ===============================

const form = document.getElementById("loginForm");

const username = document.getElementById("username");

const password = document.getElementById("password");

const togglePassword =
document.getElementById("togglePassword");

const loginBtn =
document.getElementById("loginBtn");

const container =
document.querySelector(".container");

const cursorGlow =
document.querySelector(".cursor-glow");

// ===============================
// PASSWORD TOGGLE
// ===============================

togglePassword.onclick = function(){

if(password.type==="password"){

password.type="text";

togglePassword.textContent="🙈";

}

else{

password.type="password";

togglePassword.textContent="👁";

}

};

// ===============================
// MOUSE GLOW
// ===============================

document.addEventListener("mousemove",function(e){

cursorGlow.style.left=e.clientX+"px";

cursorGlow.style.top=e.clientY+"px";

});

// ===============================
// RIPPLE EFFECT
// ===============================

loginBtn.addEventListener("click",function(e){

const ripple=this.querySelector(".ripple");

const rect=this.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

ripple.style.left=x+"px";

ripple.style.top=y+"px";

ripple.classList.remove("animate");

void ripple.offsetWidth;

ripple.classList.add("animate");

});

// ===============================
// LOGIN VALIDATION
// ===============================

form.addEventListener("submit",function(e){

e.preventDefault();

if(username.value.trim()==="" ||
password.value.trim()===""){

container.classList.add("shake");

setTimeout(function(){

container.classList.remove("shake");

},400);

return;

}

loginBtn.innerHTML="Loading...";

loginBtn.disabled=true;

setTimeout(function(){

container.classList.add("success");

loginBtn.innerHTML="✓ Welcome";

setTimeout(function(){

container.classList.remove("success");

loginBtn.innerHTML="Login";

loginBtn.disabled=false;

},2000);

},1500);

});

// ===============================
// ENTER KEY
// ===============================

document.addEventListener("keydown",function(e){

if(e.key==="Enter"){

form.requestSubmit();

}

});