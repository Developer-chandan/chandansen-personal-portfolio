// sequence of scrpit writing 
// navbarcode
// typing js 
// portfolio section 
// animate number counter 
// client review / testimonial 





//Navbar code
// Header Scroll

let nav = document.querySelector(".navbar");
window.onscroll = function () {
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("header-scrolled");
    }else{
        nav.classList.remove("header-scrolled");
    }
} 

// nav hide 
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function (a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})
 




// typing js code 

$(document).ready(function () {
  var typed = new Typed(".typing", {
    strings: ["FIGMA/XD/PSD TO Custom Web Development Expert", "WordPress Developer", "Landing Page Expert","Top Rated Developer On Upwork", "UI/UX Designer and Consultant"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
  });
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



