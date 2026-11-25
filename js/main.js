// ============================================
// SITE: Шабров Олег Федорович
// MAIN JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // --- Header scroll effect ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Mobile menu ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close menu on link click
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // --- Back to top button ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Fade-in on scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');
  
  function checkFade() {
    fadeElements.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFade);
  checkFade(); // Initial check

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const img = item.querySelector('img');
        if (img) {
          const lightboxImg = lightbox.querySelector('img');
          if (lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      });
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname.split('/').pop();
  if (currentPath) {
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(function(link) {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // --- Form submission ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес.');
        return;
      }
      
      // In production, you would send this to a server
      // For now, show success message
      alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
      contactForm.reset();
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Counter animation for stats ---
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(function(counter) {
      const target = parseInt(counter.textContent.replace(/\s/g, ''));
      if (isNaN(target)) return;
      
      const rect = counter.getBoundingClientRect();
      if (rect.top > window.innerHeight || counter.dataset.animated) return;
      
      counter.dataset.animated = 'true';
      let current = 0;
      const increment = target / 60;
      const duration = 2000;
      const stepTime = duration / 60;
      
      function updateCounter() {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString('ru-RU');
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = target.toLocaleString('ru-RU');
        }
      }
      
      updateCounter();
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Initial check

  // --- Escape key for lightbox ---
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

});
