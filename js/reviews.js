const reviewsSwiper = new Swiper('.myReviewsSwiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  loop: false,
  speed: 600,
  allowTouchMove: true,
  touchRatio: 1,
  centeredSlides: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      allowTouchMove: true,
      centeredSlides: true,
    },
    640: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      allowTouchMove: true,
      centeredSlides: true,
    },
    768: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      allowTouchMove: true,
      centeredSlides: true,
    },
    1024: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      allowTouchMove: false,
      centeredSlides: true,
    },
    1280: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      allowTouchMove: false,
      centeredSlides: true,
    },
  },
  on: {
    slideChange: function () {
      // Změníme aktivní tečku - zobrazujeme jen 3 tečky (cykl se opakuje)
      const activeIndex = this.activeIndex % 3;
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === activeIndex) {
          dot.classList.add('active');
        }
      });
    },
  },
});

// Přidání event listeneru pro šipky
const prevButton = document.querySelector('.review-prev');
const nextButton = document.querySelector('.review-next');

prevButton.addEventListener('click', () => {
  // Pokud jsme na 1. slidu (index 0), přejdeme na poslední (index 2)
  if (reviewsSwiper.activeIndex === 0) {
    reviewsSwiper.slideTo(2, 600);
  } else {
    reviewsSwiper.slidePrev();
  }
});

nextButton.addEventListener('click', () => {
  // Pokud jsme na 3. slidu (index 2), vraťme se na 1. slide (index 0)
  if (reviewsSwiper.activeIndex === 2) {
    reviewsSwiper.slideTo(0, 600);
  } else {
    reviewsSwiper.slideNext();
  }
});