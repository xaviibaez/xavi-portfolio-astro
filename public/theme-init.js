(function () {
  var saved = localStorage.getItem('xavi-theme');
  var theme = saved || 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();
