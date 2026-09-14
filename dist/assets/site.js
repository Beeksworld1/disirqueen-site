const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu');
const nav=document.querySelector('#site-nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20),{passive:true});
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelector('#year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
