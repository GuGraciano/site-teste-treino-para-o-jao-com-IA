// ============================
// TYPEWRITER HERO
// ============================

const typeTarget = document.getElementById("typedPre");
const typeText   = "AGÊNCIA FEDERAL DE ANIVERSÁRIOS URGENTES";
let   typeIndex  = 0;

function typeNext() {
    if (typeIndex < typeText.length) {
        typeTarget.textContent += typeText[typeIndex++];
        setTimeout(typeNext, 50);
    }
}

// Começa a digitar após o stamp aparecer
setTimeout(typeNext, 900);

// ============================
// COUNTDOWN
// ============================

const dataFesta = new Date("March 14, 2026 20:00:00").getTime();

const cdDias  = document.getElementById("cdDias");
const cdHoras = document.getElementById("cdHoras");
const cdMin   = document.getElementById("cdMin");
const cdSeg   = document.getElementById("cdSeg");
const cdSub   = document.getElementById("cdSub");

function pad(n) { return String(n).padStart(2, "0"); }

function tickNum(el, val) {
    el.classList.add("tick");
    el.textContent = pad(val);
    setTimeout(() => el.classList.remove("tick"), 180);
}

const countdownInterval = setInterval(() => {
    const agora     = Date.now();
    const distancia = dataFesta - agora;

    if (distancia <= 0) {
        clearInterval(countdownInterval);
        cdDias.textContent  = "00";
        cdHoras.textContent = "00";
        cdMin.textContent   = "00";
        cdSeg.textContent   = "00";
        if (cdSub) cdSub.textContent = "⚡ O CAOS JÁ COMEÇOU. Por que você ainda está aqui? VÁ LOGO pro Sr.Snooker.";
        return;
    }

    const dias     = Math.floor(distancia / 86400000);
    const horas    = Math.floor((distancia % 86400000) / 3600000);
    const minutos  = Math.floor((distancia % 3600000) / 60000);
    const segundos = Math.floor((distancia % 60000) / 1000);

    if (cdSeg.textContent !== pad(segundos)) tickNum(cdSeg, segundos);
    if (cdMin.textContent !== pad(minutos))  tickNum(cdMin, minutos);
    if (cdHoras.textContent !== pad(horas))  tickNum(cdHoras, horas);
    if (cdDias.textContent !== pad(dias))    tickNum(cdDias, dias);

}, 1000);

