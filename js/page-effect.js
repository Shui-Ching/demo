




//  <!-- Initialize Swiper -->
    //小圖
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 0,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      direction: 'vertical' // Set the direction to vertical
    });
    //大圖
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });



//----------進場
AOS.init();






$(document).ready(function() {
// <!-- 調整-圖片放大 -->
  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
    
  });

  $('.image-popup-fit-width').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    image: {
      verticalFit: false
    }
  });

  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

//lightbox 影片
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

//----------內容區向下滑動增加class

 let lastScrollTop = 0;
  let scrollDownDistance = 0;

  $(window).scroll(function() {
    let currentScrollTop = $(this).scrollTop();
    
    if (currentScrollTop > lastScrollTop) {
      scrollDownDistance += currentScrollTop - lastScrollTop;
      if (scrollDownDistance >= 300) {
        $('.mainContent').addClass('scrolled-down');
      }
    } else {
      scrollDownDistance -= lastScrollTop - currentScrollTop;
      if (scrollDownDistance <= 400) {
        $('.mainContent').removeClass('scrolled-down');
      }
    }

    lastScrollTop = currentScrollTop;
  });


});


//內頁上選單
// document.addEventListener('DOMContentLoaded', function() {
//   const dropdown = document.querySelector('.categoryDropdown');

//   dropdown.addEventListener('change', function() {
//       // 清除之前的 active 类
//       Array.from(dropdown.options).forEach(option => {
//           option.classList.remove('active');
//       });

//       // 为选中的选项添加 active 类
//       dropdown.options[dropdown.selectedIndex].classList.add('active');

//       const selectedValue = dropdown.value;
//       if (selectedValue) {
//           window.location.href = selectedValue;
//       }
//   });
// });


//lightbox 影片
// $(document).ready(function() {
//   $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
//     disableOn: 700,
//     type: 'iframe',
//     mainClass: 'mfp-fade',
//     removalDelay: 160,
//     preloader: false,

//     fixedContentPos: false
//   });
// });


//----------內容區向下滑動增加class
// $(document).ready(function() {
//   let lastScrollTop = 0;
//   let scrollDownDistance = 0;

//   $(window).scroll(function() {
//     let currentScrollTop = $(this).scrollTop();
    
//     if (currentScrollTop > lastScrollTop) {
//       scrollDownDistance += currentScrollTop - lastScrollTop;
//       if (scrollDownDistance >= 300) {
//         $('.mainContent').addClass('scrolled-down');
//       }
//     } else {
//       scrollDownDistance -= lastScrollTop - currentScrollTop;
//       if (scrollDownDistance <= 400) {
//         $('.mainContent').removeClass('scrolled-down');
//       }
//     }

//     lastScrollTop = currentScrollTop;
//   });
// });