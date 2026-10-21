(() => {
  const $ = (s) => document.querySelector(s);
  const config = window.LGNDMAFIA_CONFIG || {};
  if (config.bgmi) { $('#uid').textContent = config.bgmi.uid; $('#sensitivity').textContent = config.bgmi.sensitivity; }
  const enter = $('#enterWorld');
  enter.addEventListener('click', () => { document.body.classList.add('entered'); $('#home').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); });
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const value = document.getElementById(button.dataset.copy).textContent.trim();
    try { await navigator.clipboard.writeText(value); button.textContent = 'COPIED'; }
    catch { const area = document.createElement('textarea'); area.value = value; document.body.append(area); area.select(); document.execCommand('copy'); area.remove(); button.textContent = 'COPIED'; }
    setTimeout(() => button.textContent = button.dataset.copy === 'uid' ? 'COPY UID' : 'COPY CODE', 1300);
  }));
  const canvas = $('#particles'), ctx = canvas.getContext('2d'); let w, h, dots = [], raf;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);dots=Array.from({length:Math.min(65,Math.floor(innerWidth/13))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.3,v:Math.random()*.24+.05,a:Math.random()*.45+.1}));}
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of dots){ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(170,215,240,${p.a})`;ctx.fill();if(!reduced){p.y-=p.v;if(p.y<0){p.y=innerHeight;p.x=Math.random()*innerWidth;}}}if(!reduced)raf=requestAnimationFrame(draw);}
  resize();draw();addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw()});
  // Desktop pointer trail is deliberately lightweight; touch devices use the ambient particles instead.
  if(!reduced && matchMedia('(pointer:fine)').matches){let last=0;addEventListener('pointermove',e=>{if(Date.now()-last<45)return;last=Date.now();ctx.beginPath();ctx.arc(e.clientX,e.clientY,1.2,0,Math.PI*2);ctx.fillStyle='rgba(170,225,255,.5)';ctx.fill();});}
  $('#soundToggle').addEventListener('click', e => { const on=e.currentTarget.getAttribute('aria-pressed')!=='true'; e.currentTarget.setAttribute('aria-pressed',String(on));e.currentTarget.textContent='SOUND: '+(on?'ON':'OFF'); if(on) showNotice('Sound is not configured yet. Add your own licensed audio in the setup guide.'); });
  function showNotice(text){let n=$('.notice');if(!n){n=document.createElement('div');n.className='notice';document.body.append(n)}n.textContent=text;n.classList.add('show');setTimeout(()=>n.classList.remove('show'),2400)}
})();