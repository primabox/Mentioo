const reviewsSwiper = new Swiper('.myReviewsSwiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  loop: true,
  speed: 600,
  allowTouchMove: true,
  touchRatio: 1,
  centeredSlides: true,
  navigation: {
    nextEl: '.review-next',
    prevEl: '.review-prev',
  },
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
      // Změníme aktivní tečku při změně slide
      const activeIndex = this.realIndex;
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

prevButton.addEventListener('click', () => reviewsSwiper.slidePrev());
nextButton.addEventListener('click', () => reviewsSwiper.slideNext());