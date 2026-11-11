(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Google Analytics events (no-op when Analytics is not loaded, e.g. local testing)
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    var where = a.closest('.float-chat') ? 'floating_button' : a.closest('footer') ? 'footer' : a.closest('header') ? 'header' : 'page';
    if (href.indexOf('tel:') === 0) track('phone_click', { link_location: where });
    else if (href.indexOf('mailto:') === 0) track('email_click', { link_location: where });
    else if (href.indexOf('wa.me') !== -1) track('whatsapp_click', { link_location: where });
    else if (href.indexOf('zalo.me') !== -1) track('zalo_click', { link_location: where });
  });

  // Sticky header shadow
  var header = document.querySelector('[data-header]');
  var onScroll = function () { header && header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setNav(false); });
  }

  // Language menu: close on outside click / Escape
  var langMenu = document.querySelector('[data-lang-menu]');
  if (langMenu) {
    document.addEventListener('click', function (e) { if (langMenu.open && !langMenu.contains(e.target)) langMenu.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && langMenu.open) { langMenu.open = false; langMenu.querySelector('summary').focus(); } });
  }

  // Reveal on scroll
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion) {
    pending.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    pending.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 70 + 'ms'; });
    var ticking = false;
    var checkReveal = function () {
      ticking = false;
      var limit = window.innerHeight * 0.94;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < limit) { el.classList.add('is-visible'); return false; }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onRevealScroll);
    };
    var onRevealScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(checkReveal); } };
    window.addEventListener('scroll', onRevealScroll, { passive: true });
    window.addEventListener('resize', onRevealScroll);
    checkReveal();
  }

  // Count-up stats
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target, target = +el.dataset.count, start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1200, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  // Gallery filter
  var filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      document.querySelectorAll('.masonry-item').forEach(function (item) {
        item.hidden = !(f === 'all' || item.dataset.cat === f);
      });
    });
  });

  // Lightbox
  var lb = document.querySelector('[data-lightbox]');
  if (lb) {
    var lbImg = lb.querySelector('[data-lb-img]');
    var lbCap = lb.querySelector('[data-lb-cap]');
    var items = [], index = 0, lastFocus = null;
    function show(i) {
      index = (i + items.length) % items.length;
      var it = items[index];
      lbImg.src = it.dataset.lbSrc;
      lbImg.alt = it.dataset.lbAlt || '';
      lbCap.textContent = it.dataset.lbAlt || '';
    }
    function open(group, i) {
      items = Array.prototype.filter.call(group.querySelectorAll('[data-lb-src]'), function (el) { return !el.hidden; });
      lastFocus = document.activeElement;
      show(items.indexOf(i));
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      lb.querySelector('[data-lb-close]').focus();
    }
    function close() {
      lb.hidden = true;
      document.body.style.overflow = '';
      lastFocus && lastFocus.focus();
    }
    document.querySelectorAll('[data-gallery]').forEach(function (group) {
      group.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-lb-src]');
        if (btn) open(group, btn);
      });
    });
    lb.querySelector('[data-lb-close]').addEventListener('click', close);
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(index - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab') {
        var f = lb.querySelectorAll('button');
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
  }

  // Gallery: Photos / Videos tabs (hash-based, works without JS as anchors)
  var tabs = document.querySelector('[data-media-tabs]');
  if (tabs) {
    var tabLinks = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
    function selectTab(id, focus) {
      tabLinks.forEach(function (a) {
        var on = a.getAttribute('aria-controls') === id;
        a.setAttribute('aria-selected', String(on));
        a.tabIndex = on ? 0 : -1;
        document.getElementById(a.getAttribute('aria-controls')).hidden = !on;
        if (on && focus) a.focus();
      });
    }
    function fromHash() { selectTab(location.hash === '#videos' ? 'videos' : 'photos'); }
    tabLinks.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var id = a.getAttribute('aria-controls');
        history.replaceState(null, '', '#' + id);
        selectTab(id);
      });
      a.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        var next = tabLinks[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabLinks.length) % tabLinks.length];
        history.replaceState(null, '', '#' + next.getAttribute('aria-controls'));
        selectTab(next.getAttribute('aria-controls'), true);
      });
    });
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // YouTube: show thumbnail first, load the player only when clicked
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-yt]');
    if (!btn) return;
    track('video_play', { video_id: btn.dataset.yt, video_title: btn.dataset.ytTitle || '' });
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(btn.dataset.yt) + '?autoplay=1&rel=0&playsinline=1';
    iframe.title = btn.dataset.ytTitle || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    btn.replaceWith(iframe);
    iframe.focus();
  });

  // Contact form: inline validation + AJAX submit
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = document.querySelector('[data-form-status]');
    var rules = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      message: function (v) { return v.trim().length >= 5; },
    };
    function check(field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var ok = rule(field.value);
      field.setAttribute('aria-invalid', String(!ok));
      var err = document.getElementById('e-' + field.name);
      if (err) err.hidden = ok;
      return ok;
    }
    Object.keys(rules).forEach(function (n) {
      var f = form.elements[n];
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (n) { if (!check(form.elements[n]) && !firstBad) firstBad = form.elements[n]; });
      if (firstBad) { firstBad.focus(); return; }
      var btn = form.querySelector('[data-submit]');
      var label = btn.querySelector('span');
      var original = label.textContent;
      btn.disabled = true;
      label.textContent = form.dataset.msgSending;
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok && d.ok }; }); })
        .then(function (res) {
          status.innerHTML = '';
          var p = document.createElement('p');
          p.className = 'alert ' + (res.ok ? 'alert-success' : 'alert-error');
          p.textContent = res.ok ? form.dataset.msgSent : form.dataset.msgError;
          status.appendChild(p);
          if (res.ok) {
            track('generate_lead', { form_name: 'contact', program: (form.elements.program && form.elements.program.value) || '' });
            form.reset();
          }
          status.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        })
        .catch(function () {
          status.innerHTML = '<p class="alert alert-error"></p>';
          status.firstChild.textContent = form.dataset.msgError;
        })
        .finally(function () { btn.disabled = false; label.textContent = original; });
    });
  }
})();
