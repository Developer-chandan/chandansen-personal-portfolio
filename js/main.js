// document.querySelector("#checkbutton").addEventListener("click",function(){
//   document.querySelector("#navbar").setAttribute("class","navManuAss");
// });

$(document).ready(function () {
  var typed = new Typed(".typing", {
    strings: ["MERN Stack Web Developer", "Front End Web Developer", "HTML TO REACT Conversion Expert", "PSD TO HTML Conversion Expert", "WordPress Expert", "Freelancer", "Student of BSS Faculty"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });
})


const toggleButton = document.querySelector("#checkbutton");
const navbarLinks = document.querySelector("#navbar");
toggleButton.addEventListener("click", function () {
  navbarLinks.classList.toggle("navManuAss")
})



//Portfolio Websites


  const tab_Switchers = document.querySelectorAll("[data-switcher]");

  for (let i = 0; i < tab_Switchers.length; i++) {
    const tab_switcher = tab_Switchers[i];
    const page_id = tab_switcher.dataset.tab;

    tab_switcher.addEventListener('click',()=>{
      document.querySelector(`.tabs .tab.is-active`).classList.remove('is-active');
      tab_switcher.parentNode.classList.add('is-active');
      switchPage(page_id);

    })

  }

  const switchPage = (page_id) =>{
    // console.log(page_id);
    const current_page =  document.querySelector(`.pages .page.is-active`);
    current_page.classList.remove('is-active');

    const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
    
    next_page.classList.add('is-active');
  }
