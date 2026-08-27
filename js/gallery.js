/* =========================================================
   QT TRAINING — gallery.js   (filtering + lightbox)
   ========================================================= */
(function(){
  function initGallery(){
    const grid = document.getElementById('galleryGrid');
    if(!grid) return;
    const data = window.QT.state.gallery;
    function render(filter){
      const items = filter && filter!=='all' ? data.filter(g=>g.category===filter) : data;
      grid.innerHTML = items.map(g=>`
        <div class="gallery-item" data-img="${g.img}" data-cap="${window.QT.escapeHtml(g.title)}">
          <img src="${g.img}" alt="${window.QT.escapeHtml(g.title)}" loading="lazy">
          <div class="gallery-item__cap">${window.QT.escapeHtml(g.title)}</div>
        </div>`).join('');
      bind();
    }
    function bind(){
      grid.querySelectorAll('.gallery-item').forEach(it=>{
        it.addEventListener('click', ()=> openLightbox(it.dataset.img, it.dataset.cap));
      });
    }
    // filters
    document.querySelectorAll('.gallery-filter').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.gallery-filter').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.filter);
      });
    });
    render('all');

    // lightbox
    const lb = document.getElementById('lightbox');
    function openLightbox(src, cap){
      lb.querySelector('.lightbox__img').innerHTML = `<img src="${src}" alt="">`;
      lb.querySelector('.lightbox__cap').textContent = cap||'';
      lb.classList.add('open');
    }
    document.querySelector('.lightbox__close').addEventListener('click', ()=> lb.classList.remove('open'));
    lb.addEventListener('click', e=>{ if(e.target===lb) lb.classList.remove('open'); });
  }
  window.QTGallery = { initGallery };
})();
