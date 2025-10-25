// Inicializace Swiper pro news sekci
const newsSwiper = new Swiper('.mySwiper', {
  // Počet slidů viditelných najednou
  slidesPerView: 1,
  spaceBetween: 20,
  
  // Responsive breakpoints
  breakpoints: {
    // Když je šířka >= 640px (tablet)
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // Když je šířka >= 1024px (desktop)
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // Když je šířka >= 1280px (velký desktop)
    1280: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },
  
  // Navigační tlačítka - používáme třídy news-prev a news-next
  navigation: {
    nextEl: '.news-next',
    prevEl: '.news-prev',
    disabledClass: 'swiper-button-disabled',
  },
  
  // Povolení touch gesta na mobilu
  touchEventsTarget: 'container',
  simulateTouch: true,
  
  // Loop povolen - nekonečné procházení karet
  loop: true,
  
  // Resistance při pokusu o další slide
  resistanceRatio: 0,
  
  // Grab cursor
  grabCursor: true,
  
  // Keyboard control
  keyboard: {
    enabled: true,
  },
  
  // Accessibility
  a11y: {
    enabled: true,
  }
});