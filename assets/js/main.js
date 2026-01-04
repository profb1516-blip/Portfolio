/**
* Template Name: FolioOne
* Template URL: https://bootstrapmade.com/folioone-bootstrap-portfolio-website-template/
* Updated: Aug 23 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });
  const heroImg = document.querySelector('.hero-profile-img');

if (heroImg) {
  heroImg.addEventListener('click', () => {
    heroImg.classList.remove('shake-active');
    void heroImg.offsetWidth; // force reflow
    heroImg.classList.add('shake-active');

    setTimeout(() => {
      heroImg.classList.remove('shake-active');
    }, 2500);
  });
}


  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();
/* =====================================
   INK FOG CURSOR (2–3 sec linger)
===================================== */
const ink = document.querySelector('.cursor-ink');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

let hideTimeout;

const canvas = document.getElementById("smoke-canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

ctx.globalCompositeOperation = "screen";

const particles = [];
const colors = [
  [255, 80, 120],   // pink
  [255, 180, 80],   // orange
  [120, 180, 255],  // blue
  [160, 120, 255],  // purple
  [120, 255, 200]   // cyan
];

class SmokeParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 50 + 40;
    this.life = 0;
    this.maxLife = 90; // fast vanish
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -Math.random() * 0.4 - 0.2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    const t = this.life / this.maxLife;
    const alpha = Math.exp(-t * 4);

    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    g.addColorStop(0, `rgba(${this.color.join(",")}, ${alpha * 0.35})`);
    g.addColorStop(0.4, `rgba(${this.color.join(",")}, ${alpha * 0.18})`);
    g.addColorStop(1, `rgba(${this.color.join(",")}, 0)`);

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.size += 0.15;
    this.life++;
  }
}

window.addEventListener("mousemove", e => {
  particles.push(new SmokeParticle(e.clientX, e.clientY));
  if (particles.length > 120) particles.shift();
});

function animate() {
  ctx.clearRect(0, 0, w, h);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life > p.maxLife) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();
