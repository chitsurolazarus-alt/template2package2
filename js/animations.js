/* =========================================================
   QT TRAINING — animations.js
   Scroll reveal, animated counters, typing effect
   ========================================================= */
(function(){
  function reveal(){
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    if(!('IntersectionObserver' in window)){
      els.forEach(el=>el.classList.add('in')); return;
    }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.15});
    els.forEach(el=>io.observe(el));
  }

  function counters(){
    const els = document.querySelectorAll('.counter');
    const run = (el)=>{
      const target = parseFloat(el.dataset.target)||0;
      const suffix = el.dataset.suffix||'';
      const dur = 1600; const start = performance.now();
      const step = (now)=>{
        const p = Math.min((now-start)/dur, 1);
        const val = Math.floor((1-Math.pow(1-p,3))*target);
        el.textContent = val + suffix;
        if(p<1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };
    if(!('IntersectionObserver' in window)){ els.forEach(run); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ run(e.target); io.unobserve(e.target); } });
    }, {threshold:0.4});
    els.forEach(el=>io.observe(el));
  }

  function typing(){
    document.querySelectorAll('.typing').forEach(el=>{
      const text = el.dataset.text || el.textContent;
      el.textContent='';
      let i=0;
      const caret = document.createElement('span');
      caret.className='caret'; caret.textContent='|';
      el.after(caret);
      const t = setInterval(()=>{
        el.textContent = text.slice(0, i++);
        if(i>text.length){ clearInterval(t); setTimeout(()=>caret.remove(),1200); }
      }, 55);
    });
  }

  window.QTAnim = { reveal, counters, typing, init(){ reveal(); counters(); typing(); } };
})();
