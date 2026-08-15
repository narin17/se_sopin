/**
 * Se Sopin - Yoga & Inside Flow Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollspy();
  initScrollReveal();
  initInstagramLightbox();
  initTestimonialsSlider();
  initClassBooking();
  initBlogModal();
  initContactForm();
  initZenAudio();
});

/* -------------------------------------------------------------
 * 1. Mobile Navigation
 * ------------------------------------------------------------- */
function initMobileNav() {
  const btn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* -------------------------------------------------------------
 * 2. Scrollspy for active Navigation Links & Header state
 * ------------------------------------------------------------- */
function initScrollspy() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 3. Scroll Reveal Animations (IntersectionObserver)
 * ------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.grid-section, .instagram, .testimonial, .blog-section, .contact-section, .certifications-section');
  
  revealElements.forEach(el => el.classList.add('reveal-init'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
 * 4. Image Lightbox Modal (Certificates & Instagram Gallery)
 * ------------------------------------------------------------- */
function initInstagramLightbox() {
  const images = document.querySelectorAll('.insta-grid img, .lightbox-trigger');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption) {
        lightboxCaption.textContent = img.dataset.caption || img.alt || 'Yoga & Qualification Detail';
      }
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* -------------------------------------------------------------
 * 5. Testimonials Slider Carousel
 * ------------------------------------------------------------- */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  const dotsContainer = document.getElementById('testi-dots');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Create indicator dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `testi-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    const dots = dotsContainer?.querySelectorAll('.testi-dot');
    if (dots && dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots && dots[currentIndex]) dots[currentIndex].classList.add('active');
    resetAutoplay();
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* -------------------------------------------------------------
 * 6. Class Filtering & Booking Modal
 * ------------------------------------------------------------- */
function initClassBooking() {
  const filterBtns = document.querySelectorAll('.class-filter-btn');
  const classCards = document.querySelectorAll('.class-card');
  const bookingModal = document.getElementById('booking-modal');
  const modalClassName = document.getElementById('modal-class-name');
  const modalClose = document.getElementById('booking-close');
  const bookingForm = document.getElementById('booking-form');

  // Filter logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      classCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal logic
  document.querySelectorAll('.book-class-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.dataset.title || 'Yoga Class';
      if (modalClassName) modalClassName.textContent = title;
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeBooking = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  modalClose?.addEventListener('click', closeBooking);
  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBooking();
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Namaste! Your spot has been reserved. Check your email for details.');
      closeBooking();
      bookingForm.reset();
    });
  }
}

/* -------------------------------------------------------------
 * 7. Blog Post Read Modal
 * ------------------------------------------------------------- */
function initBlogModal() {
  const blogModal = document.getElementById('blog-modal');
  const modalTitle = document.getElementById('blog-modal-title');
  const modalCategory = document.getElementById('blog-modal-category');
  const modalDate = document.getElementById('blog-modal-date');
  const modalBody = document.getElementById('blog-modal-body');
  const modalImg = document.getElementById('blog-modal-img');
  const closeBtn = document.getElementById('blog-modal-close');

  const articlesData = {
    '1': {
      title: 'The Art of Inside Flow: Moving to the Beat of Your Heart',
      category: 'Inside Flow',
      date: 'August 10, 2026',
      img: 'assets/IMG_1350.webp',
      content: `
        <p>Inside Flow is more than just a workout—it is an evolution of Vinyasa yoga where movement aligns continuously with modern music and rhythmic breathing. Each sequence tells a story through grace, posture, and strength.</p>
        <p>When we sync our movement with music, we bypass the analytical mind and drop directly into the body's intuitive intelligence. You are no longer just practicing yoga; you are living the music.</p>
        <h4>Key Benefits of Inside Flow:</h4>
        <ul>
          <li><strong>Emotional Release:</strong> Music serves as a bridge for releasing suppressed tension and emotions.</li>
          <li><strong>Cardiovascular Health:</strong> Seamless transitions elevate your heart rate gently.</li>
          <li><strong>Deep Focus:</strong> Choreography requires total presence, placing you in an effortless flow state.</li>
        </ul>
        <p>Join us in our weekly Inside Flow live sessions and feel the transformative energy for yourself.</p>
      `
    },
    '2': {
      title: '5 Morning Mindful Habits for Emotional Balance',
      category: 'Mindfulness',
      date: 'July 28, 2026',
      img: 'assets/IMG_1795.webp',
      content: `
        <p>How you spend the first 20 minutes of your day sets the tone for your entire nervous system. Cultivating gentle, grounding morning habits helps you respond to life's challenges with clarity rather than reactivity.</p>
        <h4>1. Conscious Breathing (Pranayama)</h4>
        <p>Before reaching for your phone, take 10 deep, conscious belly breaths. Feel your lungs expand and acknowledge the gift of a new day.</p>
        <h4>2. Hydration with Intention</h4>
        <p>Drink a warm glass of lemon water slowly, noticing the sensation and warmth grounding your physical body.</p>
        <h4>3. 5-Minute Gentle Spine Mobilization</h4>
        <p>Unfold Cat-Cow poses or gentle lateral stretches to awaken spinal fluid and release nocturnal stiffness.</p>
      `
    },
    '3': {
      title: 'Why Savasana is the Most Important Yoga Pose',
      category: 'Philosophy',
      date: 'July 14, 2026',
      img: 'assets/IMG_5915.webp',
      content: `
        <p>In our fast-paced world, sitting in stillness often feels like a luxury—or even an discomfort. Yet Savasana (Corpse Pose) is where the magic of physical yoga practice integrates into the central nervous system.</p>
        <p>During physical movement, we stimulate muscles, compress joints, and release hormones. Savasana allows the parasympathetic nervous system ("rest and digest") to assimilate all physical work done during class.</p>
        <p>Never skip Savasana. It is the final gift of peace you offer yourself before stepping back into the world.</p>
      `
    }
  };

  document.querySelectorAll('.read-blog-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.articleId;
      const article = articlesData[id];
      if (!article || !blogModal) return;

      if (modalTitle) modalTitle.textContent = article.title;
      if (modalCategory) modalCategory.textContent = article.category;
      if (modalDate) modalDate.textContent = article.date;
      if (modalBody) modalBody.innerHTML = article.content;
      if (modalImg) {
        modalImg.src = article.img;
        modalImg.alt = article.title;
      }

      blogModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeBlog = () => {
    if (blogModal) {
      blogModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  closeBtn?.addEventListener('click', closeBlog);
  blogModal?.addEventListener('click', (e) => {
    if (e.target === blogModal) closeBlog();
  });
}

/* -------------------------------------------------------------
 * 8. Contact & Newsletter Form Handling
 * ------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value;
    showToast(`Thank you, ${name || 'friend'}! Your message has been sent. Se will get back to you shortly.`);
    contactForm.reset();
  });

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Welcome to our mindful newsletter community!');
    newsletterForm.reset();
  });
}

/* -------------------------------------------------------------
 * 9. Toast Notification System
 * ------------------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-om"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* -------------------------------------------------------------
 * 10. Zen Ambient Soundscape (Web Audio API Synthesizer)
 * ------------------------------------------------------------- */
function initZenAudio() {
  const zenBtn = document.getElementById('zen-audio-btn');
  if (!zenBtn) return;

  let audioCtx = null;
  let masterGain = null;
  let isPlaying = false;
  let intervalId = null;

  function createSingingBowl() {
    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx?.resume();
    }
    if (!audioCtx) return;

    const fundamental = 216; // Harmonic A3 tuning
    const harmonics = [1, 2.76, 5.4, 8.9];

    harmonics.forEach((mult, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamental * mult, audioCtx.currentTime);

      const now = audioCtx.currentTime;
      const duration = 6 + index * 2;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08 / (index + 1), now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  zenBtn.addEventListener('click', () => {
    if (!isPlaying) {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.5;
        masterGain.connect(audioCtx.destination);
      }

      isPlaying = true;
      zenBtn.classList.add('playing');
      zenBtn.setAttribute('title', 'Pause Zen Ambience');
      showToast('Zen ambient harmony playing...');
      
      createSingingBowl();
      intervalId = setInterval(createSingingBowl, 7000);
    } else {
      isPlaying = false;
      zenBtn.classList.remove('playing');
      zenBtn.setAttribute('title', 'Pause Zen Ambience');
      if (intervalId) clearInterval(intervalId);
      if (audioCtx) audioCtx.suspend();
      showToast('Zen ambience paused.');
    }
  });
}
