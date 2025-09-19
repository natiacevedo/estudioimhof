document.addEventListener('DOMContentLoaded', () => {
  // 1️⃣ Scroll header
  if (document.body.id === 'home') {
    const header = document.querySelector('header');
    if (header) {
      const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
      window.addEventListener('scroll', onScroll);
      onScroll();
    }
  }

  // 2️⃣ Cerrar menú hamburguesa al click en link
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('menuNav');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    });
  });

  // 3️⃣ Animación fade-in
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));

  // 4️⃣ Carrusel Desktop
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  if (track && prevButton && nextButton) {
    let scrollInterval;

    const startScroll = (direction) => {
      stopScroll();
      scrollInterval = setInterval(() => {
        track.scrollBy({ left: direction * 20, behavior: 'auto' });
      }, 15);
    };

    const stopScroll = () => clearInterval(scrollInterval);

    // Flechas
    prevButton.addEventListener('mousedown', () => startScroll(-1));
    prevButton.addEventListener('mouseup', stopScroll);
    prevButton.addEventListener('mouseleave', stopScroll);
    prevButton.addEventListener('touchstart', () => startScroll(-1));
    prevButton.addEventListener('touchend', stopScroll);

    nextButton.addEventListener('mousedown', () => startScroll(1));
    nextButton.addEventListener('mouseup', stopScroll);
    nextButton.addEventListener('mouseleave', stopScroll);
    nextButton.addEventListener('touchstart', () => startScroll(1));
    nextButton.addEventListener('touchend', stopScroll);

    // Drag con mouse
    let isDown = false, startX, scrollLeft;

    track.addEventListener('mousedown', e => {
      isDown = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }
});
