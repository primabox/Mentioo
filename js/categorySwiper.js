document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".myCategorySwiper");
  const tabsWrapper = document.querySelector(".category-tabs");
  const tabs = document.querySelectorAll(".category-tab");

  if (!swiperEl || !tabsWrapper || !tabs.length) return;

  let allSlidesData = [];

  // 1️⃣ Inicializace Swiperu
  const categorySwiper = new Swiper(swiperEl, {
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
      nextEl: ".category-next",
      prevEl: ".category-prev",
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
      // 🔥 Přidej resize handler
      resize: function (swiper) {
        updateNavigationButtons(swiper);
      }
    }
  });

  // Funkce pro aktualizaci tlačítek - OPRAVENÁ VERZE
  function updateNavigationButtons(swiper) {
    const totalSlides = swiper.slides.length;
    const perView = swiper.params.slidesPerView;

    // 🔥 Pokud je slidů méně nebo stejně jako perView, není co slideovat
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

  window.categorySwiper = categorySwiper;

  // 2️⃣ Uložení slidů s kategoriemi
  categorySwiper.slides.forEach((slide) => {
    const title = slide.querySelector(".category-card-title")?.textContent.toLowerCase() || "";
    const text = slide.querySelector(".category-card-text")?.textContent.toLowerCase() || "";

    const categories = [];
    if (title.includes("web") || text.includes("web")) categories.push("web");
    if (title.includes("data") || text.includes("data")) categories.push("data");
    if (title.includes("communication") || text.includes("communication")) categories.push("comm");
    if (title.includes("leadership") || text.includes("leadership")) categories.push("lead");
    if (title.includes("design") || title.includes("illustration") || text.includes("design")) categories.push("graphic");
    if (title.includes("business") || text.includes("business")) categories.push("business");
    if (title.includes("marketing") || text.includes("marketing")) categories.push("marketing");
    if (title.includes("photo") || title.includes("lifestyle")) categories.push("lifestyle");
    if (title.includes("music") || text.includes("music")) categories.push("music");

    allSlidesData.push({
      html: slide.outerHTML,
      categories: categories
    });
  });

  // 3️⃣ Filtrování
  const filterSlides = (category) => {
    categorySwiper.removeAllSlides();

    const filteredSlides = allSlidesData.filter(slideData => {
      return category === "web" || slideData.categories.includes(category);
    });

    filteredSlides.forEach(slideData => {
      categorySwiper.appendSlide(slideData.html);
    });

    categorySwiper.update();
    categorySwiper.slideTo(0, 0);

    // 🔥 Zavolej update hned po změně slidů
    setTimeout(() => {
      updateNavigationButtons(categorySwiper);
    }, 50);
  };

  // 4️⃣ Modrý proužek
  const updateSliderPosition = (activeTab) => {
    const tabRect = activeTab.getBoundingClientRect();
    const wrapperRect = tabsWrapper.getBoundingClientRect();

    tabsWrapper.style.setProperty("--bar-width", `${tabRect.width}px`);
    tabsWrapper.style.setProperty("--bar-left", `${tabRect.left - wrapperRect.left}px`);
  };

  // 5️⃣ Mobilní scrollování
  if (window.innerWidth < 768) {
    tabsWrapper.style.overflowX = "auto";
    tabsWrapper.style.scrollBehavior = "smooth";
    tabsWrapper.style.WebkitOverflowScrolling = "touch";
  }

  // 6️⃣ Event listenery
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      updateSliderPosition(tab);

      if (window.innerWidth < 768) {
        const tabRect = tab.getBoundingClientRect();
        const wrapperRect = tabsWrapper.getBoundingClientRect();
        const scrollLeft = tabRect.left - wrapperRect.left - (wrapperRect.width - tabRect.width) / 2;

        tabsWrapper.scrollTo({
          left: tabsWrapper.scrollLeft + scrollLeft,
          behavior: 'smooth'
        });
      }

      const category = tab.getAttribute("data-category");
      filterSlides(category);
    });
  });

  // 7️⃣ Inicializace
  const firstTab = tabs[0];
  updateSliderPosition(firstTab);
  filterSlides("web");
});