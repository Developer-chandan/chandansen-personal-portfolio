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
    strings: ["MERN Stack Web Developer", "Front End Web Developer", "HTML TO REACT Conversion Expert", "PSD TO HTML Conversion Expert", "WordPress Expert", "Freelancer", "Student of BSS Faculty"],
    typeSpeed: 100,
    backSpeed: 60,
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




  //animate number counter


  const workSection = document.querySelector("#achievement");

  const workSectionObserve = (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
  
  
  
      const counterNum = document.querySelectorAll(".counter-numbers");
      // console.log(counterNum);
      const speed = 47;
  
      counterNum.forEach((curNumber) => {
          const updateNumber = () => {
              const targetNumber = parseInt(curNumber.dataset.number);
           
              const initialNumber = parseInt(curNumber.innerText);
       
              const incrementNumber = Math.trunc(targetNumber / speed);
  
              if (initialNumber < targetNumber) {
                  curNumber.innerText = `${initialNumber + incrementNumber}+`;
                  setTimeout(updateNumber, 50);
              } else {
                  curNumber.innerText = `${targetNumber}+`;
              }
  
          };
          updateNumber();
      });
  };
  
  const workSecObserver = new IntersectionObserver(workSectionObserve, {
      root: null,
      threshold: 0,
  });
  
  workSecObserver.observe(workSection);

  //testimonial

  function claintreview() {
    "use strict";
   
    if ($(".testimonials-carousel").length > 0) {
        var j2 = new Swiper(".testimonials-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.listing-carousel-button-next',
                prevEl: '.listing-carousel-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                
            }
        });
    }
    
// bubbles -----------------
    
    
    setInterval(function () {
       
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity': '-=0.7'
        }, 4000, function () {
            $(this).remove()
        });
    }, 350);
    
}

//   Init All ------------------
$(document).ready(function () {
    claintreview();
});