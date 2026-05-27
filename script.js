  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
    }, 1800);
  });

  /* ── CURSOR ── */
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  /* ── MARQUEE ── */
  const items = ['Architecture', '◆', 'Interior Design', '◆', 'Urban Strategy', '◆', 'Spatial Thinking', '◆', 'Material Craft', '◆', 'Sustainable Build', '◆'];
  const track = document.getElementById('marqueeTrack');
  const doubled = [...items, ...items, ...items, ...items];
  track.innerHTML = doubled.map(t =>
    t === '◆'
      ? `<span class="marquee-item marquee-dot">${t}</span>`
      : `<span class="marquee-item">${t}</span>`
  ).join('');

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  /* ── NAV SHRINK ON SCROLL ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(245,240,232,.92)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.borderBottom = '1px solid rgba(17,16,9,.08)';
    } else {
      nav.style.background = '';
      nav.style.backdropFilter = '';
      nav.style.borderBottom = '';
    }
  });

  /* ── MOBILE MENU ── */
  function toggleMobileMenu() {
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');
    if (!links) return;
    if (links.style.display === 'flex') {
      links.style.display = '';
      if (cta) cta.style.display = '';
    } else {
      links.style.display = 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'fixed';
      links.style.top = '70px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'rgba(245,240,232,.97)';
      links.style.padding = '32px 24px';
      links.style.gap = '24px';
      links.style.zIndex = '490';
      links.style.backdropFilter = 'blur(12px)';
      if (cta) { cta.style.display = 'none'; }
    }
  }

  /* ── FORM SUBMIT ── */
  function handleSubmit(btn) {
    const success = document.getElementById('formSuccess');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = '#b85c38';
      btn.style.borderColor = '#b85c38';
      success.style.display = 'block';
    }, 1200);
  }

  /* ── SMOOTH ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--rust)';
        } else {
          link.style.color = '';
        }
      }
    });
  });