// ============================
// SCROLL REVEAL — REASON CARDS
// ============================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delay por ordem
            const cards = document.querySelectorAll(".reason-card");
            cards.forEach((card, idx) => {
                if (card === entry.target) {
                    setTimeout(() => card.classList.add("visible"), idx * 80);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reason-card").forEach(card => observer.observe(card));

// ============================
// NAVBAR SCROLL
// ============================

window.addEventListener("scroll", () => {
    document.getElementById("navbar").classList.toggle("small", window.scrollY > 60);
});

// ============================
// GALERIA + LIGHTBOX
// ============================

const imagens = [
    "img/aesthetic.jpeg",
    "img/eterno vicio.jpeg",
    "img/jao bixa.jpeg",
    "img/jao com skol, cigarro e oreo.jpeg",
    "img/jao de cabelo rosa.jpeg",
    "img/jao dormindo e fumando.jpeg",
    "img/jao e amigos.jpeg",
    "img/jao e bumblebee.jpeg",
    "img/jao e sua classica camisa de piknik.jpeg",
    "img/jao etec.jpeg",
    "img/jao guitarra.jpeg",
    "img/jao hospital.jpeg",
    "img/jao junino.jpeg",
    "img/jao pose sujestiva.jpeg",
    "img/jao supremo.jpeg",
    "img/jao tesao.jpeg",
    "img/junino.jpeg",
    "img/trio.jpeg",
    "img/namo do jao.jpeg",
    "img/salgadin.jpeg"
];

const lightbox  = document.getElementById("lightbox");
const lbImg     = document.getElementById("lbImg");
const lbCounter = document.getElementById("lbCounter");
const lbDots    = document.getElementById("lbDots");
const lbClose   = document.getElementById("lbClose");
const lbPrev    = document.getElementById("lbPrev");
const lbNext    = document.getElementById("lbNext");
const lbBackdrop= document.getElementById("lbBackdrop");

let lbIndex = 0;

// Cria os dots
imagens.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "lb-dot";
    dot.setAttribute("aria-label", `Foto ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    lbDots.appendChild(dot);
});

function updateDots() {
    lbDots.querySelectorAll(".lb-dot").forEach((d, i) => {
        d.classList.toggle("active", i === lbIndex);
    });
}

function goTo(index) {
    lbIndex = (index + imagens.length) % imagens.length;
    lbImg.classList.add("fading");
    setTimeout(() => {
        lbImg.src = imagens[lbIndex];
        lbImg.classList.remove("fading");
        lbCounter.textContent = `FOTO ${String(lbIndex + 1).padStart(2,"0")} / ${String(imagens.length).padStart(2,"0")}`;
        updateDots();
    }, 220);
}

function openLightbox(index) {
    lbIndex = index;
    lbImg.src = imagens[lbIndex];
    lbCounter.textContent = `FOTO ${String(lbIndex + 1).padStart(2,"0")} / ${String(imagens.length).padStart(2,"0")}`;
    updateDots();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Clique nos itens da galeria
document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
});

lbClose.addEventListener("click", closeLightbox);
lbBackdrop.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", () => goTo(lbIndex - 1));
lbNext.addEventListener("click", () => goTo(lbIndex + 1));
document.getElementById("lbPrevMobile").addEventListener("click", () => goTo(lbIndex - 1));
document.getElementById("lbNextMobile").addEventListener("click", () => goTo(lbIndex + 1));

// Teclado
document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowRight") goTo(lbIndex + 1);
    if (e.key === "ArrowLeft")  goTo(lbIndex - 1);
});

// Swipe mobile
let touchStartX = 0;
lightbox.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener("touchend",   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff >  50) goTo(lbIndex + 1);
    if (diff < -50) goTo(lbIndex - 1);
});

// Fallback imagem quebrada na galeria
lbImg.addEventListener("error", () => {
    lbImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%230f0e0a' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23a87000' text-anchor='middle' font-size='14' font-family='monospace' dominant-baseline='middle'%3E[ARQUIVO CORROMPIDO]%3C/text%3E%3C/svg%3E";
});

// ============================
// WHATSAPP RSVP
// ============================

document.getElementById("confirmarBtn").addEventListener("click", () => {
    const numero   = "5519998202217";
    const mensagem = "Fui convocado pelo Dossiê! Confirmo minha presença no caos do dia 16/03. Me passa o local secreto! 🍻🔥";
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank");
});

// ============================
// FALLBACK IMAGENS QUEBRADAS
// ============================

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
        img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%230f0e0a' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23a87000' text-anchor='middle' font-size='14' font-family='monospace' dominant-baseline='middle'%3E[ARQUIVO CORROMPIDO]%3C/text%3E%3C/svg%3E";
    });
});

// ============================
// EASTER EGGS
// ============================

// ---- 1. 5× TOQUE NO TÍTULO DA NAVBAR → chuva de emojis ----
// (funciona no celular e no PC)
const jaoEmojis = ["🍺","😈","🔥","🚬","💥","🎉","😂","🤖","🕺","💃","🥳","👊","🍾","😎","🎂"];
const navTitle  = document.querySelector(".nav-title");
let   navTaps   = 0;
let   navTimer  = null;

navTitle.style.cursor = "pointer";
navTitle.title = "...";

navTitle.addEventListener("click", () => {
    navTaps++;
    clearTimeout(navTimer);
    navTimer = setTimeout(() => { navTaps = 0; }, 1500);

    // feedback visual sutil a cada toque
    navTitle.style.color = navTaps % 2 === 0 ? "var(--gold)" : "var(--text)";

    if (navTaps >= 5) {
        navTaps = 0;
        navTitle.style.color = "";
        dispararChuvaEmojis();
    }
});

function dispararChuvaEmojis() {
    const total = 60;
    for (let i = 0; i < total; i++) {
        setTimeout(() => {
            const el = document.createElement("div");
            el.className = "emoji-rain";
            el.textContent = jaoEmojis[Math.floor(Math.random() * jaoEmojis.length)];
            el.style.left = Math.random() * 100 + "vw";
            el.style.fontSize = (24 + Math.random() * 32) + "px";
            el.style.animationDuration = (1.5 + Math.random() * 2) + "s";
            document.body.appendChild(el);
            el.addEventListener("animationend", () => el.remove());
        }, i * 40);
    }
}

// ---- MODAL SEGREDOS (botão desisto) ----
document.getElementById("giveupBtn").addEventListener("click", () => {
    document.getElementById("secretsModal").classList.add("open");
    document.body.style.overflow = "hidden";
});

document.getElementById("secretsClose").addEventListener("click", () => {
    document.getElementById("secretsModal").classList.remove("open");
    document.body.style.overflow = "";
});

document.getElementById("secretsBackdrop").addEventListener("click", () => {
    document.getElementById("secretsModal").classList.remove("open");
    document.body.style.overflow = "";
});
const stamp = document.querySelector(".stamp");
const videoModal    = document.getElementById("videoModal");
const videoModalEl  = document.getElementById("easterVideo");
const videoClose    = document.getElementById("videoClose");
const videoStatus   = document.getElementById("videoStatus");

stamp.style.cursor = "pointer";
stamp.title = "...";

stamp.addEventListener("click", () => {
    // fase 1: ACESSO NEGADO
    videoModal.classList.add("open");
    videoStatus.textContent = "⛔ ACESSO NEGADO — NÍVEL DE AUTORIZAÇÃO INSUFICIENTE";
    videoStatus.style.color = "var(--red-bright)";
    videoModalEl.style.display = "none";
    videoClose.style.display = "none";
    document.body.style.overflow = "hidden";

    // fase 2: treme a tela
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);

    // fase 3: autorização concedida, mostra vídeo
    setTimeout(() => {
        videoStatus.textContent = "✅ AUTORIZAÇÃO DE EMERGÊNCIA CONCEDIDA — BEM-VINDO, AGENTE";
        videoStatus.style.color = "var(--gold)";
        setTimeout(() => {
            videoModalEl.style.display = "block";
            videoClose.style.display = "inline-flex";
        }, 800);
    }, 2000);
});

videoClose.addEventListener("click", () => {
    videoModal.classList.remove("open");
    videoModalEl.pause();
    document.body.style.overflow = "";
});

document.getElementById("videoBackdrop").addEventListener("click", () => {
    videoModal.classList.remove("open");
    videoModalEl.pause();
    document.body.style.overflow = "";
});

// ---- 3. 3× CLIQUE NA FOTO → alerta terminal ----
const subjectPhoto  = document.querySelector(".subject-photo");
const terminalModal = document.getElementById("terminalModal");
const terminalText  = document.getElementById("terminalText");
const terminalClose = document.getElementById("terminalClose");
let   clickCount    = 0;
let   clickTimer    = null;

subjectPhoto.style.cursor = "pointer";

subjectPhoto.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 600);

    if (clickCount >= 3) {
        clickCount = 0;
        abrirTerminal();
    }
});

const linhasTerminal = [
    "$ iniciando varredura biométrica...",
    "$ identificando suspeito...",
    "$ ALERTA: suspeito ciente que está sendo observado.",
    "$ cavanhaque estratégico detectado. Nível: CHEFÃO.",
    "$ olhar panorâmico 360° confirmado — fuga improvável.",
    "$ cruzando dados com base Pizzinato...",
    "$ [████████████████] 100%",
    "$ RESULTADO: Jão sabe de tudo. Ele sempre soube.",
    "$ RECOMENDAÇÃO: apareça no aniversário ou sofra as consequências.",
    "$ encerrando sessão. Deus nos ajude. _"
];

function abrirTerminal() {
    terminalModal.classList.add("open");
    terminalText.innerHTML = "";
    document.body.style.overflow = "hidden";
    terminalClose.style.display = "none";

    linhasTerminal.forEach((linha, i) => {
        setTimeout(() => {
            terminalText.innerHTML += linha + "\n";
            terminalText.scrollTop = terminalText.scrollHeight;
            if (i === linhasTerminal.length - 1) {
                setTimeout(() => { terminalClose.style.display = "inline-flex"; }, 400);
            }
        }, i * 350);
    });
}

terminalClose.addEventListener("click", () => {
    terminalModal.classList.remove("open");
    document.body.style.overflow = "";
});

document.getElementById("terminalBackdrop").addEventListener("click", () => {
    terminalModal.classList.remove("open");
    document.body.style.overflow = "";
});

// ---- 4. 30s PARADO → agente sumiu ----
const idleToast  = document.getElementById("idleToast");
let   idleTimer  = null;
let   idleShown  = false;

function resetIdle() {
    clearTimeout(idleTimer);
    if (idleShown) return; // só mostra uma vez
    idleTimer = setTimeout(mostrarIdleToast, 30000);
}

function mostrarIdleToast() {
    if (idleShown) return;
    idleShown = true;
    idleToast.classList.add("show");
}

document.getElementById("idleDismiss").addEventListener("click", () => {
    idleToast.classList.remove("show");
});

["mousemove","scroll","keydown","touchstart","click"].forEach(ev => {
    document.addEventListener(ev, resetIdle, { passive: true });
});

resetIdle(); // começa o timer