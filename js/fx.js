(function(){
  var d=document,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // chrome glint follows the pointer on cards
  d.addEventListener('pointermove',function(e){
    var t=e.target.closest&&e.target.closest('.card,.stat,.cert,.tcard,.req,.pl');
    if(!t)return;var r=t.getBoundingClientRect();
    t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px');
  },{passive:true});
  // header state
  var h=d.querySelector('header.top');
  function hs(){if(h)h.classList.toggle('scrolled',window.scrollY>20)}
  // slow parallax
  var P=[].slice.call(d.querySelectorAll('[data-par]'));
  var tick=false;
  function upd(){tick=false;hs();if(rm)return;var y=window.scrollY;if(y>2000)return;
    P.forEach(function(el){var k=parseFloat(el.getAttribute('data-par'))||.1;el.style.transform='translate3d(0,'+(y*k).toFixed(1)+'px,0)'})}
  window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
  upd();
})();
