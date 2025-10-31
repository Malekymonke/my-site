document.addEventListener("DOMContentLoaded", () => {
  const feed = document.getElementById("feed");
  const tabs = document.querySelectorAll("menu[role='tablist'] li a");

  // функция подгрузки контента
  function loadContent(path) {
    fetch(path)
      .then(res => res.text())
      .then(html => { feed.innerHTML = html; })
      .catch(err => {
        feed.innerHTML = `<div class="window"><div class="window-body">
        <p>?? Error loading ${path}</p><pre>${err}</pre></div></div>`;
        console.error(err);
      });
  }

  // при загрузке страницы подгружаем Artwork
  loadContent("content/artwork.html");

  // обработчик кликов по вкладкам
  tabs.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = e.target.getAttribute("href");

      // выделяем активную вкладку
      tabs.forEach(t => t.parentElement.removeAttribute("aria-selected"));
      e.target.parentElement.setAttribute("aria-selected", "true");

      // загружаем нужный контент
      loadContent(`content/${target}.html`);
    });
  });
});

