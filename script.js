(function(){
var C=window.LGND,$=function(s){return document.querySelector(s)},reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var get=function(p){return p.split('.').reduce(function(o,k){return o&&o[k]},C)};
document.querySelectorAll('[data-k]').forEach(function(e){e.textContent=get(e.dataset.k)});
document.querySelectorAll('[data-list]').forEach(function(e){var k=e.dataset.list.indexOf('.')>0,tag=k?'li':'p';get(e.dataset.list).forEach(function(t){var n=document.createElement(tag);n.textContent=t;e.appendChild(n)})});
$('.motto').textContent=C.motto;$('#igl').href=C.instagram.url;$('#cl2').href=C.instagram.url;
if(reduce){$('#enter').style.opacity=1;$('.word').style.opacity=1;$('.motto').style.opacity=1}
// toast + copy
var tt;function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show')},1600)}
document.querySelectorAll('[data-copy]').forEach(function(b){b.onclick=function(){var v=get(b.dataset.copy);
 (navigator.clipboard?navigator.clipboard.writeText(v):Promise.reject()).catch(function(){var a=document.createElement('textarea');a.value=v;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}).then(function(){toast('Copied')},function(){toast('Copied')});blip()}});
// sound (muted by default, synthesized, no files)
var ac,drone,on=false;
function ctx(){if(!ac)ac=new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();return ac}
function blip(){if(!on)return;var a=ctx(),o=a.createOscillator(),g=a.createGain();o.frequency.value=880;g.gain.setValueAtTime(.04,a.currentTime);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+.15);o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.16)}
function whoosh(){if(!on)return;var a=ctx(),n=a.sampleRate*1.4,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(var i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);var s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=b;f.type='bandpass';f.frequency.setValueAtTime(300,a.currentTime);f.frequency.exponentialRampToValueAtTime(5000,a.currentTime+1.2);g.gain.value=.12;s.connect(f).connect(g).connect(a.destination);s.start()}
$('#snd').onclick=function(){on=!on;this.setAttribute('aria-pressed',on);this.textContent='Sound: '+(on?'on':'off');
 if(on){var a=ctx();drone=[55,82.4].map(function(fr){var o=a.createOscillator(),g=a.createGain();o.frequency.value=fr;g.gain.value=.025;o.connect(g).connect(a.destination);o.start();return o});blip()}
 else if(drone){drone.forEach(function(o){o.stop()});drone=null}};
document.querySelectorAll('.btn,nav a').forEach(function(e){e.addEventListener('click',blip)});
// particles (lite on weak devices)
var cv=$('#fx'),x=cv.getContext('2d'),P=[],lite=reduce||(navigator.hardwareConcurrency||4)<4,N=lite?25:60;
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
function mk(px,py,t){return{x:px,y:py,vx:(Math.random()-.5)*(t?1.2:.25),vy:t?(Math.random()-.5)*1.2:-Math.random()*.35-.05,l:t?1:2,r:Math.random()*1.6+.4,t:t}}
for(var i=0;i<N;i++)P.push(mk(Math.random()*innerWidth,Math.random()*innerHeight,0));
if(!reduce){addEventListener('pointermove',function(e){for(var i=0;i<2;i++)P.push(mk(e.clientX,e.clientY,1))},{passive:true})}
(function loop(){if(!document.hidden){x.clearRect(0,0,cv.width,cv.height);
 for(var i=P.length-1;i>=0;i--){var p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.t){p.l-=.03;if(p.l<=0){P.splice(i,1);continue}}else if(p.y<-5){p.y=cv.height+5;p.x=Math.random()*cv.width}
  x.globalAlpha=p.t?p.l*.7:.4;x.fillStyle=p.t?'#9fd8ff':'#dfe6ee';x.beginPath();x.arc(p.x,p.y,p.r,0,6.3);x.fill()}}
 requestAnimationFrame(loop)})();
// enter + silver shatter
var entered=false;
function show(){$('#intro').classList.add('gone');document.body.classList.add('in');scrollTo(0,0);$('#enter').blur()}
function enter(fast){if(entered)return;entered=true;whoosh();
 if(fast||reduce){show();return}
 var s=$('#shards'),cols=7,rows=10,w=innerWidth/cols,h=innerHeight/rows;
 for(var r=0;r<rows;r++)for(var c=0;c<cols;c++)for(var k=0;k<2;k++){var i=document.createElement('i');
  i.style.cssText='left:'+c*w+'px;top:'+r*h+'px;width:'+(w+1)+'px;height:'+(h+1)+'px;clip-path:polygon('+(k?'100% 0,100% 100%,0 100%':'0 0,100% 0,0 100%')+');--dx:'+(Math.random()*160-80)+'px;--rot:'+(Math.random()*120-60)+'deg;transition-delay:'+(Math.random()*.5)+'s';s.appendChild(i)}
 setTimeout(function(){show();requestAnimationFrame(function(){s.classList.add('fall')})},300);
 setTimeout(function(){s.innerHTML='';s.classList.remove('fall')},2400)}
$('#enter').onclick=function(){enter(false)};$('#skip').onclick=function(){enter(true)};
// reveal on scroll
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('on')})},{threshold:.2});
document.querySelectorAll('.inner').forEach(function(e){e.classList.add('rv');io.observe(e)});
// secrets
var wi=0,sg=$('#sigil');sg.onclick=function(){$('#whisper').textContent=C.whispers[wi++%C.whispers.length];sg.classList.remove('glitch');void sg.offsetWidth;if(!reduce)sg.classList.add('glitch');blip()};
})();
