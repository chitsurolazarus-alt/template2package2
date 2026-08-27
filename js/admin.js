/* =========================================================
   QT TRAINING — admin.js   (advanced dashboard, Package 2)
   ========================================================= */
(function(){
  const A = window.QT;
  const E = A.escapeHtml;
  const $ = id => document.getElementById(id);

  /* ---------------- SVG CHARTS ---------------- */
  function barChart(data){
    const w=300,h=160, max=Math.max(...data.map(d=>d.v))||1;
    const bw=w/data.length-14;
    let bars='';
    data.forEach((d,i)=>{
      const bh=(d.v/max)*(h-30);
      bars+=`<rect x="${i*(w/data.length)+7}" y="${h-20-bh}" width="${bw}" height="${bh}" rx="4" fill="#D7192F"/>`;
      bars+=`<text x="${i*(w/data.length)+7+bw/2}" y="${h-6}" font-size="10" fill="#666" text-anchor="middle">${d.l}</text>`;
      bars+=`<text x="${i*(w/data.length)+7+bw/2}" y="${h-24-bh}" font-size="10" fill="#333" text-anchor="middle" font-weight="700">${d.v}</text>`;
    });
    return `<svg viewBox="0 0 ${w} ${h}">${bars}</svg>`;
  }
  function pieChart(data){
    const total=data.reduce((s,d)=>s+d.v,0)||1; let ang=0; const cx=80,cy=80,r=70;
    let paths=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#eee"/>`;
    const colors=['#D7192F','#4A4A4A','#27AE60','#F39C12','#2980B9'];
    data.forEach((d,i)=>{
      const a2=ang+(d.v/total)*360; const large=(a2-ang)>180?1:0;
      const x1=cx+r*Math.cos(Math.PI*ang/180), y1=cy+r*Math.sin(Math.PI*ang/180);
      const x2=cx+r*Math.cos(Math.PI*a2/180), y2=cy+r*Math.sin(Math.PI*a2/180);
      paths+=`<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z" fill="${colors[i%colors.length]}"/>`;
      ang=a2;
    });
    const legend=data.map((d,i)=>`<div style="font-size:11px;margin:2px 0;"><span style="display:inline-block;width:10px;height:10px;background:${colors[i%colors.length]};margin-right:6px;border-radius:2px;"></span>${E(d.l)} (${d.v})</div>`).join('');
    return `<div style="display:flex;gap:12px;align-items:center;"><svg viewBox="0 0 160 160" style="width:140px;height:140px;">${paths}</svg><div>${legend}</div></div>`;
  }
  function lineChart(data){
    const w=300,h=160,max=Math.max(...data.map(d=>d.v))||1;
    let pts='';
    data.forEach((d,i)=>{ const x=20+i*((w-40)/(data.length-1)); const y=h-20-((d.v/max)*(h-40)); pts+=`${x},${y} `; });
    let dots='';
    data.forEach((d,i)=>{ const x=20+i*((w-40)/(data.length-1)); const y=h-20-((d.v/max)*(h-40)); dots+=`<circle cx="${x}" cy="${y}" r="3" fill="#D7192F"/>`; });
    return `<svg viewBox="0 0 ${w} ${h}"><polyline points="${pts}" fill="none" stroke="#D7192F" stroke-width="3"/>${dots}</svg>`;
  }

  /* ---------------- DASHBOARD ---------------- */
  function dashHTML(){
    const c=data().courses.length, enq=data().enquiries.length, sub=data().subscribers.length;
    const cat={}; data().courses.forEach(c=>cat[c.cat]=(cat[c.cat]||0)+1);
    const pieData=Object.keys(cat).map(k=>({l:k[0].toUpperCase()+k.slice(1),v:cat[k]}));
    const recent=data().enquiries.slice(0,5);
    return `
    <div class="admin__cards">
      <div class="metric"><div class="n">500+</div><div class="l">Students Trained</div></div>
      <div class="metric"><div class="n">${c}</div><div class="l">Total Courses</div></div>
      <div class="metric"><div class="n">${enq}</div><div class="l">Enquiries</div></div>
      <div class="metric"><div class="n">${sub}</div><div class="l">Subscribers</div></div>
    </div>
    <div class="chart-box">
      <div class="chart-card"><h4>Monthly Enquiries</h4>${barChart([{l:'Jan',v:3},{l:'Feb',v:5},{l:'Mar',v:4},{l:'Apr',v:7},{l:'May',v:6},{l:'Jun',v:9}])}</div>
      <div class="chart-card"><h4>Course Popularity</h4>${pieChart(pieData)}</div>
      <div class="chart-card"><h4>News Performance</h4>${lineChart([{l:'',v:20},{l:'',v:35},{l:'',v:30},{l:'',v:50},{l:'',v:45},{l:'',v:60}])}</div>
    </div>
    <div class="admin__panel">
      <h3>Recent Enquiries <button class="btn-sm btn-edit" onclick="QTAdmin.goto('enquiries')">View all</button></h3>
      <table class="admin__table"><thead><tr><th>Name</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead>
      <tbody>${recent.map(e=>`<tr><td>${E(e.name)}</td><td>${E(e.subject)}</td><td>${E(e.date)}</td><td>${E(e.status)}</td></tr>`).join('')||'<tr><td colspan="4" class="admin__empty">No enquiries.</td></tr>'}</tbody></table>
    </div>`;
  }

  /* ---------------- COURSES ---------------- */
  function coursesHTML(){
    return `
    <div class="admin__panel">
      <h3>Courses <button class="btn-sm btn-edit" id="cAddBtn">+ Add Course</button></h3>
      <form id="cForm" class="admin__form" style="display:none;">
        <div class="full"><label>Title</label><input id="cTitle"></div>
        <div class="full"><label>Short Description</label><input id="cShort"></div>
        <div class="full"><label>Full Description</label><textarea id="cDesc"></textarea></div>
        <div><label>Duration</label><input id="cDur"></div>
        <div><label>Location</label><input id="cLoc" value="Tzaneen"></div>
        <div><label>Accreditation</label><input id="cAcc"></div>
        <div><label>Category</label><select id="cCat"><option value="available">Available</option><option value="sponsored">Sponsored (Free)</option><option value="offer">Special Offer</option></select></div>
        <div class="full"><label>Image (svg path)</label><input id="cImg" value="images/courses/end-user-computing.svg"></div>
        <div class="full"><button class="btn-sm btn-edit" id="cSave">Save</button> <button class="btn-sm btn-del" type="button" id="cCancel">Cancel</button></div>
      </form>
      <table class="admin__table"><thead><tr><th>Image</th><th>Title</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${data().courses.map(c=>`<tr><td><img src="${c.img}" alt="" onerror="this.onerror=null;this.src='${c.fb}'"></td><td>${E(c.title)}</td><td>${E(c.statusText)}</td>
        <td><button class="btn-sm btn-edit" onclick="QTAdmin.editCourse(${c.id})">Edit</button><button class="btn-sm btn-del" onclick="QTAdmin.delCourse(${c.id})">Delete</button></td></tr>`).join('')}</tbody></table>
    </div>`;
  }

  /* ---------------- NEWS ---------------- */
  function newsHTML(){
    return `
    <div class="admin__panel">
      <h3>News & Announcements <button class="btn-sm btn-edit" id="nAddBtn">+ Add News</button></h3>
      <form id="nForm" class="admin__form" style="display:none;">
        <div class="full"><label>Title</label><input id="nTitle"></div>
        <div><label>Date</label><input id="nDate" placeholder="e.g. 04 July 2025"></div>
        <div><label>Category</label><select id="nCat"><option>Promotions</option><option>Events</option><option>Courses</option><option>Graduations</option><option>Sponsorships</option></select></div>
        <div class="full"><label>Excerpt</label><input id="nExcerpt"></div>
        <div class="full"><label>Content</label><textarea id="nContent"></textarea></div>
        <div class="full"><label>Image (svg path)</label><input id="nImg" value="images/news/news1.svg"></div>
        <div class="full"><button class="btn-sm btn-edit" id="nSave">Save</button> <button class="btn-sm btn-del" type="button" id="nCancel">Cancel</button></div>
      </form>
      <table class="admin__table"><thead><tr><th>Image</th><th>Title</th><th>Date</th><th>Category</th><th>Actions</th></tr></thead>
      <tbody>${data().news.map(n=>`<tr><td><img src="${n.img}" alt="" onerror="this.onerror=null;this.src='${n.fb}'"></td><td>${E(n.title)}</td><td>${E(n.date)}</td><td>${E(n.category)}</td>
        <td><button class="btn-sm btn-edit" onclick="QTAdmin.editNews(${n.id})">Edit</button><button class="btn-sm btn-del" onclick="QTAdmin.delNews(${n.id})">Delete</button></td></tr>`).join('')}</tbody></table>
    </div>`;
  }

  /* ---------------- TESTIMONIALS ---------------- */
  function testiHTML(){
    return `
    <div class="admin__panel">
      <h3>Testimonials <button class="btn-sm btn-edit" id="tAddBtn">+ Add Testimonial</button></h3>
      <form id="tForm" class="admin__form" style="display:none;">
        <div><label>Name</label><input id="tName"></div>
        <div><label>Course</label><input id="tCourse"></div>
        <div><label>Rating</label><select id="tRate"><option>5</option><option>4</option><option>3</option></select></div>
        <div class="full"><label>Testimonial</label><textarea id="tText"></textarea></div>
        <div class="full"><button class="btn-sm btn-edit" id="tSave">Save</button> <button class="btn-sm btn-del" type="button" id="tCancel">Cancel</button></div>
      </form>
      <table class="admin__table"><thead><tr><th>Name</th><th>Course</th><th>Rating</th><th>Actions</th></tr></thead>
      <tbody>${data().testimonials.map(t=>`<tr><td>${E(t.name)}</td><td>${E(t.course)}</td><td>${'★'.repeat(t.rating)}</td>
        <td><button class="btn-sm btn-edit" onclick="QTAdmin.delTesti(${t.id})">Delete</button></td></tr>`).join('')}</tbody></table>
    </div>`;
  }

  /* ---------------- GALLERY ---------------- */
  function galleryHTML(){
    return `
    <div class="admin__panel">
      <h3>Gallery <button class="btn-sm btn-edit" id="gAddBtn">+ Add Image</button></h3>
      <form id="gForm" class="admin__form" style="display:none;">
        <div><label>Title</label><input id="gTitle"></div>
        <div><label>Category</label><select id="gCat"><option>Graduations</option><option>Training</option><option>Workshops</option><option>Events</option></select></div>
        <div class="full"><label>Image (svg path)</label><input id="gImg" value="images/gallery/graduation1.svg"></div>
        <div class="full"><button class="btn-sm btn-edit" id="gSave">Save</button> <button class="btn-sm btn-del" type="button" id="gCancel">Cancel</button></div>
      </form>
      <table class="admin__table"><thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Actions</th></tr></thead>
      <tbody>${data().gallery.map(g=>`<tr><td><img src="${g.img}" alt="" onerror="this.onerror=null;this.src='${g.fb}'"></td><td>${E(g.title)}</td><td>${E(g.category)}</td>
        <td><button class="btn-sm btn-edit" onclick="QTAdmin.delGallery(${g.id})">Delete</button></td></tr>`).join('')}</tbody></table>
    </div>`;
  }

  /* ---------------- DOWNLOADS ---------------- */
  function downloadsHTML(){
    return `
    <div class="admin__panel">
      <h3>Downloads <button class="btn-sm btn-edit" id="dAddBtn">+ Add Resource</button></h3>
      <form id="dForm" class="admin__form" style="display:none;">
        <div><label>Title</label><input id="dTitle"></div>
        <div><label>Category</label><select id="dCat"><option>Brochures</option><option>Course Resources</option><option>Application Forms</option><option>Policies</option></select></div>
        <div><label>File name</label><input id="dFile" value="file.pdf"></div>
        <div class="full"><label>Description</label><input id="dDesc"></div>
        <div class="full"><button class="btn-sm btn-edit" id="dSave">Save</button> <button class="btn-sm btn-del" type="button" id="dCancel">Cancel</button></div>
      </form>
      <table class="admin__table"><thead><tr><th>Title</th><th>Category</th><th>File</th><th>Actions</th></tr></thead>
      <tbody>${data().downloads.map(d=>`<tr><td>${E(d.title)}</td><td>${E(d.category)}</td><td>${E(d.file)}</td>
        <td><button class="btn-sm btn-edit" onclick="QTAdmin.delDownload(${d.id})">Delete</button></td></tr>`).join('')}</tbody></table>
    </div>`;
  }

  /* ---------------- ENQUIRIES ---------------- */
  function enquiriesHTML(){
    return `
    <div class="admin__panel">
      <h3>Enquiries <button class="btn-sm btn-edit" id="expEnq">Export CSV</button></h3>
      <table class="admin__table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>${data().enquiries.map(e=>`<tr><td>${E(e.name)}</td><td>${E(e.email)}</td><td>${E(e.phone)}</td><td>${E(e.subject)}</td><td>${E(e.status)}</td><td>${E(e.date)}</td>
        <td><button class="btn-sm btn-pill" onclick="QTAdmin.replyEnq(${e.id})">Reply</button><button class="btn-sm btn-del" onclick="QTAdmin.delEnq(${e.id})">Del</button></td></tr>`).join('')||'<tr><td colspan="7" class="admin__empty">No enquiries.</td></tr>'}</tbody></table>
    </div>`;
  }

  /* ---------------- USERS ---------------- */
  function usersHTML(){
    return `
    <div class="admin__panel">
      <h3>Users <button class="btn-sm btn-edit" id="uAddBtn">+ Add User</button></h3>
      <form id="uForm" class="admin__form" style="display:none;">
        <div><label>Name</label><input id="uName"></div>
        <div><label>Email</label><input id="uEmail"></div>
        <div><label>Role</label><select id="uRole"><option>Admin</option><option>Manager</option><option>Coordinator</option><option>Admin Assistant</option></select></div>
        <div class="full"><button class="btn-sm btn-edit" id="uSave">Save</button> <button class="btn-sm btn-del" type="button" id="uCancel">Cancel</button></div>
      </form>
      <table class="admin__table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Actions</th></tr></thead>
      <tbody>${data().users.map(u=>`<tr><td>${E(u.name)}</td><td>${E(u.email)}</td><td>${E(u.role)}</td><td>${E(u.lastLogin)}</td>
        <td><button class="btn-sm btn-del" onclick="QTAdmin.delUser(${u.id})">Delete</button></td></tr>`).join('')}</tbody></table>
    </div>`;
  }

  /* ---------------- SUBSCRIBERS ---------------- */
  function subsHTML(){
    return `
    <div class="admin__panel">
      <h3>Subscribers <button class="btn-sm btn-edit" id="expSub">Export CSV</button> <button class="btn-sm btn-edit" id="sendNews">Send Newsletter</button></h3>
      <table class="admin__table"><thead><tr><th>Email</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${data().subscribers.map(s=>`<tr><td>${E(s.email)}</td><td>${E(s.date)}</td><td>${E(s.status)}</td>
        <td><button class="btn-sm btn-del" onclick="QTAdmin.delSub(${s.id})">Delete</button></td></tr>`).join('')||'<tr><td colspan="4" class="admin__empty">No subscribers.</td></tr>'}</tbody></table>
    </div>`;
  }

  /* ---------------- SETTINGS ---------------- */
  function settingsHTML(){
    const s=data().settings;
    return `
    <div class="admin__panel">
      <h3>Settings</h3>
      <form id="setForm" class="admin__form">
        <div class="full"><label>College Name</label><input id="sName" value="${E(s.name)}"></div>
        <div class="full"><label>Tagline</label><input id="sTag" value="${E(s.tagline)}"></div>
        <div><label>Phone</label><input id="sPhone" value="${E(s.phone)}"></div>
        <div><label>Email</label><input id="sEmail" value="${E(s.email)}"></div>
        <div class="full"><label>Address</label><input id="sAddr" value="${E(s.address)}"></div>
        <div><label>Primary Colour</label><input type="color" id="sPrim" value="${E(s.primary)}"></div>
        <div><label>Secondary Colour</label><input type="color" id="sSec" value="${E(s.secondary)}"></div>
        <div><label>Facebook</label><input id="sFb" value="${E(s.social.facebook)}"></div>
        <div><label>Twitter</label><input id="sTw" value="${E(s.social.twitter)}"></div>
        <div><label>LinkedIn</label><input id="sLi" value="${E(s.social.linkedin)}"></div>
        <div><label>Instagram</label><input id="sIg" value="${E(s.social.instagram)}"></div>
        <div class="full"><label>WhatsApp</label><input id="sWa" value="${E(s.social.whatsapp)}"></div>
        <div class="full"><button class="btn-sm btn-edit" type="button" id="sSave">Save Settings</button> <button class="btn-sm btn-del" type="button" id="sBackup">Backup (JSON)</button></div>
      </form>
    </div>`;
  }

  /* ---------------- helpers ---------------- */
  const data = ()=>A.state;
  function rerender(tab){
    const map={dashboard:dashHTML,courses:coursesHTML,news:newsHTML,testimonials:testiHTML,gallery:galleryHTML,downloads:downloadsHTML,enquiries:enquiriesHTML,users:usersHTML,subscribers:subsHTML,settings:settingsHTML};
    if(map[tab]) { const c=$('tab-'+tab); if(c) c.innerHTML=map[tab](); bindTab(tab); }
    A.save();
  }
  function bindTab(tab){
    const c=$('tab-'+tab); if(!c) return;
    // generic add/cancel toggles
    const toggle=(addId,formId)=>{ const b=$(addId); if(b) b.onclick=()=>{ $(formId).style.display='grid'; }; };
    const cancel=(id,formId)=>{ const b=$(id); if(b) b.onclick=()=>{ $(formId).style.display='none'; }; };
    if(tab==='courses'){ toggle('cAddBtn','cForm'); cancel('cCancel','cForm');
      const save=$('cSave'); if(save) save.onclick=()=>{
        const t=$('cTitle').value.trim(),s=$('cShort').value.trim(),d=$('cDesc').value.trim();
        if(!t||!d){alert('Title and description required');return;}
        data().courses.push({id:A.nextId(data().courses),slug:(t.toLowerCase().replace(/[^a-z0-9]+/g,'-')),title:t,short:s,desc:d,duration:$('cDur').value||'—',location:$('cLoc').value||'Tzaneen',accreditation:$('cAcc').value||'QT Training',features:[],statusText:$('cCat').value==='sponsored'?'Sponsored (Free)':($('cCat').value==='offer'?'Special Offer':'Available'),cat:$('cCat').value,img:$('cImg').value});
        rerender('courses'); }; }
    if(tab==='news'){ toggle('nAddBtn','nForm'); cancel('nCancel','nForm');
      const save=$('nSave'); if(save) save.onclick=()=>{
        const t=$('nTitle').value.trim(),ex=$('nExcerpt').value.trim(),ct=$('nContent').value.trim();
        if(!t||!ct){alert('Title and content required');return;}
        data().news.unshift({id:A.nextId(data().news),date:$('nDate').value||'—',category:$('nCat').value,title:t,excerpt:ex,content:ct,img:$('nImg').value,featured:false});
        rerender('news'); }; }
    if(tab==='testimonials'){ toggle('tAddBtn','tForm'); cancel('tCancel','tForm');
      const save=$('tSave'); if(save) save.onclick=()=>{
        const n=$('tName').value.trim(),co=$('tCourse').value.trim(),tx=$('tText').value.trim();
        if(!n||!tx){alert('Name and testimonial required');return;}
        data().testimonials.push({id:A.nextId(data().testimonials),name:n,course:co,rating:+$('tRate').value,text:tx,avatar:'images/team/team1.svg'});
        rerender('testimonials'); }; }
    if(tab==='gallery'){ toggle('gAddBtn','gForm'); cancel('gCancel','gForm');
      const save=$('gSave'); if(save) save.onclick=()=>{
        const t=$('gTitle').value.trim(),im=$('gImg').value.trim();
        if(!t||!im){alert('Title and image required');return;}
        data().gallery.push({id:A.nextId(data().gallery),title:t,category:$('gCat').value,img:im,desc:''});
        rerender('gallery'); }; }
    if(tab==='downloads'){ toggle('dAddBtn','dForm'); cancel('dCancel','dForm');
      const save=$('dSave'); if(save) save.onclick=()=>{
        const t=$('dTitle').value.trim();
        if(!t){alert('Title required');return;}
        data().downloads.push({id:A.nextId(data().downloads),title:t,category:$('dCat').value,file:$('dFile').value,desc:$('dDesc').value});
        rerender('downloads'); }; }
    if(tab==='users'){ toggle('uAddBtn','uForm'); cancel('uCancel','uForm');
      const save=$('uSave'); if(save) save.onclick=()=>{
        const n=$('uName').value.trim(),em=$('uEmail').value.trim();
        if(!n||!em){alert('Name and email required');return;}
        data().users.push({id:A.nextId(data().users),name:n,email:em,role:$('uRole').value,lastLogin:A.formatDate()});
        rerender('users'); }; }
    if(tab==='enquiries'){ const b=$('expEnq'); if(b) b.onclick=()=>exportCSV(data().enquiries,['name','email','phone','subject','message','status','date'],'enquiries.csv'); }
    if(tab==='subscribers'){ const b=$('expSub'); if(b) b.onclick=()=>exportCSV(data().subscribers,['email','date','status'],'subscribers.csv');
      const sn=$('sendNews'); if(sn) sn.onclick=()=>alert('Newsletter feature is a demo. In production this would email all active subscribers ('+data().subscribers.filter(s=>s.status==='Active').length+').'); }
    if(tab==='settings'){ const b=$('sSave'); if(b) b.onclick=()=>{
        const s=data().settings; s.name=$('sName').value; s.tagline=$('sTag').value; s.phone=$('sPhone').value; s.email=$('sEmail').value; s.address=$('sAddr').value;
        s.primary=$('sPrim').value; s.secondary=$('sSec').value; s.social.facebook=$('sFb').value; s.social.twitter=$('sTw').value; s.social.linkedin=$('sLi').value; s.social.instagram=$('sIg').value; s.social.whatsapp=$('sWa').value;
        document.documentElement.style.setProperty('--red',s.primary); document.documentElement.style.setProperty('--charcoal',s.secondary);
        A.save(); alert('Settings saved.'); };
      const bk=$('sBackup'); if(bk) bk.onclick=()=>exportJSON(); }
  }
  function exportCSV(rows,headers,fn){
    let csv=headers.join(',')+'\n';
    rows.forEach(r=>{ csv+=headers.map(h=>'"'+(r[h]||'').toString().replace(/"/g,'""')+'"').join(',')+'\n'; });
    download(new Blob([csv],{type:'text/csv'}), fn);
  }
  function exportJSON(){ download(new Blob([JSON.stringify(data(),null,2)],{type:'application/json'}),'qt-training-backup.json'); }
  function download(blob,fn){ const u=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=u; a.download=fn; a.click(); URL.revokeObjectURL(u); }

  /* ---------------- CRUD via inline onclick ---------------- */
  const API={
    goto(t){ switchTab(t); },
    editCourse(id){ const c=data().courses.find(x=>x.id===id); if(!c)return; switchTab('courses'); $('cAddBtn').click();
      $('cTitle').value=c.title;$('cShort').value=c.short;$('cDesc').value=c.desc;$('cDur').value=c.duration;$('cLoc').value=c.location;$('cAcc').value=c.accreditation;$('cCat').value=c.cat;$('cImg').value=c.img;
      const save=$('cSave'); save.onclick=()=>{ c.title=$('cTitle').value.trim();c.short=$('cShort').value.trim();c.desc=$('cDesc').value.trim();c.duration=$('cDur').value;c.location=$('cLoc').value;c.accreditation=$('cAcc').value;c.cat=$('cCat').value;c.statusText=$('cCat').value==='sponsored'?'Sponsored (Free)':($('cCat').value==='offer'?'Special Offer':'Available');c.img=$('cImg').value; rerender('courses'); }; },
    delCourse(id){ if(!confirm('Delete course?'))return; data().courses=data().courses.filter(c=>c.id!==id); rerender('courses'); },
    editNews(id){ const n=data().news.find(x=>x.id===id); if(!n)return; switchTab('news'); $('nAddBtn').click();
      $('nTitle').value=n.title;$('nDate').value=n.date;$('nCat').value=n.category;$('nExcerpt').value=n.excerpt;$('nContent').value=n.content;$('nImg').value=n.img;
      const save=$('nSave'); save.onclick=()=>{ n.title=$('nTitle').value.trim();n.date=$('nDate').value;n.category=$('nCat').value;n.excerpt=$('nExcerpt').value;n.content=$('nContent').value.trim();n.img=$('nImg').value; rerender('news'); }; },
    delNews(id){ if(!confirm('Delete news?'))return; data().news=data().news.filter(n=>n.id!==id); rerender('news'); },
    delTesti(id){ if(!confirm('Delete testimonial?'))return; data().testimonials=data().testimonials.filter(t=>t.id!==id); rerender('testimonials'); },
    delGallery(id){ if(!confirm('Delete image?'))return; data().gallery=data().gallery.filter(g=>g.id!==id); rerender('gallery'); },
    delDownload(id){ if(!confirm('Delete resource?'))return; data().downloads=data().downloads.filter(d=>d.id!==id); rerender('downloads'); },
    replyEnq(id){ const e=data().enquiries.find(x=>x.id===id); if(e){ e.status='Replied'; rerender('enquiries'); } },
    delEnq(id){ if(!confirm('Delete enquiry?'))return; data().enquiries=data().enquiries.filter(e=>e.id!==id); rerender('enquiries'); },
    delUser(id){ if(!confirm('Delete user?'))return; data().users=data().users.filter(u=>u.id!==id); rerender('users'); },
    delSub(id){ if(!confirm('Delete subscriber?'))return; data().subscribers=data().subscribers.filter(s=>s.id!==id); rerender('subscribers'); }
  };
  window.QTAdmin=API;

  /* ---------------- TAB SWITCHING ---------------- */
  function switchTab(tab){
    document.querySelectorAll('.admin__nav a').forEach(a=>a.classList.toggle('active',a.dataset.tab===tab));
    document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
    const p=$('tab-'+tab); if(p) p.classList.add('active');
  }

  /* ---------------- INIT ---------------- */
  function init(){
    if(!$('adminContent')) return;
    const tabs=['dashboard','courses','news','testimonials','gallery','downloads','enquiries','users','subscribers','settings'];
    $('adminContent').innerHTML = tabs.map(t=>`<div class="tab-pane" id="tab-${t}"></div>`).join('');
    tabs.forEach(t=>rerender(t)); // fills innerHTML (saves once per call; fine)
    document.querySelectorAll('.admin__nav a').forEach(a=> a.addEventListener('click',()=>switchTab(a.dataset.tab)));
    switchTab('dashboard');
  }

  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
