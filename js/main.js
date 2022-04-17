// document.querySelector("#checkbutton").addEventListener("click",function(){
//   document.querySelector("#navbar").setAttribute("class","navManuAss");
// });

$(document).ready(function(){
  var typed = new Typed(".typing", {
      strings: ["MERN Stack Web Developer","Front End Web Developer", "HTML TO REACT Conversion Expert","PSD TO HTML Conversion Expert", "WordPress Expert", "Freelancer","Student of BSS Faculty"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
  });
})


const toggleButton = document.querySelector("#checkbutton");
const navbarLinks = document.querySelector("#navbar");
toggleButton.addEventListener("click",function(){
  navbarLinks.classList.toggle("navManuAss")
})


// const service = document.getElementById("service");
// const serviceBTn = document.getElementById("serviceBTn");
//
// serviceBTn.addEventListener("click",()=>{
//   alert("This is service")
// })
