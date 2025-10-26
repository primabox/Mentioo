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
        centeredSlides: false,
      },
      640: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        allowTouchMove: true,
        touchRatio: 1,
        centeredSlides: false,
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
    const perView = swiper.params.slidesPerView;

    // Pokud je slidů méně nebo stejně jako perView, není co slideovat
    if (totalSlides <= perView) {
      swiper.allowSlideNext = false;
      swiper.allowSlidePrev = false;
      swiper.navigation.nextEl?.classList.add('swiper-button-disabled');
      swiper.navigation.prevEl?.classList.add('swiper-button-disabled');
      return;
    }

    // Počítej poslední možný index
    const lastPossibleIndex = totalSlides - perView;

    // Kontrola, jestli můžeme slideovat doprava
    swiper.allowSlideNext = swiper.activeIndex < lastPossibleIndex;

    // Kontrola, jestli můžeme slideovat doleva
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