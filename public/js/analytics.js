// Google Analytics 4 setup. The Measurement ID comes from the data-ga-id attribute on this script tag.
(function () {
  var id = document.currentScript && document.currentScript.getAttribute('data-ga-id');
  if (!id) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { content_group: document.documentElement.getAttribute('data-lang') || '' });
})();
