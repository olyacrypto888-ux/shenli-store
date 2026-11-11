(function(){
  var KEY='shenli_cookie_consent',d=document,box=d.getElementById('cookie');
  if(!box)return;
  // Сюда вставляется код счётчика (например, Яндекс.Метрики). Вызывается ТОЛЬКО при выборе «Разрешить все».
  function loadAnalytics(){
    // пример: подключить скрипт счётчика и вызвать ym(ID,'init',{...});
  }
  function read(){try{var v=localStorage.getItem(KEY);return v?JSON.parse(v):null}catch(e){return null}}
  function save(choice){try{localStorage.setItem(KEY,JSON.stringify({choice:choice,date:new Date().toISOString()}))}catch(e){}}
  function show(){box.hidden=false}
  function hide(){box.hidden=true}
  var cur=read();
  if(cur&&cur.choice){if(cur.choice==='all')loadAnalytics()}else show();
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-cookie]');
    if(b){var c=b.getAttribute('data-cookie');save(c);hide();if(c==='all')loadAnalytics();return}
    if(e.target.closest('[data-cookie-open]'))show();
  });
})();
