(function(){
  var d=document;
  // mobile menu
  var b=d.querySelector('.burger'),n=d.querySelector('nav.main');
  if(b){b.addEventListener('click',function(){b.classList.toggle('open');n.classList.toggle('open')});}
  // reveal
  var els=d.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(function(e){e.classList.add('in')})}
  // lightbox
  var lb=d.querySelector('.lb');
  if(lb){
    var li=lb.querySelector('img');
    d.addEventListener('click',function(e){
      var f=e.target.closest('[data-zoom]');
      if(f){li.src=f.getAttribute('data-zoom');lb.classList.add('on');return}
      if(e.target.closest('.lb')){lb.classList.remove('on')}
    });
    d.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});
  }
})();
