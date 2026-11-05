const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.classList.add('ready');count();
// ---- founder (editable in data.js)
(function(){const F=window.BX_FOUNDER;if(!F)return;document.querySelectorAll('[data-f]').forEach(e=>{if(F[e.dataset.f])e.textContent=F[e.dataset.f]});$('#fc').innerHTML=F.stats.map(s=>`<div class="fcard"><b>${s.v}</b><span>${s.l}</span></div>`).join('')+`<div class="fcard"><b>Malaysia</b><span>Your study destination</span></div>`})();
// ---- stats
function count(){document.querySelectorAll('[data-n]').forEach(e=>{const n=+e.dataset.n;if(RM){e.textContent=n;return}let i=0;const t=setInterval(()=>{e.textContent=++i;if(i>=n)clearInterval(t)},60)})}
// ---- nav
$('#burger').onclick=e=>{const o=$('#menu').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
$('#menu').onclick=()=>$('#menu').classList.remove('open');
// ---- University Finder engine. Data comes from data.js (sample, unverified).
const LV=['Foundation','Diploma','Advanced Diploma','Bachelor’s Degree','Postgraduate Diploma','Master’s Degree','PhD / Doctoral Degree'];
const SUB=['Computer Science','Information Technology (IT)','Software Engineering','Cyber Security','Data Science & AI','Business Administration','Business Management','Accounting & Finance','Economics','Engineering','Civil Engineering','Mechanical Engineering','Electrical & Electronic Engineering','Medicine','Nursing','Pharmacy','Public Health','Biotechnology','Psychology','Education','Early Childhood Education','Law','Hospitality & Tourism Management','Hotel Management','Mass Communication','Media & Design','Graphic Design','Architecture','Fashion Design','Culinary Arts','Social Sciences','Political Science','Other'];
const GRP=[[0,1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16,17],[18,19,20],[22,23,29],[24,25,26,27,28],[21,30,31,8]];
const grpOf=s=>{const i=SUB.indexOf(s);return GRP.filter(g=>g.includes(i)).flat().map(j=>SUB[j])};
const BANDS=[['Under 3 Lakh BDT',0,3],['3–5 Lakh BDT',3,5],['5–7 Lakh BDT',5,7],['7–9 Lakh BDT',7,9],['9–12 Lakh BDT',9,12],['12–15 Lakh BDT',12,15],['15–20 Lakh BDT',15,20],['20–25 Lakh BDT',20,25],['Above 25 Lakh BDT',25,1e9],['Flexible Budget',0,1e9]];
const TYPES=['Any University','Public University','Private University','Top-Ranked Universities','Affordable Universities','Universities with Scholarships'];
const LOCS=['Kuala Lumpur','Selangor','Cyberjaya','Putrajaya','Johor','Penang','Melaka','Perak','Negeri Sembilan','Kedah','Sabah','Sarawak'];
const SCH=['Any Available Option','Full Scholarship','50% Scholarship or Above','Partial Scholarship','Universities with Financial Aid','No Scholarship Required'];
const ENG=['Flexible','IELTS Available','TOEFL Available','PTE Available','MOI Available','Without English Test (if university permits)','Need English Preparation'];
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const QUAL={d:['SSC / O-Level','HSC / A-Level','Other Equivalent Qualification'],a:['HSC / A-Level','Diploma','Other Equivalent Qualification'],b:['HSC / A-Level','Diploma','Foundation','Other Equivalent Qualification'],m:['Bachelor’s Degree','Honours Degree','Other Equivalent Qualification'],p:['Master’s Degree','Other Equivalent Qualification']};
const qFor=l=>({'Foundation':'d','Diploma':'d','Advanced Diploma':'a','Bachelor’s Degree':'b','Postgraduate Diploma':'m','Master’s Degree':'m','PhD / Doctoral Degree':'p'}[l]);
const TBC='To be confirmed';
const X=window.BX_DATA,U=X.universities;
let DB;const base=X.courses.map((r,i)=>({id:'c'+i,u:r[0],lv:r[1],sub:r[2],name:r[3],f:r[4],p:r[5],y:r[6],int:X.defaultIntakes,sch:null,eng:null,ent:null,acc:null,rank:null,ver:null}));
let extra=[];try{extra=JSON.parse(localStorage.getItem('bx_extra'))||[]}catch(e){}
const all=()=>base.concat(extra);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rm=n=>'RM '+Math.round(n).toLocaleString('en-US');
// BDT is the display currency; fees are stored in RM and converted at a live rate (estimate)
let RATE=(window.BX_CONFIG&&BX_CONFIG.mytToBdt)||31.80,last=null;
const lk=n=>n*RATE/1e5,fmt=x=>x>=10?String(Math.round(x)):x.toFixed(1).replace('.0',''),EDGES=[4,5,6,8,10,12,15];
function bdt(m){const x=lk(m);if(x<4)return 'BDT '+fmt(x)+' lakh';let i=EDGES.length-1;while(EDGES[i]>x)i--;return i===EDGES.length-1?'BDT 15 lakh+':`BDT ${EDGES[i]}–${EDGES[i+1]} lakh`}
const per=r=>r.p==='Program'?'for the entire program':'per '+r.p.toLowerCase();
const yr=r=>r.p==='Semester'?r.f*2:r.p==='Program'?r.f/r.y:r.f;
// ---- form setup
const opt=(a,ph)=>(ph?`<option value="">${ph}</option>`:'')+a.map(x=>`<option>${x}</option>`).join('');
$('#fl').innerHTML=opt(LV,'Select study level');$('#fl').value='Bachelor’s Degree';
$('#sl').innerHTML=SUB.map(x=>`<option value="${x}">`).join('');
$('#fb').innerHTML=BANDS.map((b,i)=>`<option value="${i}">${b[0]}</option>`).join('');$('#fb').value=9;
$('#ft').innerHTML=TYPES.map(x=>`<option>${x}</option>`).join('')+'<optgroup label="Specific university">'+Object.values(U).map(x=>`<option>${x.n}</option>`).join('')+'</optgroup>';$('#fh').innerHTML=opt(SCH);$('#fe').innerHTML=opt(ENG);
$('#fi').innerHTML=opt(MON,'')+'<option>Next Available Intake</option><option selected>Flexible Intake</option>';
$('#fy').innerHTML='<option value="">Graduation year</option>'+Array.from({length:12},(_,i)=>`<option>${2026-i}</option>`).join('');
$('#lc').innerHTML=['Any Location in Malaysia',...LOCS].map((l,i)=>`<label class="chip"><input type="checkbox" value="${l}" ${i?'':'checked'}><span>${l}</span></label>`).join('');
$('#lc').onchange=e=>{const b=[...document.querySelectorAll('#lc input')],any=b[0];if(e.target===any&&any.checked)b.slice(1).forEach(x=>x.checked=false);else if(e.target!==any&&e.target.checked)any.checked=false;if(!b.some(x=>x.checked))any.checked=true};
function qual(){const k=qFor($('#fl').value),w=$('#qw');if(!k){w.hidden=true;return}w.hidden=false;$('#fq').innerHTML=opt(QUAL[k]);
$('#fp').placeholder=k==='p'||k==='m'?'e.g. CGPA 3.2 / 4.0':'e.g. GPA 4.50 / 5.00'}
$('#fl').onchange=qual;qual();
const sel=()=>({lv:$('#fl').value,sub:$('#fs').value.trim(),bud:+$('#fb').value,typ:$('#ft').value,loc:[...document.querySelectorAll('#lc input:checked')].map(x=>x.value),sch:$('#fh').value,eng:$('#fe').value,int:$('#fi').value,q:$('#fq').value,gpa:$('#fp').value.trim(),bg:$('#fg').value.trim(),gy:$('#fy').value});
// ---- matching engine: each criterion is a strict pass/fail; reasons explain failures
const HASRANK=()=>all().some(r=>r.rank);
function check(r,s){const u=U[r.u],x=lk(yr(r)),[,lo,hi]=BANDS[s.bud],f={};
f.lv=!s.lv||r.lv===s.lv;
f.sub=!s.sub||s.sub==='Other'||(SUB.includes(s.sub)?r.sub===s.sub:(r.name+' '+r.sub+' '+u.n).toLowerCase().includes(s.sub.toLowerCase()));
f.bud=x>=lo&&x<hi;
f.typ=Object.values(U).some(x=>x.n===s.typ)?u.n===s.typ:s.typ==='Public University'?u.type==='Public':s.typ==='Private University'?u.type==='Private':s.typ==='Top-Ranked Universities'?(!HASRANK()||!!r.rank):s.typ==='Affordable Universities'?x<6:s.typ==='Universities with Scholarships'?r.sch!=null:true;
f.loc=!s.loc.length||s.loc.includes('Any Location in Malaysia')||s.loc.includes(u.loc);
f.sch=['','Any Available Option','No Scholarship Required'].includes(s.sch)||(r.sch!=null);
f.int=['','Flexible Intake'].includes(s.int)?true:s.int==='Next Available Intake'?r.int.length>0:r.int.includes(s.int);
return f}
function why(r,s,f){const u=U[r.u],x=lk(yr(r)),[,lo,hi]=BANDS[s.bud],o=[];
if(!f.bud)o.push(x<lo?`Tuition is about BDT ${fmt(lo-x)} lakh a year lower than your budget range.`:`Tuition is about BDT ${fmt(x-hi)} lakh a year above your budget range.`);
if(!f.loc)o.push(`Located in ${u.loc}, not in your selected area.`);
if(!f.typ)o.push(`Different university type or criterion (${u.type} university).`);
if(!f.sch)o.push('Scholarship details are not yet verified for this course.');
if(!f.int)o.push('Offered intakes: '+r.int.join(', ')+' (sample).');
if(!f.sub)o.push('Related subject area.');if(!f.lv)o.push(`Offered at ${r.lv} level.`);return o}
const STRICT=['lv','sub','bud','typ','loc','sch','int'];
function run(){const s=sel(),ex=[],alts=[],notes=[];
if(s.typ==='Top-Ranked Universities'&&!HASRANK())notes.push('Ranking data has not been verified yet, so the Top-Ranked filter was not applied.');
if(['Full Scholarship','50% Scholarship or Above','Partial Scholarship','Universities with Financial Aid'].includes(s.sch))notes.push('Scholarship details are not yet verified in our database, so no course can be confirmed for this scholarship preference yet.');
const rows=all().map(r=>({r,f:check(r,s)}));
rows.forEach(o=>{o.fail=STRICT.filter(k=>!o.f[k]);if(!o.fail.length)ex.push(o)});
if(!ex.length){const core=rows.filter(o=>o.f.lv&&o.f.sub),rel=rows.filter(o=>o.f.lv&&!o.f.sub&&grpOf(s.sub).includes(o.r.sub)),any=rows.filter(o=>o.f.sub&&!o.f.lv);
let pool=core.length?core:rel.length?rel:any;const dist=o=>Math.abs(lk(yr(o.r))-(BANDS[s.bud][1]+Math.min(BANDS[s.bud][2],BANDS[s.bud][1]+4))/2);
pool.sort((a,b)=>a.fail.length-b.fail.length||dist(a)-dist(b)).slice(0,6).forEach(o=>alts.push({...o,reasons:why(o.r,s,o.f)}))}
STATE={s,ex,alts,notes};draw();const el=$('#res');el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}
let STATE=null,SAVED=[],CMP=[];try{SAVED=JSON.parse(localStorage.getItem('bx_saved'))||[]}catch(e){}
const persist=()=>{try{localStorage.setItem('bx_saved',JSON.stringify(SAVED))}catch(e){}};
function waLink(txt){return'https://wa.me/601135275727?text='+encodeURIComponent(txt)}
function card(o,alt){const r=o.r||o,u=U[r.u],s=STATE.s,ini=u.n.replace(/[^A-Za-z ]/g,'').split(' ').filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join('');
const sv=SAVED.includes(r.id),cm=CMP.includes(r.id),me=`Hello Bidesh Express, I am interested in ${r.name} (${r.lv}) at ${u.n}.`+(s.gpa?` My result: ${s.gpa}.`:'')+(s.bg?` Background: ${s.bg}.`:'')+(s.gy?` Graduation year: ${s.gy}.`:'');
return `<article class="card rc"><div class="rt"><div class="lg" title="Placeholder: official logo to be uploaded">${ini}</div><div><h3>${esc(u.n)}</h3><p>${esc(u.loc)} · ${u.type}</p></div></div>
<p><b>${esc(r.name)}</b><br><span class="pill">${r.lv}</span><span class="pill">${esc(r.sub)}</span></p>
<p class="fee">${bdt(r.f)} <small>tuition ${per(r)}</small></p>
<p>Estimate ≈ BDT ${fmt(lk(r.f))} lakh · ${rm(r.f)} (sample, original) · about BDT ${fmt(lk(yr(r)))} lakh a year · ${r.y} years</p>
${alt?`<p class="why"><b>Why this option:</b> ${o.reasons.length?o.reasons.map(esc).join(' '):'Closest available match.'}</p>`:`<p class="why ok">Matches your level, course, budget and preferences.</p>`}
<details><summary>View university details</summary><dl>
<dt>Entry requirements</dt><dd>${r.ent||TBC+' with the university'}</dd>
<dt>IELTS / TOEFL / MOI</dt><dd>${r.eng||TBC}</dd>
<dt>Scholarships</dt><dd>${r.sch||TBC}</dd>
<dt>Intakes (sample)</dt><dd>${r.int.join(', ')}</dd>
<dt>Accommodation</dt><dd>${r.acc||TBC}. Accommodation and living costs are not included in tuition.</dd>
<dt>Ranking</dt><dd>${r.rank||'Not verified yet'}</dd>
<dt>Official website</dt><dd><a href="${u.web}" target="_blank" rel="noopener">${u.web.replace('https://','')}</a></dd>
<dt>Application</dt><dd>Admission is decided by the university. We guide your application; we cannot guarantee an offer.</dd>
<dt>Last verified</dt><dd>${r.ver||'Not verified (sample data)'}</dd></dl></details>
<div class="acts"><label class="cmp"><input type="checkbox" data-c="${r.id}" ${cm?'checked':''} ${!cm&&CMP.length>=3?'disabled':''}> Compare</label>
<button class="btn out sm" data-s="${r.id}">${sv?'★ Saved':'☆ Save'}</button>
<a class="btn out sm" target="_blank" rel="noopener" href="${waLink(me+' Please contact me.')}">Contact us</a>
<a class="btn pri sm" target="_blank" rel="noopener" href="${waLink(me+' I would like to apply. Please guide me.')}">Apply Now</a></div></article>`}
function draw(){if(!STATE)return;const q=$('#rq').value.trim().toLowerCase(),so=$('#rsort').value,sv=$('#rsaved').dataset.on==='1';
const flt=l=>l.filter(o=>(!q||(o.r.name+' '+U[o.r.u].n).toLowerCase().includes(q))&&(!sv||SAVED.includes(o.r.id)));
const srt=l=>l.slice().sort((a,b)=>so==='fee'?yr(a.r)-yr(b.r):so==='rank'&&HASRANK()?(a.r.rank||999)-(b.r.rank||999):(a.fail||[]).length-(b.fail||[]).length||yr(a.r)-yr(b.r));
let ex=srt(flt(STATE.ex)),al=srt(flt(STATE.alts)),h='';
if(so==='rank'&&!HASRANK())STATE.notes.indexOf('rk')<0&&(h+='<p class="sample">Ranking data is not verified yet, so results are sorted by best match.</p>');
h+=STATE.notes.map(n=>`<p class="sample">${n}</p>`).join('');
h+=`<p class="fnote2">Budget compares annual <b>tuition only</b>. Accommodation, living costs, insurance, visa and other fees are separate and not included.</p>`;
if(ex.length)h+=`<h3 class="rh">${ex.length} matching ${ex.length>1?'courses':'course'}</h3><div class="grid">${ex.map(o=>card(o,false)).join('')}</div>`;
else{h+=`<div class="card"><h3>No exact match</h3><p>No course in our current records matches every choice. We never show fake matches, so here are the closest real options and why.${al.length?'':' <a target="_blank" rel="noopener" href="'+waLink('Hello Bidesh Express, I could not find a match for '+(STATE.s.sub||'my course')+' ('+STATE.s.lv+'). Can you help?')+'">Ask us to search for you</a>.'}</p></div>`;
if(al.length)h+=`<h3 class="rh">Closest alternatives</h3><div class="grid">${al.map(o=>card(o,true)).join('')}</div>`}
$('#res').innerHTML=h;$('#rtool').hidden=false;trayDraw()}
$('#mf').onsubmit=e=>{e.preventDefault();last=()=>{if(STATE)run()};run()};
['rq','rsort'].forEach(i=>$('#'+i).oninput=draw);
$('#rsaved').onclick=e=>{const b=e.currentTarget;b.dataset.on=b.dataset.on==='1'?'0':'1';b.textContent=(b.dataset.on==='1'?'Showing saved':'Saved')+` (${SAVED.length})`;b.classList.toggle('pri',b.dataset.on==='1');draw()};
$('#res').onclick=e=>{const t=e.target,s=t.dataset.s;if(s){SAVED=SAVED.includes(s)?SAVED.filter(x=>x!==s):SAVED.concat(s);persist();$('#rsaved').textContent=($('#rsaved').dataset.on==='1'?'Showing saved':'Saved')+` (${SAVED.length})`;draw()}};
$('#res').onchange=e=>{const c=e.target.dataset.c;if(c){CMP=e.target.checked?CMP.concat(c).slice(0,3):CMP.filter(x=>x!==c);draw()}};
// ---- compare tray + side-by-side dialog
function trayDraw(){const t=$('#tray');t.hidden=!CMP.length;$('#tn').textContent=CMP.length+' of 3 selected'}
$('#tv').onclick=()=>{const rs=CMP.map(id=>all().find(r=>r.id===id)).filter(Boolean),rowsd=[['University',r=>U[r.u].n],['Location',r=>U[r.u].loc],['Course',r=>r.name],['Level',r=>r.lv],['Tuition (BDT est.)',r=>bdt(r.f)+' '+per(r)],['Tuition (RM, sample)',r=>rm(r.f)+' '+per(r)],['Duration',r=>r.y+' years'],['Intakes (sample)',r=>r.int.join(', ')],['IELTS / TOEFL / MOI',r=>r.eng||TBC],['Entry requirements',r=>r.ent||TBC],['Scholarships',r=>r.sch||TBC],['Accommodation',r=>r.acc||TBC],['Website',r=>`<a href="${U[r.u].web}" target="_blank" rel="noopener">${U[r.u].web.replace('https://','')}</a>`]];
$('#cmpbody').innerHTML=`<table>${rowsd.map(([k,f])=>`<tr><th scope="row">${k}</th>${rs.map(r=>`<td>${k==='Website'?f(r):esc(f(r))}</td>`).join('')}</tr>`).join('')}</table><p class="fnote2">Sample data, not verified. BDT values are estimates.</p>`;$('#cmpd').showModal()};
$('#tc').onclick=()=>{CMP=[];draw()};$('#cmpx').onclick=()=>$('#cmpd').close();
// ---- admin demo (browser only): add or remove courses. Real admin = database.
$('#au').innerHTML=Object.keys(U).map(k=>`<option value="${k}">${U[k].n}</option>`).join('');$('#al2').innerHTML=opt(LV);$('#as').innerHTML=opt(SUB.slice(0,-1));
function adminList(){$('#al').innerHTML=extra.length?extra.map(r=>`<div class="ar"><span>${esc(U[r.u].n)} · ${esc(r.name)} · ${rm(r.f)}/${r.p.toLowerCase()}</span><button class="btn out" style="padding:4px 12px" data-d="${r.id}">Delete</button></div>`).join(''):'<p class="fnote2">No custom courses added. Built-in sample records live in data.js.</p>'}
$('#al').onclick=e=>{const d=e.target.dataset.d;if(d){extra=extra.filter(r=>r.id!==d);try{localStorage.setItem('bx_extra',JSON.stringify(extra))}catch(x){}adminList()}};
$('#af').onsubmit=e=>{e.preventDefault();extra.push({id:'x'+Date.now(),u:$('#au').value,lv:$('#al2').value,sub:$('#as').value,name:$('#ac').value.trim(),f:+$('#am').value,p:$('#ap').value,y:+$('#ad').value,int:($('#ai').value||'').split(',').map(x=>x.trim()).filter(Boolean),sch:null,eng:null,ent:null,acc:null,rank:null,ver:null});if(!extra[extra.length-1].int.length)extra[extra.length-1].int=X.defaultIntakes;try{localStorage.setItem('bx_extra',JSON.stringify(extra))}catch(x){}adminList();e.target.reset()};
adminList();
$('#lc').addEventListener('change',()=>{$('#ls').textContent=[...document.querySelectorAll('#lc input:checked')].map(x=>x.value).join(', ')});
// ---- courses, services, roadmap
$('#cc').innerHTML=['Information Technology','Computer Science','Software Engineering','Business Administration','Accounting and Finance','Engineering','Hospitality and Tourism','Health Sciences','Nursing','Psychology','Child Development','Early Childhood Education','Law','Political Science','Media and Communication','Design and Creative Arts'].map(x=>`<span class="pill" style="font-size:14px;padding:6px 14px">${x}</span>`).join('');
$('#sv').innerHTML=[['Free initial consultation','Talk through goals, budget and results.'],['University & course selection','Shortlist options that fit you.'],['Admission application','We help prepare and submit it.'],['Document preparation','Checklists and review before you apply.'],['Offer letter & tuition guidance','Understand what you are paying for.'],['EMGS & student visa guidance','Step-by-step support through approvals.'],['Medical screening guidance','What to expect and where to go.'],['Pre-departure & airport pickup','Travel ready, met on arrival.'],['Accommodation & post-arrival','Settle in with local support.']].map(s=>`<div class="card"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
const steps=[['Consultation','We learn your goals and budget.'],['Academic assessment','We review your results.'],['University selection','Pick from matched options.'],['Course selection','Confirm your program.'],['Document collection','Gather and check certificates.'],['Application submission','Apply to your university.'],['University evaluation','The university reviews your file.'],['Offer letter','Receive and review your offer.'],['Tuition fee payment','Pay the required fees.'],['EMGS application','Submit through the official system.'],['Visa approval','Wait for the decision.'],['Travel preparation','Book flights and pack.'],['Arrival','We support you on landing.'],['University registration','Complete enrolment.'],['Student pass completion','Finish pass formalities.']];
$('#rd').innerHTML=steps.map((s,i)=>`<li tabindex="0" class="${i?'':'on'}"><b>${i+1}. ${s[0]}</b><div>${s[1]}</div></li>`).join('');
$('#rd').onclick=e=>{const l=e.target.closest('li');if(l){document.querySelectorAll('#rd li').forEach(x=>x.classList.remove('on'));l.classList.add('on')}};
// ---- consultation: builds the WhatsApp message and opens a chat with Bidesh Express
const WA_NUMBER='601135275727';
$('#cf').onsubmit=e=>{e.preventDefault();const f=e.target,v=n=>(f.elements[n].value||'').trim(),err=$('#cerr');
const name=v('n'),num=v('w'),uni=v('u'),msg=v('m'),digits=num.replace(/\D/g,'');
[...f.querySelectorAll('input')].forEach(i=>i.removeAttribute('aria-invalid'));
let bad=null,t='';
if(!name){bad='n';t='Please enter your name.'}else if(!/^\+?[\d\s().-]+$/.test(num)||digits.length<7||digits.length>15){bad='w';t='Please enter a valid WhatsApp number, for example +8801XXXXXXXXX.'}else if(!uni){bad='u';t='Please enter your preferred university or course.'}
if(bad){f.elements[bad].setAttribute('aria-invalid','true');err.textContent=t;err.hidden=false;f.elements[bad].focus();return}
err.hidden=true;
const text=`Hello Bidesh Express!\n\nI am interested in applying through your agency.\n\nName: ${name}\n\nWhatsApp Number: ${num}\n\nPreferred University or Course: ${uni}\n\nMessage: ${msg||'No additional message'}\n\nI would like to know more about the admission process.\n\nThank you!`;
const url=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
const w=window.open(url,'_blank');if(w){try{w.opener=null}catch(x){}}else{location.href=url}};
