/* =========================================================
   QT TRAINING — main.js   (orchestrator for public site)
   ========================================================= */
(function(){
  const A = window.QT;
  const E = A.escapeHtml;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  /* ---------- Header / Footer injection ---------- */
  const settings = A.state.settings;
  function headerHTML(){
    return `
    <div class="announce"><div class="announce__track">FREE Food Safety &amp; Hygiene Certificate – Mopani District Only! Closing: 15 July 2025 &nbsp;|&nbsp; <a href="contact.html">Register Now →</a> &nbsp;&nbsp;&nbsp; FREE Food Safety &amp; Hygiene Certificate – Mopani District Only! Closing: 15 July 2025 &nbsp;|&nbsp; <a href="contact.html">Register Now →</a></div></div>
    <header class="header" id="header">
      <div class="container header__inner">
        <a href="index.html" class="brand">
          <img src="images/logo.svg" alt="QT Training logo">
          <span class="brand__text"><span class="brand__name">QT TRAINING</span><span class="brand__tag">${E(settings.tagline)}</span></span>
        </a>
        <nav class="nav" id="nav">
          <ul class="nav__list" id="navList">
            <li><a class="nav__link" href="index.html">Home</a></li>
            <li class="nav__item--dropdown"><a class="nav__link" href="courses.html">Courses ▾</a>
              <div class="dropdown">
                ${A.state.courses.map(c=>`<a href="courses.html">${E(c.title)}</a>`).join('')}
              </div></li>
            <li><a class="nav__link" href="about.html">About</a></li>
            <li><a class="nav__link" href="news.html">News</a></li>
            <li><a class="nav__link" href="gallery.html">Gallery</a></li>
            <li><a class="nav__link" href="downloads.html">Downloads</a></li>
            <li><a class="nav__link" href="contact.html">Contact</a></li>
            <li class="nav__apply"><a class="nav__link" href="contact.html">Apply Now</a></li>
          </ul>
        </nav>
        <div class="header__actions">
          <a href="contact.html" class="btn btn--red btn--pulse btn--apply">Apply Now</a>
          <button class="dark-toggle" id="darkToggle" aria-label="Toggle dark mode" title="Dark mode">🌙</button>
          <a href="admin.html" class="nav__link login-link">Login</a>
          <button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </div>
    </header>`;
  }
  function footerHTML(){
    const soc = settings.social;
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="f-name">QT TRAINING</div>
            <p>Going the extra mile for both stakeholder and learner.</p>
            <div class="footer__social">
              <a href="${E(soc.facebook)}" aria-label="Facebook"><img src="images/icons/facebook.svg" alt="Facebook"></a>
              <a href="${E(soc.twitter)}" aria-label="Twitter"><img src="images/icons/twitter.svg" alt="Twitter"></a>
              <a href="${E(soc.linkedin)}" aria-label="LinkedIn"><img src="images/icons/linkedin.svg" alt="LinkedIn"></a>
              <a href="${E(soc.instagram)}" aria-label="Instagram"><img src="images/icons/instagram.svg" alt="Instagram"></a>
              <a href="https://wa.me/${E(soc.whatsapp.replace(/\D/g,''))}" aria-label="WhatsApp"><img src="images/icons/whatsapp.svg" alt="WhatsApp"></a>
            </div>
            <form class="newsletter" id="footerNews">
              <input type="email" placeholder="Your email" required aria-label="Email">
              <button class="btn btn--red" type="submit">Subscribe</button>
            </form>
            <div class="form__success" id="newsMsg" style="display:none;margin-top:8px;">Thanks for subscribing!</div>
          </div>
          <div><h4>Quick Links</h4><div class="footer__links">
            <a href="index.html">Home</a><a href="courses.html">Courses</a><a href="about.html">About</a>
            <a href="news.html">News</a><a href="gallery.html">Gallery</a><a href="downloads.html">Downloads</a><a href="contact.html">Contact</a>
          </div></div>
          <div><h4>Courses</h4><div class="footer__links">
            ${A.state.courses.map(c=>`<a href="courses.html">${E(c.title)}</a>`).join('')}
          </div></div>
          <div class="footer__contact"><h4>Contact Info</h4>
            <p>📍 ${E(settings.address)}</p>
            <p>📞 <a href="tel:${E(settings.phone.replace(/\s/g,''))}">${E(settings.phone)}</a></p>
            <p>✉️ <a href="mailto:${E(settings.email)}">${E(settings.email)}</a></p>
          </div>
        </div>
      </div>
      <div class="footer__bottom">© 2025 QT Training (Pty) Ltd. All rights reserved.</div>
    </footer>`;
  }

  function injectChrome(){
    const h=$('#site-header'), f=$('#site-footer');
    if(h) h.innerHTML=headerHTML();
    if(f) f.innerHTML=footerHTML();
  }

  /* ---------- Floating UI ---------- */
  function injectFloating(){
    const wa = settings.social.whatsapp.replace(/\D/g,'');
    const wrap=document.createElement('div');
    wrap.innerHTML = `
      <a class="whatsapp-fab" href="https://wa.me/${wa}?text=${encodeURIComponent('Hello QT Training, I would like more information.')}" target="_blank" rel="noopener" aria-label="WhatsApp chat">💬</a>
      <div class="back-to-top" id="backTop" aria-label="Back to top">↑</div>
      <div class="cookie" id="cookie">
        <p>We use cookies to improve your experience. By continuing you agree to our use of cookies. <a href="about.html">Learn more</a>.</p>
        <div class="cookie__btns"><button class="btn btn--red btn-sm" id="cookieAccept">Accept</button><button class="btn btn--outline btn-sm" id="cookieSettings" style="color:#fff;border-color:#fff;">Settings</button></div>
      </div>`;
    document.body.appendChild(wrap);
    // back to top
    const bt=$('#backTop');
    window.addEventListener('scroll',()=>{ bt.classList.toggle('show', window.scrollY>300); });
    bt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    // cookie
    if(localStorage.getItem('qt_cookie')!=='1'){
      setTimeout(()=>$('#cookie').classList.add('show'),900);
    }
    $('#cookieAccept').addEventListener('click',()=>{ localStorage.setItem('qt_cookie','1'); $('#cookie').classList.remove('show'); });
    $('#cookieSettings').addEventListener('click',()=>{ localStorage.setItem('qt_cookie','1'); $('#cookie').classList.remove('show'); });
  }

  /* ---------- Dark mode ---------- */
  function initDark(){
    const saved=localStorage.getItem('qt_theme');
    if(saved==='dark') document.documentElement.setAttribute('data-theme','dark');
    const btn=$('#darkToggle'); if(!btn) return;
    btn.textContent = saved==='dark'?'☀️':'🌙';
    btn.addEventListener('click',()=>{
      const now=document.documentElement.getAttribute('data-theme')==='dark';
      if(now){ document.documentElement.removeAttribute('data-theme'); localStorage.setItem('qt_theme','light'); btn.textContent='🌙'; }
      else{ document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('qt_theme','dark'); btn.textContent='☀️'; }
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu(){
    const ham=$('#hamburger'), list=$('#navList'); if(!ham||!list) return;
    ham.addEventListener('click',()=>{ list.classList.toggle('open'); ham.classList.toggle('open'); });
    list.querySelectorAll('.nav__item--dropdown > .nav__link').forEach(a=>{
      a.addEventListener('click',e=>{ if(window.innerWidth<=880){ e.preventDefault(); a.parentElement.classList.toggle('open'); } });
    });
    list.querySelectorAll('a').forEach(a=> a.addEventListener('click',()=>{ if(window.innerWidth<=880) list.classList.remove('open'); }));
  }

  /* ---------- Loading screen ---------- */
  function initLoading(){
    const el=$('#loading'); if(!el) return;
    const fill=el.querySelector('.loading__fill');
    let p=0; const iv=setInterval(()=>{ p+=Math.random()*18; if(p>=100){p=100; clearInterval(iv); setTimeout(()=>el.classList.add('hide'),400);} fill.style.width=p+'%'; },180);
    window.addEventListener('load',()=>{ setTimeout(()=>el.classList.add('hide'),600); });
  }

  /* ---------- Header shadow on scroll ---------- */
  function initHeaderShadow(){
    const h=$('#header'); if(!h) return;
    window.addEventListener('scroll',()=> h.classList.toggle('header--scrolled', window.scrollY>20));
  }

  /* ---------- Newsletter ---------- */
  function initNewsletter(){
    const f=$('#footerNews'); if(!f) return;
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const email=f.querySelector('input').value.trim();
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ alert('Please enter a valid email.'); return; }
      if(!A.state.subscribers.find(s=>s.email===email)){
        A.state.subscribers.push({id:A.nextId(A.state.subscribers),email,date:A.formatDate(),status:'Active'});
        A.save();
      }
      $('#newsMsg').style.display='block';
      f.reset();
      setTimeout(()=>$('#newsMsg').style.display='none',4000);
    });
  }

  /* ---------- Countdown ---------- */
  function initCountdown(){
    const wrap=$('#countdown'); if(!wrap) return;
    const target=new Date('2025-07-15T23:59:59');
    function tick(){
      const diff=target-new Date();
      if(diff<=0){ wrap.innerHTML='<div class="countdown__box" style="background:var(--red)"><div class="countdown__num">CLOSED</div></div>'; return; }
      const d=Math.floor(diff/864e5), h=Math.floor(diff%864e5/36e5), m=Math.floor(diff%36e5/6e4), s=Math.floor(diff%6e4/1e3);
      wrap.innerHTML=`
        <div class="countdown__box"><div class="countdown__num">${d}</div><div class="countdown__lbl">Days</div></div>
        <div class="countdown__box"><div class="countdown__num">${h}</div><div class="countdown__lbl">Hours</div></div>
        <div class="countdown__box"><div class="countdown__num">${m}</div><div class="countdown__lbl">Mins</div></div>
        <div class="countdown__box"><div class="countdown__num">${s}</div><div class="countdown__lbl">Secs</div></div>`;
    }
    tick(); setInterval(tick,1000);
  }

  /* ---------- Course filter ---------- */
  function initCourseFilter(){
    const bar=$('#courseFilter'); if(!bar) return;
    bar.querySelectorAll('.filter-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        bar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f=btn.dataset.filter;
        $$('#coursesGrid .course-card').forEach(card=>{
          const cat=card.dataset.cat;
          const show = f==='all' || cat===f || (f==='free'&&cat==='sponsored');
          card.style.display=show?'':'none';
        });
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ(){
    $$('.accordion__item').forEach(item=>{
      const q=item.querySelector('.accordion__q');
      q.addEventListener('click',()=> item.classList.toggle('open'));
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm(){
    const f=$('#contactForm'); if(!f) return;
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const name=$('#cName').value.trim(), email=$('#cEmail').value.trim(), phone=$('#cPhone').value.trim(), subject=$('#cSubject').value, msg=$('#cMsg').value.trim();
      let ok=true;
      const err=(id,cond)=>{ const el=$('#'+id); el.style.display=cond?'none':'block'; if(!cond) ok=false; };
      err('errName',name.length>1);
      err('errEmail',/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email));
      err('errPhone',phone.replace(/\s/g,'').length>=6);
      err('errMsg',msg.length>2);
      if(!ok) return;
      A.state.enquiries.unshift({id:A.nextId(A.state.enquiries),name,email,phone,subject,message:msg,status:'New',date:A.formatDate()});
      A.save();
      $('#formSuccess').style.display='block';
      f.reset();
      setTimeout(()=>$('#formSuccess').style.display='none',5000);
    });
  }

  /* ---------- News modal ---------- */
  function initNewsModal(){
    if($('#newsModal')) return;
    const m=document.createElement('div');
    m.className='modal'; id='newsModal'; m.id='newsModal';
    m.innerHTML=`<div class="modal__box"><button class="modal__close" id="nmClose">×</button><div id="nmBody"></div></div>`;
    document.body.appendChild(m);
    $('#nmClose').addEventListener('click',()=>m.classList.remove('open'));
    m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('open'); });
    window.QTMain.openNews=function(id){
      const n=A.state.news.find(x=>x.id===id); if(!n) return;
      $('#nmBody').innerHTML=`<div class="modal__img"><img src="${n.img}" alt=""></div><span class="badge">${E(n.category)}</span><h2 style="margin:10px 0;">${E(n.title)}</h2><p style="color:var(--red);font-weight:700;">${E(n.date)}</p><p style="color:var(--fg-soft);margin-top:10px;">${E(n.content)}</p>`;
      m.classList.add('open');
    };
  }

  /* ---------- Course modal ---------- */
  function initCourseModal(){
    if($('#courseModal')) return;
    const m=document.createElement('div'); m.className='modal'; m.id='courseModal';
    m.innerHTML=`<div class="modal__box"><button class="modal__close" id="cmClose">×</button><div id="cmBody"></div></div>`;
    document.body.appendChild(m);
    $('#cmClose').addEventListener('click',()=>m.classList.remove('open'));
    m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('open'); });
    window.QTMain.openCourse=function(id){
      const c=A.state.courses.find(x=>x.id===id); if(!c) return;
      $('#cmBody').innerHTML=`<div class="modal__img"><img src="${c.img}" alt=""></div>
        <span class="badge ${c.cat==='sponsored'?'badge--free':(c.cat==='offer'?'badge--offer':'badge--avail')}">${E(c.statusText)}</span>
        <h2 style="margin:10px 0;">${E(c.title)}</h2>
        <p style="color:var(--fg-soft)">${E(c.desc)}</p>
        <ul class="checklist">${(c.features||[]).map(f=>`<li>${E(f)}</li>`).join('')}</ul>
        <div class="course-card__meta" style="margin:14px 0;"><span>⏱ ${E(c.duration)}</span><span>📍 ${E(c.location)}</span><span>🏛 ${E(c.accreditation)}</span></div>
        <a href="contact.html" class="btn btn--red">Apply Now</a>`;
      m.classList.add('open');
    };
  }

  /* ---------- Testimonials carousel ---------- */
  function initTestiCarousel(){
    const track=$('#testiTrack'), dots=$('#testiDots'); if(!track||!dots) return;
    const slides=track.children.length; let idx=0;
    dots.innerHTML=Array.from({length:slides}).map((_,i)=>`<button data-i="${i}" class="${i===0?'active':''}"></button>`).join('');
    function go(i){ idx=(i+slides)%slides; const w=track.querySelector('.testi-slide').getBoundingClientRect().width+26; track.style.transform=`translateX(${-idx*w}px)`; dots.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('active',j===idx)); }
    dots.querySelectorAll('button').forEach(b=> b.addEventListener('click',()=>go(+b.dataset.i)));
    setInterval(()=>go(idx+1),5000);
  }

  /* ---------- Builders for dynamic content ---------- */
  function courseCard(c){
    const bc = c.cat==='sponsored'?'badge--free':(c.cat==='offer'?'badge--offer':'badge--avail');
    return `<div class="card course-card reveal" data-cat="${c.cat}">
      <div class="course-card__img"><img src="${c.img}" alt="${E(c.title)}" loading="lazy" onerror="this.onerror=null;this.src='${c.fb}'"></div>
      <div class="course-card__body">
        <div class="course-card__cat"><span class="badge ${bc}">${E(c.statusText)}</span></div>
        <h3 class="course-card__title">${E(c.title)}</h3>
        <p class="course-card__desc">${E(c.short||c.desc)}</p>
        <div class="course-card__meta"><span>⏱ ${E(c.duration)}</span><span>📍 ${E(c.location)}</span><span>🏛 ${E(c.accreditation)}</span></div>
        <a href="#" class="read-more" style="margin-bottom:12px" onclick="QTMain.openCourse(${c.id});return false;">Read More →</a>
        <a href="contact.html" class="btn btn--red">Apply Now</a>
      </div></div>`;
  }
  function newsCard(n){
    return `<div class="card news-card reveal">
      <div class="news-card__img"><span class="news-card__date">${E(n.date)}</span><img src="${n.img}" alt="${E(n.title)}" loading="lazy" onerror="this.onerror=null;this.src='${n.fb}'"></div>
      <div class="news-card__body">
        <span class="badge" style="background:var(--charcoal)">${E(n.category)}</span>
        <h3 class="news-card__title" style="margin-top:8px">${E(n.title)}</h3>
        <p class="news-card__excerpt">${E(n.excerpt)}</p>
        <a href="#" class="read-more" onclick="QTMain.openNews(${n.id});return false;">Read More →</a>
      </div></div>`;
  }
  function testiCard(t){
    return `<div class="testi-slide"><div class="card testi-card">
      <div class="testi-card__quote">"</div>
      <p class="testi-card__text">${E(t.text)}</p>
      <div class="stars">${'★'.repeat(t.rating)}</div>
      <div class="testi-card__who"><img class="testi-card__avatar" src="${t.avatar}" alt="" onerror="this.onerror=null;this.src='${t.fb}'"><div><div class="testi-card__name">${E(t.name)}</div><div class="testi-card__course">${E(t.course)}</div></div></div>
    </div></div>`;
  }
  function resourceCard(d){
    return `<div class="resource-card reveal"><div class="resource-card__icon">⬇</div><div class="resource-card__body"><div class="resource-card__title">${E(d.title)}</div><div class="resource-card__cat">${E(d.category)}</div></div><a href="#" class="btn btn--red btn-sm" onclick="alert('In production this would download ${E(d.file)}');return false;">Download</a></div>`;
  }

  function renderDynamic(){
    const g=$('#coursesGrid'); if(g) g.innerHTML=A.state.courses.map(courseCard).join('');
    const fc=$('#featCourses'); if(fc) fc.innerHTML=A.state.courses.slice(0,6).map(courseCard).join('');
    const hn=$('#homeNews'); if(hn) hn.innerHTML=A.state.news.slice(0,3).map(newsCard).join('');
    const ng=$('#newsGrid'); if(ng) ng.innerHTML=A.state.news.map(newsCard).join('');
    const tt=$('#homeTesti'); if(tt) tt.innerHTML=A.state.testimonials.map(testiCard).join('');
    const dg=$('#downloadsGrid'); if(dg) dg.innerHTML=A.state.downloads.map(resourceCard).join('');
    const TEAM_PHOTOS=["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=70","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=70"];
    const tg=$('#teamGrid'); if(tg) tg.innerHTML=A.state.users.slice(0,3).map((u,i)=>`<div class="card team-card reveal"><img class="team-card__avatar" src="${TEAM_PHOTOS[(u.id-1)%TEAM_PHOTOS.length]}" alt="" onerror="this.onerror=null;this.src='images/team/team${((u.id-1)%3)+1}.svg'"><div class="team-card__name">${E(u.name)}</div><div class="team-card__role">${E(u.role)}</div><div class="team-card__bio">Dedicated to guiding learners to success at QT Training.</div></div>`).join('');
    const vg=$('#valuesGrid'); if(vg) vg.innerHTML=[
      ['Integrity','🤝','We act with honesty and transparency in all we do.'],
      ['Excellence','🏆','We pursue the highest standard of training and support.'],
      ['Innovation','💡','We embrace new methods to improve learner outcomes.'],
      ['Empowerment','💪','We equip every learner to be marketable and employable.']
    ].map(v=>`<div class="card value-card reveal"><div class="value-card__icon">${v[1]}</div><h3>${v[0]}</h3><p style="color:var(--fg-soft)">${v[2]}</p></div>`).join('');
    const tl=$('#timeline'); if(tl) tl.innerHTML=[
      ['2010','QT Training Established'],['2012','First Graduation'],['2015','Expanded to Mopani District'],
      ['2018','Pharmacist Assistant Learnership Launched'],['2020','Free Sponsorship Programme Started'],
      ['2024','QCTO Journey Embraced'],['2025','Food Safety Initiative Launched']
    ].map(t=>`<div class="timeline__item"><div class="timeline__year">${t[0]}</div><div class="timeline__text">${t[1]}</div></div>`).join('');
    const why=$('#whyGrid'); if(why) why.innerHTML=[
      ['📜','Accredited Training','Recognised, industry-aligned qualifications.'],
      ['🎓','Industry Experts','Trainers with real-world experience.'],
      ['🛠','Practical Learning','Hands-on, job-ready skills.'],
      ['📅','Flexible Schedules','Programmes that fit your life.'],
      ['💼','Career Support','Guidance from enrolment to employment.'],
      ['💰','Affordable Fees','Sponsored and free opportunities available.']
    ].map(b=>`<div class="card benefit-card reveal"><div class="benefit-card__icon">${b[0]}</div><h3 class="benefit-card__title">${b[1]}</h3><p style="color:var(--fg-soft)">${b[2]}</p></div>`).join('');
  }

  /* ---------- INIT ---------- */
  function init(){
    window.QTMain = window.QTMain || {};
    injectChrome();
    injectFloating();
    initDark();
    initMenu();
    initLoading();
    initHeaderShadow();
    initNewsletter();
    initCountdown();
    initCourseFilter();
    initFAQ();
    initContactForm();
    initNewsModal();
    initCourseModal();
    renderDynamic();
    if(window.QTAnim) QTAnim.init();
    if(window.QTSearch) QTSearch.initSearch();
    if(window.QTGallery) QTGallery.initGallery();
    initTestiCarousel();
    window.QTMain = window.QTMain || {};
  }

  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
