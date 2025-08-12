console.log('Javascript has loaded successfully!')
// Contact form UX
    function validateForm(e){
      e.preventDefault();
      alert('Thanks! Your message has been sent.');
      e.target.reset();
    }

    // Mobile nav toggle + close on click
    const navToggle=document.querySelector('.nav-toggle');
    const navMenu=document.querySelector('.nav-menu');
    navToggle.addEventListener('click',()=> navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',()=> navMenu.classList.remove('active')));

    // Back to top
    const backToTop=document.getElementById('backToTop');
    window.addEventListener('scroll',()=> backToTop.style.display = window.scrollY>100 ? 'block' : 'none');
    backToTop.addEventListener('click',()=> window.scrollTo({ top:0, behavior:'smooth' }));

    // HERO SLIDESHOW (consistent slow pan)
    document.addEventListener('DOMContentLoaded',()=>{
      const IMAGES=[
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=2000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=2000&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=2000&auto=format&fit=crop&q=80"
      ];
      const hero=document.querySelector('.hero');
      let layerA=document.querySelector('.hero .bg-a');
      let layerB=document.querySelector('.hero .bg-b');
      function ensureLayer(sel){let el=document.querySelector(sel); if(!el){el=document.createElement('div'); el.className='hero-bg '+sel.replace('.',''); hero.prepend(el);} return el;}
      layerA=layerA||ensureLayer('.bg-a');
      layerB=layerB||ensureLayer('.bg-b');
      const setBG=(el,url)=>{el.style.backgroundImage=`url('${url}')`};
      const PAN_MS=20000; // match CSS animation duration 20s
      const restartPan=(el)=>{ el.style.animation='none'; void el.offsetWidth; el.style.animation='panZoom 20s ease-in-out infinite alternate'; };
      let curr=0; let showA=true;
      setBG(layerA,IMAGES[curr]); layerA.classList.add('is-active'); restartPan(layerA);
      let next=(curr+1)%IMAGES.length; setBG(layerB,IMAGES[next]);
      setInterval(()=>{
        curr=(curr+1)%IMAGES.length; const upcoming=(curr+1)%IMAGES.length;
        if(showA){ setBG(layerB,IMAGES[curr]); layerB.classList.add('is-active'); restartPan(layerB); layerA.classList.remove('is-active'); }
        else { setBG(layerA,IMAGES[curr]); layerA.classList.add('is-active'); restartPan(layerA); layerB.classList.remove('is-active'); }
        showA=!showA;
        (showA?layerB:layerA).style.backgroundImage=`url('${IMAGES[upcoming]}')`;
      }, PAN_MS);
    });