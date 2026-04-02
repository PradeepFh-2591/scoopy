/* =========================================
   VIDEO PLAY / PAUSE TOGGLE
========================================= */
jQuery(function () {

  const wrapper = document.querySelector(".video-custom-play");
  if (!wrapper) return;

  const video = wrapper.querySelector("video");
  const icon = wrapper.querySelector(".video-play-icon");

  let timer;

  function showIcon(type) {
    // change icon
    icon.classList.remove("fa-play", "fa-pause");
    icon.classList.add(type === "play" ? "fa-play" : "fa-pause");

    // show
    wrapper.classList.add("show-icon");

    clearTimeout(timer);

    // hide after 2 sec
    timer = setTimeout(() => {
      wrapper.classList.remove("show-icon");
    }, 2000);
  }

  // 🎬 INITIAL LOAD
  window.addEventListener("load", () => {
    showIcon("pause");
    wrapper.classList.add("is-video-playing");
  });

  // 👆 CLICK HANDLER
  wrapper.addEventListener("click", function () {

    if (video.paused) {
      video.play();
      wrapper.classList.add("is-video-playing");
      showIcon("pause");
    } else {
      video.pause();
      wrapper.classList.remove("is-video-playing");
      showIcon("play");
    }

  });

});


/* =========================================
   SHOW MORE / SHOW LESS
========================================= */
function showMore(btn) {
  const parent = btn.closest('.tab-list-details');
  const items = parent.querySelectorAll('.toppings');

  items.forEach(item => {
    item.classList.toggle('show');
  });

  btn.innerHTML = btn.innerHTML === 'Show More'
    ? 'Show Less'
    : 'Show More';
}


/* =========================================
   COPY EMAIL WITH TOAST
========================================= */
function copyEmail(email = "wholesale@scoopdeville.com") {
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById("copyToast");

    if (!toast) {
      alert("Email copied!");
      return;
    }

    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  });
}


/* =========================================
   BOOTSTRAP TAB NAVIGATION
========================================= */
document.addEventListener('DOMContentLoaded', function () {

  const tabs = document.querySelectorAll('#myTab .nav-link');

  // ✅ CORRECT SCROLL CONTAINER
  const scrollContainer = document.querySelector('.tab-scroll');

  let currentTab = 0;

  function centerTab(tab) {
    if (!scrollContainer || !tab) return;

    const tabRect = tab.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();

    const scrollLeft = scrollContainer.scrollLeft;

    const offset = tabRect.left - containerRect.left;

    const scrollTo = scrollLeft + offset - (containerRect.width / 2) + (tabRect.width / 2);

    scrollContainer.scrollTo({
      left: scrollTo,
      behavior: "smooth"
    });
  }

  /* =========================
     TAB CHANGE
  ========================= */
  tabs.forEach((tab, index) => {

    tab.addEventListener('shown.bs.tab', function () {
      currentTab = index;
      centerTab(tab);
    });

  });

  /* =========================
     INITIAL LOAD
  ========================= */
  window.addEventListener("load", () => {
    const activeTab = document.querySelector("#myTab .nav-link.active");
    if (activeTab) {
      centerTab(activeTab);
    }
  });

});


/* =========================================
   HEADER + MOBILE MENU INIT
========================================= */
$(document).ready(function () {

  /* Load Header */
  $("#header").load("includes/header.html", function () {

    const $menu = $("header .menu");
  
    // wait until images inside header are loaded
    const images = $menu.find("img");
    let loaded = 0;
  
    if (!images.length) {
      initSticky();
    } else {
      images.on("load", function () {
        loaded++;
        if (loaded === images.length) {
          initSticky();
        }
      });
    }
  
    function initSticky() {
      $menu.sticky({ topSpacing: 0 });
  
      // 🔑 force height refresh
      setTimeout(function () {
        $(window).trigger("resize");
      }, 50);
    }
  
  });
  
  /* Load Mobile Menu */
  $("#mobile-menu").load("includes/mobilemenu.html");


  // sticky 
  $("header .menu").sticky({ topSpacing: 0 });

  /* Mobile Menu Toggle (SINGLE HANDLER) */
  $(document).off("click.mobileMenu")
    .on("click.mobileMenu", ".m-menu", function (e) {
      e.preventDefault();

      $(this).toggleClass("open");
      $(".mobile-menu").toggleClass("slow");
      $("body").toggleClass("over mobile-menu-open");

      // wait for slide animation
      setTimeout(setAccordionHeight, 80);
    });

  /* Recalculate on resize / rotate */
  $(window).on("resize orientationchange", function () {
    if ($(".mobile-menu").hasClass("slow")) {
      setAccordionHeight();
    }
  });

});


/* =========================================
   MOBILE ACCORDION DROPDOWN
========================================= */
$(document).on("click", "#accordian > ul > li > span", function (e) {
  e.preventDefault();

  const $icon = $(this);
  const $li = $icon.closest("li");
  const $accordion = $("#accordian");
  const $content = $li.children("ul");

  // If already open → close it
  if ($li.hasClass("active")) {
    $content.stop(true, true).slideUp(300);
    $li.removeClass("active");
    return;
  }

  // Close other open items
  $accordion.find("li.active > ul")
    .stop(true, true)
    .slideUp(300)
    .parent()
    .removeClass("active");

  // Open clicked item
  $li.addClass("active");
  $content.stop(true, true).slideDown(300, function () {

    // 🔑 Smooth scroll inside accordion container
    const liTop = $li.position().top;
    const currentScroll = $accordion.scrollTop();

    $accordion.stop(true).animate(
      {
        scrollTop: currentScroll + liTop - 20
      },
      400
    );
  });
});


/* =========================================
 funraising show more sections
========================================= */
function showMoreSections(btn) {

  const hiddenSections = document.querySelectorAll(".hidden-section");

  hiddenSections.forEach(section => {
    section.style.display = "block";
  });

  // 🔥 remove button (no show less)
  btn.style.display = "none";
}


/* =========================================
   DESKTOP MEGA MENU
========================================= */
$(document)
  .on('mouseenter', '.megamenu-sec ul li.has-mega-menu', function () {
    $(this).addClass("selected");
    $('body').addClass('overlay');
    $('header').addClass('megamenu-open');
  })
  .on('mouseleave', '.megamenu-sec ul li.has-mega-menu', function () {
    $(this).removeClass("selected");
    $('body').removeClass('overlay');

    if (!$('.megamenu-sec ul li.has-mega-menu.selected').length) {
      $('header').removeClass('megamenu-open');
    }
  });

/* =========================================
  Footer section
========================================= */
$("#footer").load("includes/footer.html");

