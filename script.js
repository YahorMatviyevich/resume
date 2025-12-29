// Мини-typing без библиотек
const roles = ["Web Development", "Python Development", "Automation", "Game Dev"];
const typingEl = document.getElementById("typing");
let roleIndex = 0, charIndex = 0, deleting = false;

function tick(){
  const word = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length) deleting = true;
  } else {
    charIndex--;
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  const speed = deleting ? 45 : 70;
  setTimeout(tick, speed);
}
tick();

// год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// mobile menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("is-open");
});

// закрывать меню после клика
mobileMenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileMenu.classList.remove("is-open"));
});

// активный пункт меню при скролле
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav__link")];

function setActive(){
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }
  navLinks.forEach(a => {
    a.classList.toggle("is-active", a.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", setActive);
setActive();

// Простые "частицы" на canvas (без библиотек)
const particlesRoot = document.getElementById("particles");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
particlesRoot.appendChild(canvas);

let W=0,H=0, pts=[];
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const n = Math.min(90, Math.floor((W*H)/18000));
  pts = Array.from({length:n}, () => ({
    x: Math.random()*W,
    y: Math.random()*H,
    vx: (Math.random()-.5)*0.5,
    vy: (Math.random()-.5)*0.5,
  }));
}
window.addEventListener("resize", resize);
resize();

function draw(){
  ctx.clearRect(0,0,W,H);

  // точки
  for (const p of pts){
    p.x += p.vx; p.y += p.vy;
    if (p.x<0||p.x>W) p.vx*=-1;
    if (p.y<0||p.y>H) p.vy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,2,0,Math.PI*2);
    ctx.fillStyle = "rgba(15,23,42,0.35)";
    ctx.fill();
  }

  // линии
  for (let i=0;i<pts.length;i++){
    for (let j=i+1;j<pts.length;j++){
      const a=pts[i], b=pts[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d=Math.hypot(dx,dy);
      if (d < 140){
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.strokeStyle = `rgba(15,23,42,${(1 - d/140)*0.18})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();
