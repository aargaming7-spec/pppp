/* ============================================================
   MEGALAND ARTHA SENTOSA – script.js
   Berisi: Navbar, Scroll Reveal, Counter, Project Filter,
           Form Validation, Back To Top
============================================================ */

/* ============================================================
   1. NAVBAR – Scroll behavior & Hamburger toggle
============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = document.querySelectorAll('.nav-link');

  /* Tambah class .scrolled saat halaman di-scroll */
  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // jalankan sekali saat load

  /* Toggle hamburger (mobile) */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  /* Tutup menu saat link diklik (mobile) */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* Highlight link aktif berdasarkan posisi scroll */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id            = section.getAttribute('id');
      const link          = document.querySelector('.nav-link[href="#' + id + '"]');

      if (link) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink, { passive: true });
})();


/* ============================================================
   2. SCROLL REVEAL – Elemen muncul saat masuk viewport
============================================================ */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  /* Opsi IntersectionObserver */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', // mulai sedikit sebelum elemen penuh terlihat
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        /* Tambah delay bertahap untuk child elements */
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach(function (sib, i) {
          if (sib === entry.target) delay = i * 80;
        });

        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);

        /* Berhenti observasi setelah terlihat */
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ============================================================
   3. COUNTER ANIMATION – Angka naik saat hero stats terlihat
============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800; // milidetik
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Easing: ease-out cubic */
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  /* Pantau hero section */
  const heroStats = document.querySelector('.hero-stats');

  if (heroStats) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          counters.forEach(animateCounter);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
  }
})();


/* ============================================================
   4. PROJECT FILTER – Saring kartu proyek berdasarkan kategori
============================================================ */
(function initProjectFilter() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* Update tombol aktif */
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      /* Tampilkan / sembunyikan kartu */
      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          /* Trigger reveal ulang jika belum visible */
          if (!card.classList.contains('visible')) {
            card.classList.add('visible');
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ============================================================
   5. FORM VALIDATION – Validasi sederhana sebelum submit
============================================================ */
(function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  /* Helper: tampilkan error */
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById('err-' + fieldId);
    if (field)  field.classList.add('error');
    if (error)  error.textContent = message;
  }

  /* Helper: hapus error */
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById('err-' + fieldId);
    if (field)  field.classList.remove('error');
    if (error)  error.textContent = '';
  }

  /* Validasi email */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* Hapus error saat user mulai ketik */
  ['name', 'email', 'message'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () { clearError(id); });
    }
  });

  /* Handle submit */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Reset semua error */
    ['name', 'email', 'message'].forEach(clearError);
    let isValid = true;

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    /* Validasi nama */
    if (!name) {
      showError('name', 'Nama lengkap wajib diisi.');
      isValid = false;
    } else if (name.length < 3) {
      showError('name', 'Nama minimal 3 karakter.');
      isValid = false;
    }

    /* Validasi email */
    if (!email) {
      showError('email', 'Email wajib diisi.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Format email tidak valid.');
      isValid = false;
    }

    /* Validasi pesan */
    if (!message) {
      showError('message', 'Pesan wajib diisi.');
      isValid = false;
    } else if (message.length < 20) {
      showError('message', 'Pesan terlalu singkat (minimal 20 karakter).');
      isValid = false;
    }

    if (!isValid) return;

    /* Simulasi pengiriman (tanpa backend) */
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled    = true;

    setTimeout(function () {
      form.reset();
      submitBtn.textContent = 'Kirim Pesan';
      submitBtn.disabled    = false;
      successMsg.style.display = 'block';

      /* Sembunyikan pesan sukses setelah 6 detik */
      setTimeout(function () {
        successMsg.style.display = 'none';
      }, 6000);
    }, 1500); /* Simulasi delay 1.5 detik */
  });
})();


/* ============================================================
   6. BACK TO TOP – Tombol kembali ke atas
============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  if (!btn) return;

  /* Tampilkan tombol setelah scroll 400px */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  /* Scroll ke atas saat diklik */
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   7. SMOOTH ANCHOR SCROLL – Offset untuk fixed navbar
============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
        10
      ) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - navbarH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   8. PARTNERS TICKER – Pastikan animasi berjalan mulus
      (Ticker CSS sudah handle ini, JS hanya fallback duplikasi)
============================================================ */
(function initTicker() {
  const ticker = document.getElementById('partners-ticker');
  if (!ticker) return;

  /* Jika lebar konten kurang dari dua kali lebar kontainer,
     tambahkan klone agar animasi seamless */
  function checkTickerWidth() {
    const wrapWidth    = ticker.parentElement.offsetWidth;
    const tickerWidth  = ticker.scrollWidth;

    if (tickerWidth < wrapWidth * 2) {
      const clone = ticker.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      ticker.parentElement.appendChild(clone);
    }
  }

  checkTickerWidth();
  window.addEventListener('resize', checkTickerWidth);
})();
