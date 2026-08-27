/* =========================================================
   QT TRAINING — data.js   (shared data store + localStorage)
   Exposes window.QT
   ========================================================= */
(function(){
  const STORE = 'qt_training_p2_v1';

  const DEFAULTS = {
    settings:{
      name:"QT Training (Pty) Ltd", tagline:"Learner Management & Skills Development",
      phone:"015 307 2006", email:"admin@qttraining.co.za", address:"Tzaneen, Limpopo, South Africa",
      primary:"#D7192F", secondary:"#4A4A4A",
      social:{facebook:"#", twitter:"#", linkedin:"#", instagram:"#", whatsapp:"+27153072006"},
      seo:{title:"QT Training (Pty) Ltd — Skills Development College", description:"QT Training is a skills development and training college in Tzaneen, Limpopo offering accredited courses.", keywords:"training, skills, learnership, Tzaneen, Limpopo, QCTO"}
    },
    courses:[
      {id:1, slug:"end-user-computing", title:"National Certificate: End User Computing", cat:"available", statusText:"Available",
        short:"Entry-level qualification for essential workplace computing skills.",
        desc:"Entry-level qualification designed to meet the needs of learners who require end user computing as an essential skill in the workplace or tertiary institution. Covers MS Office, email, internet and digital literacy.",
        duration:"6 – 12 Months", location:"Tzaneen", accreditation:"QCTO / MICT SETA",
        features:["MS Office proficiency","Email & internet skills","Digital literacy","Portfolio of evidence"], img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=70",fb:"images/courses/end-user-computing.svg"},
      {id:2, slug:"new-venture", title:"New Venture Creation", cat:"sponsored", statusText:"Sponsored (Free)",
        short:"Entrepreneurship training for black females sponsored by QT Training.",
        desc:"Entrepreneurship training for black females sponsored by QT Training. Learn to start, manage and grow a successful small business with practical mentoring.",
        duration:"8 Months", location:"Tzaneen", accreditation:"SETA Accredited",
        features:["Business planning","Financial management","Marketing basics","Mentorship"], img:"https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=800&q=70",fb:"images/courses/new-venture.svg"},
      {id:3, slug:"management", title:"General Management", cat:"sponsored", statusText:"Sponsored (Free)",
        short:"Comprehensive management skills for aspiring leaders.",
        desc:"Comprehensive management skills for aspiring leaders. Develop planning, leading, organising and control competencies for the modern workplace.",
        duration:"12 Months", location:"Tzaneen", accreditation:"SETA Accredited",
        features:["Leadership","Project management","People management","Strategy"], img:"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=70",fb:"images/courses/management.svg"},
      {id:4, slug:"retail", title:"Retail Supervision", cat:"sponsored", statusText:"Sponsored (Free)",
        short:"Supervisory skills for retail management.",
        desc:"Supervisory skills for retail management. Build the competence to lead a retail team, manage stock and deliver excellent customer service.",
        duration:"6 Months", location:"Tzaneen", accreditation:"SETA Accredited",
        features:["Team leadership","Stock control","Customer service","Operations"], img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=70",fb:"images/courses/retail.svg"},
      {id:5, slug:"pharmacy", title:"Pharmacist Assistant Learnership", cat:"available", statusText:"Apply Now",
        short:"Accredited learnership programme for pharmacy assistants.",
        desc:"Accredited learnership programme for pharmacy assistants. Combine workplace experience with classroom learning at a registered pharmacy.",
        duration:"12 Months", location:"Tzaneen", accreditation:"SAPC / SETA",
        features:["Dispensing basics","Pharmacy law","Anatomy & physiology","Workplace placement"], img:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=70",fb:"images/courses/pharmacy.svg"},
      {id:6, slug:"plant-production", title:"Plant Production", cat:"available", statusText:"Available",
        short:"Agricultural skills development for plant production.",
        desc:"Agricultural skills development for plant production. Practical, hands-on training in crop production, soil science and sustainable farming.",
        duration:"6 – 12 Months", location:"Tzaneen", accreditation:"AgriSETA",
        features:["Crop production","Soil science","Irrigation","Harvesting"], img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=70",fb:"images/courses/plant-production.svg"},
      {id:7, slug:"assessor", title:"Assessor & Moderator Skills", cat:"offer", statusText:"Special Offer",
        short:"Professional assessment and moderation training.",
        desc:"Professional assessment and moderation training. Become a registered assessor and moderator to evaluate NQF-aligned qualifications.",
        duration:"3 Months", location:"Tzaneen", accreditation:"ETDP SETA",
        features:["Assessment design","Moderation","POE evaluation","ETQA compliance"], img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70",fb:"images/courses/assessor.svg"},
      {id:8, slug:"computer-skills", title:"Computer Skills", cat:"offer", statusText:"Special Offer",
        short:"Basic to advanced computer literacy training.",
        desc:"Basic to advanced computer literacy training. From first-time computer use to advanced spreadsheets, presentations and digital communication.",
        duration:"Flexible", location:"Tzaneen", accreditation:"QT Training Certificate",
        features:["Typing & Windows","Word & Excel","PowerPoint","Email & internet"], img:"https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=800&q=70",fb:"images/courses/computer-skills.svg"}
    ],
    news:[
      {id:1, date:"04 July 2025", category:"Promotions", title:"FREE Food Safety & Hygiene Certificate – Mopani District",
        excerpt:"Equipping spaza shop owners with proper food safety and hygiene knowledge. Register by 15 July 2025!",
        content:"QT Training is offering a FREE Food Safety & Hygiene Certificate for the Mopani District. The one-day in-person course covers safe food handling, hygiene practices and compliance. Locations include Tzaneen, Giyani, Phalaborwa, Oaks and Hoedspruit. Closing date: 15 July 2025.",
        img:"https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=70",fb:"images/news/news1.svg", featured:true},
      {id:2, date:"16 December 2021", category:"Events", title:"Successful Marketing Drive in Tzaneen",
        excerpt:"QT had a successful marketing drive with their marketing team. Special offers on Computer Skills, Assessor and Moderator skills.",
        content:"Our marketing team hit the streets of Tzaneen with special promotional offers on Computer Skills, Assessor and Moderator training. Thank you to everyone who visited our stand!",
        img:"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=70",fb:"images/news/news2.svg", featured:false},
      {id:3, date:"14 August 2021", category:"Courses", title:"End User Computing – Enrol Now",
        excerpt:"QT Training invites you to forward your CV and certified documents to admin@qttraining.co.za. National Certificate: End User Computing now available.",
        content:"Enrolments are open for the National Certificate: End User Computing. Forward your CV and certified documents to admin@qttraining.co.za to secure your place.",
        img:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=70",fb:"images/news/news3.svg", featured:false},
      {id:4, date:"18 August 2020", category:"Sponsorships", title:"Free Sponsorship for Black Females",
        excerpt:"Sponsored New Venture Creation, General Management and Retail Supervision Qualifications. Contact Karabo urgently on 0791061603.",
        content:"QT Training is sponsoring black females to study New Venture Creation, General Management and Retail Supervision. Contact Karabo on 0791061603 for urgent applications.",
        img:"https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=70",fb:"images/news/news4.svg", featured:false},
      {id:5, date:"22 October 2018", category:"Courses", title:"Pharmacist Assistant Learnership",
        excerpt:"Apply for the Learnership for Pharmacist Assistant NOW!",
        content:"Applications are open for the Pharmacist Assistant Learnership. Gain a registered qualification through a blend of workplace and classroom learning.",
        img:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=70",fb:"images/news/news5.svg", featured:false},
      {id:6, date:"31 July 2018", category:"Graduations", title:"Graduation of Inkwazi Learners",
        excerpt:"Graduation of the Inkwazi learners for Plant Production!",
        content:"We proudly celebrated the graduation of the Inkwazi learners who completed Plant Production. Congratulations to all our graduates!",
        img:"https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=70",fb:"images/news/news6.svg", featured:false}
    ],
    testimonials:[
      {id:1, name:"Thandi M.", course:"End User Computing Graduate", rating:5,
        text:"QT Training changed my life! The End User Computing course gave me the skills I needed to get a job.", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=70",fb:"images/team/team1.svg"},
      {id:2, name:"Peter K.", course:"Pharmacist Assistant Graduate", rating:5,
        text:"The Pharmacist Assistant Learnership was incredible. I'm now working at a pharmacy in Tzaneen.", avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=70",fb:"images/team/team2.svg"},
      {id:3, name:"Sarah N.", course:"New Venture Creation Graduate", rating:5,
        text:"I never thought I could be a business owner. The New Venture Creation course made it possible.", avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=70",fb:"images/team/team3.svg"}
    ],
    gallery:[
      {id:1, title:"Graduation Ceremony 2024", category:"Graduations", img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=70",fb:"images/gallery/graduation1.svg", desc:"Our proud graduates celebrate their achievements."},
      {id:2, title:"Class of 2024", category:"Graduations", img:"https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=70",fb:"images/gallery/graduation2.svg", desc:"Smiling faces at the annual graduation."},
      {id:3, title:"Hands-on Training", category:"Training", img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=70",fb:"images/gallery/training1.svg", desc:"Learners engaged in practical sessions."},
      {id:4, title:"Practical Session", category:"Training", img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=70",fb:"images/gallery/training2.svg", desc:"Real-world skills in the classroom."},
      {id:5, title:"Industry Workshop", category:"Workshops", img:"https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=70",fb:"images/gallery/workshop1.svg", desc:"Experts share insights with learners."},
      {id:6, title:"Skills Seminar", category:"Events", img:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=70",fb:"images/gallery/workshop2.svg", desc:"Interactive seminar for career growth."}
    ],
    downloads:[
      {id:1, title:"Food Safety Certificate Brochure", category:"Brochures", file:"food-safety-brochure.pdf", desc:"Full details of the free Food Safety & Hygiene Certificate."},
      {id:2, title:"Course Prospectus 2025", category:"Course Resources", file:"prospectus-2025.pdf", desc:"All courses, durations and accreditation bodies."},
      {id:3, title:"Application Form", category:"Application Forms", file:"application-form.pdf", desc:"Apply for any QT Training programme."},
      {id:4, title:"Learner Handbook", category:"Policies", file:"learner-handbook.pdf", desc:"Policies, code of conduct and learner rights."},
      {id:5, title:"Sponsorship Application Form", category:"Application Forms", file:"sponsorship-form.pdf", desc:"Apply for sponsored (free) programmes."},
      {id:6, title:"FAQ Document", category:"Policies", file:"faq.pdf", desc:"Answers to common questions."}
    ],
    enquiries:[
      {id:1, name:"Thabo Mokoena", email:"thabo.m@email.com", phone:"082 123 4567", subject:"Food Safety Certificate", message:"I want to register for the Food Safety course in Tzaneen", status:"New", date:"2025-07-03"},
      {id:2, name:"Lerato Nkosi", email:"lerato.n@email.com", phone:"073 987 6543", subject:"Pharmacist Assistant", message:"Please send me details about the Pharmacist Assistant learnership", status:"New", date:"2025-07-02"},
      {id:3, name:"Sipho Zulu", email:"sipho.z@email.com", phone:"071 555 8888", subject:"End User Computing", message:"I'm interested in the End User Computing course", status:"New", date:"2025-07-01"},
      {id:4, name:"Nomsa Dlamini", email:"nomsa.d@email.com", phone:"079 444 2222", subject:"General Enquiry", message:"Is the Food Safety course still available?", status:"New", date:"2025-06-30"}
    ],
    subscribers:[
      {id:1, email:"john.doe@email.com", date:"2025-06-10", status:"Active"},
      {id:2, email:"jane.smith@email.com", date:"2025-06-12", status:"Active"},
      {id:3, email:"mike.t@email.com", date:"2025-06-15", status:"Active"},
      {id:4, email:"anna.k@email.com", date:"2025-06-18", status:"Active"}
    ],
    users:[
      {id:1, name:"Boitumelo Moloi", email:"boitumelo@qttraining.co.za", role:"Admin", lastLogin:"2025-07-03"},
      {id:2, name:"Matsatsi Shilote", email:"matsatsi@qttraining.co.za", role:"Manager", lastLogin:"2025-07-02"},
      {id:3, name:"Lethabo Ramabulana", email:"lethabo@qttraining.co.za", role:"Coordinator", lastLogin:"2025-07-01"},
      {id:4, name:"Lerato Nkwana", email:"lerato@qttraining.co.za", role:"Admin Assistant", lastLogin:"2025-06-28"},
      {id:5, name:"Maria Mashaba", email:"maria@qttraining.co.za", role:"Admin Assistant", lastLogin:"2025-06-25"}
    ]
  };

  function load(){
    try{ const r=localStorage.getItem(STORE); if(r) return JSON.parse(r); }catch(e){}
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
  function save(d){ try{ localStorage.setItem(STORE, JSON.stringify(d)); }catch(e){ console.warn('save failed',e); } }

  window.QT = {
    state: load(),
    save(){ save(this.state); },
    defaults: DEFAULTS,
    escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); },
    nextId(arr){ return arr.length ? Math.max.apply(null, arr.map(x=>x.id))+1 : 1; },
    formatDate(d){ try{ return new Date(d).toISOString().slice(0,10); }catch(e){ return new Date().toISOString().slice(0,10); } }
  };
})();
