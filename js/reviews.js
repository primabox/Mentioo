const reviewsSwiper = new Swiper('.myReviewsSwiper', {
  loop: true, // Povolíme nekonečné scrollování
  navigation: {
    nextEl: '.review-next',
    prevEl: '.review-prev',
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