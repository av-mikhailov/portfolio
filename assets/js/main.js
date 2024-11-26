(function () {
  "use strict";

  /**
   * Header toggle (mobile nav)
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bx-menu');
    headerToggleBtn.classList.toggle('bx-x');
  }

  headerToggleBtn.addEventListener('click', headerToggle);


  /**
  * Hide mobile nav on same-page/hash links
  */
  document.querySelectorAll('#navmenu a[href^="#"]').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault(); // Отключаем стандартное поведение

      const targetId = this.getAttribute('href').slice(1); // Получаем ID секции
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth' // Плавная прокрутка
        });
      }

      // Закрываем мобильное меню, если оно открыто
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  window.addEventListener('load', () => {
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, document.title, window.location.pathname);
      }
    }
  });
  

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Navmenu Scrollspy
   */
  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    const position = window.scrollY + 200; // Смещение для активации секций
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      }
    });

    if (isBottom) {
      const lastLink = navmenulinks[navmenulinks.length - 1];
      document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
      lastLink.classList.add('active');
    }
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Initiate GLightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

})();
