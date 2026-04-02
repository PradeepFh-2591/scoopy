/* =========================================
   VIDEO PLAY / PAUSE TOGGLE
========================================= */
jQuery(function () {

  // Inject style once
  const styleTag = document.createElement("style");
  document.head.appendChild(styleTag);

  function setIcon(type) {
    styleTag.innerHTML = `
      .video-play-icon::before {
        content: "${type === 'pause' ? '\\f04c' : '\\f04b'}";
      }
    `;
  }

  const wrapper = document.querySelector(".video-custom-play");
  if (!wrapper) return;

  const video = wrapper.querySelector("video");
  if (!video) return;

  setIcon("pause");

  video.addEventListener("play", function () {
    setIcon("pause");
  });

  video.addEventListener("pause", function () {
    setIcon("play");
  });

  jQuery(document).on("click", ".video-play-icon", function (e) {
    e.preventDefault();
    video.paused ? video.play() : video.pause();
  });

});


/* =========================================
   SHOW MORE / SHOW LESS
========================================= */
function showMore() {
  const items = document.getElementsByClassName('toppings');
  const btn = document.getElementById('showMoreButton');

  for (let i = 0; i < items.length; i++) {
    items[i].classList.toggle('show');
  }

  if (btn) {
    btn.innerHTML = btn.innerHTML === 'Show More'
      ? 'Show Less'
      : 'Show More';
  }
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
  let currentTab = 0;

  const nextBtn = document.getElementById('nextTab');
  const prevBtn = document.getElementById('prevTab');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentTab < tabs.length - 1) {
        currentTab++;
        new bootstrap.Tab(tabs[currentTab]).show();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentTab > 0) {
        currentTab--;
        new bootstrap.Tab(tabs[currentTab]).show();
      }
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('shown.bs.tab', () => {
      currentTab = index;
    });
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

  