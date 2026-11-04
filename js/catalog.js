(function(){
  var T=window.TEX,d=document,B=window.BASE||'';
  var SERIES=['Древесная','Металлическая','Каменная','Тканевая','Однотонная','Кожаная','Soft touch'];
  var DIRS=['Natural','Standart'];
  var INTRO={
    'Древесная':'Текстура дерева — лучшее воплощение природы, благодаря чему все пространство излучает приятную атмосферу, теплоту, ощущение уюта.',
    'Металлическая':'Металл — популярное дизайнерское решение, которое набирает обороты. Оригинальное решение для помещений в стиле хай-тек, минимализм и многих других современных направлений.',
    'Каменная':'Каменная серия выглядит сдержанно, лаконично, но при этом элегантно, поэтому её можно вписать в пространство, выполненное практически в любом актуальном стиле.',
    'Тканевая':'В мире дизайна интерьера текстильные стеновые панели становятся неотъемлемой частью, сочетая в себе элегантность и практичность.',
    'Однотонная':'Однотонная серия позволяет осуществить авторский микс стилей или выдержать чёткое следование канонам классики.',
    'Кожаная':'Серия с имитацией кожи с различной фактурой и оттенками для самых смелых и стильных решений.',
    'Soft touch':'Однотонная серия с мягким бархатистым покрытием soft touch: матовая приятная на ощупь поверхность без бликов.'};
  var LINE={
    'STANDART':'ПВХ-плёнка с имитацией различных фактур',
    'NATURAL':'Тактильная фактура и натуральное покрытие',
    'SOFT TOUCH':'Серия SOFT TOUCH',
    'MIRROR STANDART':'Зеркальная панель, исполнение STANDART'};
  var serie='Все',dir='Все',q='';
  var grid=d.getElementById('cgrid'),fs=d.getElementById('fSeries'),fl=d.getElementById('fLine'),cnt=d.getElementById('count'),intro=d.getElementById('intro');
  function match(t){return !q||(t.art+' '+t.line).toLowerCase().indexOf(q)>-1}
  function cntBy(f){return T.filter(function(t){return match(t)&&f(t)}).length}
  function chip(label,on,fn,n){var b=d.createElement('button');b.className='chip'+(on?' on':'');b.innerHTML=label+(n!=null?'<small>'+n+'</small>':'');b.onclick=fn;return b}
  function drawFilters(){
    fs.innerHTML='';fl.innerHTML='';
    fs.appendChild(chip('Все',serie==='Все',function(){serie='Все';dir='Все';render()},cntBy(function(){return true})));
    SERIES.forEach(function(s){
      var n=cntBy(function(t){return t.series===s});
      if(!n&&serie!==s)return;
      fs.appendChild(chip(s,serie===s,function(){serie=s;dir='Все';render()},n));
    });
    var ds=DIRS.filter(function(x){return T.some(function(t){return t.series===serie&&t.dir===x})});
    if(serie==='Все'||ds.length<2){fl.style.display='none';dir='Все';return}
    fl.style.display='';
    fl.appendChild(chip('Все',dir==='Все',function(){dir='Все';render()},cntBy(function(t){return t.series===serie})));
    ds.forEach(function(x){
      var n=cntBy(function(t){return t.series===serie&&t.dir===x});
      if(!n&&dir!==x)return;
      fl.appendChild(chip(x,dir===x,function(){dir=x;render()},n));
    });
  }
  function list(){
    return T.filter(function(t){
      return (serie==='Все'||t.series===serie)&&(dir==='Все'||t.dir===dir)&&match(t);
    });
  }
  function render(){
    drawFilters();
    var L=list();grid.innerHTML='';
    L.forEach(function(t,i){
      var b=d.createElement('button');b.className='tcard';b.setAttribute('data-i',T.indexOf(t));
      b.innerHTML='<img loading="lazy" width="450" height="600" src="'+B+'img/tex/'+t.id+'.jpg" alt="'+t.line+' '+t.art+'"><div><b>'+t.art+'</b><span>'+t.series+' · '+t.dir+'</span></div>';
      grid.appendChild(b);
    });
    cnt.textContent='Показано текстур: '+L.length+' из '+T.length;
    intro.textContent=serie==='Все'?'':INTRO[serie];
  }
  d.getElementById('search').addEventListener('input',function(e){q=e.target.value.trim().toLowerCase();render()});
  // modal
  var m=d.getElementById('modal'),cur=-1,seq=[];
  function open(i){
    cur=i;var t=T[i];
    d.getElementById('mImg').src=B+'img/texl/'+t.id+'.jpg';
    d.getElementById('mImg').alt=t.line+' '+t.art;
    d.getElementById('mArt').textContent=t.art;
    d.getElementById('mLine').textContent=t.line;
    d.getElementById('mSerie').textContent=t.series+' · '+t.dir;
    d.getElementById('mDesc').textContent=LINE[t.line];
    var leather=t.series==='Кожаная'&&t.line==='NATURAL';
    d.getElementById('mBase').textContent=leather?'ДПК (5/8 мм), СМЛ (10 мм) — по каталогу':'ДПК (5/8 мм), СМЛ (8/10 мм)';
    var v=d.getElementById('mVis'),row=d.getElementById('mRow');row.innerHTML='';
    if(t.vis.length){
      v.style.display='block';
      t.vis.forEach(function(x){var f=d.createElement('figure');f.setAttribute('data-zoom',B+'img/vis/'+x.s+'.jpg');f.innerHTML='<img loading="lazy" src="'+B+'img/vis/'+x.s+'.jpg" alt="Визуализация интерьера, артикул '+t.art+'">'+(x.l?'<figcaption>'+x.l+'</figcaption>':'');row.appendChild(f)});
    }else v.style.display='none';
    m.classList.add('on');m.scrollTop=0;d.body.style.overflow='hidden';
    try{history.replaceState(null,'','#'+t.id)}catch(e){}
  }
  function close(){m.classList.remove('on');d.body.style.overflow='';try{history.replaceState(null,'',location.pathname)}catch(e){}}
  function step(k){var L=list();if(!L.length)return;var p=L.indexOf(T[cur]);p=(p+k+L.length)%L.length;open(T.indexOf(L[p]))}
  grid.addEventListener('click',function(e){var c=e.target.closest('.tcard');if(c)open(+c.getAttribute('data-i'))});
  d.getElementById('mClose').onclick=close;
  m.addEventListener('click',function(e){if(e.target===m)close()});
  d.getElementById('mPrev').onclick=function(){step(-1)};
  d.getElementById('mNext').onclick=function(){step(1)};
  d.addEventListener('keydown',function(e){if(!m.classList.contains('on'))return;if(e.key==='Escape'&&!d.querySelector('.lb.on'))close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
  render();
  var h=location.hash.slice(1);if(h){T.forEach(function(t,i){if(t.id===h)open(i)})}
})();
