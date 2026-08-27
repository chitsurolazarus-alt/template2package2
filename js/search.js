/* =========================================================
   QT TRAINING — search.js   (live search across courses & news)
   ========================================================= */
(function(){
  function initSearch(){
    const input = document.querySelector('.live-search input');
    const box = document.querySelector('.search-results');
    if(!input || !box) return;
    const data = window.QT.state;
    function render(q){
      q = q.trim().toLowerCase();
      if(!q){ box.style.display='none'; return; }
      const courses = data.courses.filter(c=>c.title.toLowerCase().includes(q)||c.short.toLowerCase().includes(q));
      const news = data.news.filter(n=>n.title.toLowerCase().includes(q)||n.excerpt.toLowerCase().includes(q));
      let html='';
      courses.forEach(c=> html += `<a href="courses.html"><span class="cat">Course</span> ${window.QT.escapeHtml(c.title)}</a>`);
      news.forEach(n=> html += `<a href="news.html"><span class="cat">News</span> ${window.QT.escapeHtml(n.title)}</a>`);
      box.innerHTML = html || '<div style="padding:14px 16px;color:#999;">No results found.</div>';
      box.style.display='block';
    }
    input.addEventListener('input', e=> render(e.target.value));
    document.addEventListener('click', e=>{ if(!e.target.closest('.live-search')) box.style.display='none'; });
  }
  window.QTSearch = { initSearch };
})();
