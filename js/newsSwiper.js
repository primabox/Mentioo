document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".mySwiper");

  if (!swiperEl) return;

  // Inicializace Swiperu
  const newsSwiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    loop: false,
    speed: 600,
    resistanceRatio: 0,
    watchOverflow: true,
    allowTouchMove: true,
    touchRatio: 1,
    threshold: 5,
    centeredSlides: false,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".news-next",
      prevEl: ".news-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        allowTouchMove: true,
        touchRatio: 1,
        /* On very small phones center the single slide so it appears visually centered */
        centeredSlides: true,
      },
      375: {
        /* At 375px use auto sizing and centered slides so card width (max-width) determines layout */
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 16,
        allowTouchMove: true,
        touchRatio: 1,
        centeredSlides: true,
      },
      640: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        allowTouchMove: true,
        touchRatio: 1,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
        allowTouchMove: true,
        touchRatio: 1,
        centeredSlides: false,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        allowTouchMove: false,
        touchRatio: 0,
        centeredSlides: false,
      },
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 24,
        allowTouchMove: false,
        touchRatio: 0,
        centeredSlides: false,
      },
    },
    on: {
      init: function (swiper) {
        updateNavigationButtons(swiper);
      },
      slideChange: function (swiper) {
        updateNavigationButtons(swiper);
      },
      resize: function (swiper) {
        updateNavigationButtons(swiper);
      }
    }
  });

  // Funkce pro aktualizaci tlačítek
  function updateNavigationButtons(swiper) {
    const totalSlides = swiper.slides.length;
    // Convert slidesPerView to a numeric value when possible. If it's 'auto' or invalid, assume 1.
    const perViewRaw = swiper.params.slidesPerView;
    const perView = typeof perViewRaw === 'number' ? perViewRaw : Number(perViewRaw);
    const perViewNum = Number.isFinite(perView) && perView > 0 ? perView : 1;

    // If there are fewer slides than visible per view, disable navigation
    if (totalSlides <= perViewNum) {
      swiper.allowSlideNext = false;
      swiper.allowSlidePrev = false;
      swiper.navigation.nextEl?.classList.add('swiper-button-disabled');
      swiper.navigation.prevEl?.classList.add('swiper-button-disabled');
      return;
    }

    // Compute last possible index (use integer math)
    const lastPossibleIndex = Math.max(0, totalSlides - Math.ceil(perViewNum));

    // Can slide next if active index is before the last possible index
    swiper.allowSlideNext = swiper.activeIndex < lastPossibleIndex;
    // Can slide prev if active index is after the first
    swiper.allowSlidePrev = swiper.activeIndex > 0;

    const nextBtn = swiper.navigation.nextEl;
    const prevBtn = swiper.navigation.prevEl;

    // Aktualizuj vzhled tlačítek
    if (!swiper.allowSlideNext) {
      nextBtn?.classList.add('swiper-button-disabled');
    } else {
      nextBtn?.classList.remove('swiper-button-disabled');
    }

    if (!swiper.allowSlidePrev) {
      prevBtn?.classList.add('swiper-button-disabled');
    } else {
      prevBtn?.classList.remove('swiper-button-disabled');
    }
  }

  window.newsSwiper = newsSwiper;
});