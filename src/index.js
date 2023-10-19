// Clean the local storage
localStorage.setItem("current_field", "");

// Asign to "current_field" in local storage the value of the requested field
const san_jose_link = document.getElementById("san_jose_link");
san_jose_link.addEventListener("click", ()=>{
    localStorage.setItem("current_field", "sanjose");
});

const alturitas_link = document.getElementById("alturitas_link");
alturitas_link.addEventListener("click", ()=>{
    localStorage.setItem("current_field", "alturitas");
});

const alpuf_link = document.getElementById("alpuf_link");
alpuf_link.addEventListener("click", ()=>{
    localStorage.setItem("current_field", "alpuf");
});

const machiques_link = document.getElementById("machiques_link");
machiques_link.addEventListener("click", ()=>{
    localStorage.setItem("current_field", "machiques");
});

const san_julian_link = document.getElementById("san_julian_link");
san_julian_link.addEventListener("click", ()=>{
    localStorage.setItem("current_field", "sanjulian");
});