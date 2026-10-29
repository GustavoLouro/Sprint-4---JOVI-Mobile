// Menu mobile
const navToggle = document.getElementById('nav-toggle');
const menuPrincipal = document.getElementById('menu-principal');
const navLinks = document.querySelectorAll('.nav__link, .nav__btn');

if (navToggle && menuPrincipal) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isOpen);
        menuPrincipal.classList.toggle('is-open', !isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            menuPrincipal.classList.remove('is-open');
        });
    });
}

// Scroll spy - link ativo na nav
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        }
    });
});

// Validacao do formulario de contato
const contactForm = document.getElementById('form-contato');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = contactForm.elements['nome'];
        const email = contactForm.elements['email'];
        const mensagem = contactForm.elements['mensagem'];

        let isValid = true;
        [nome, email, mensagem].forEach(input => input.classList.remove('is-invalid'));

        if (!nome.value.trim()) {
            nome.classList.add('is-invalid');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        if (!mensagem.value.trim() || mensagem.value.trim().length < 5) {
            mensagem.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            formStatus.className = 'form-status is-error';
            formStatus.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
            return;
        }

        formStatus.className = 'form-status is-success';
        formStatus.textContent = `Mensagem enviada com sucesso! Obrigado pelo contato, ${nome.value.trim().split(' ')[0]}.`;
        contactForm.reset();
    });
}

// Player interativo da demonstracao
const videoPlayer = document.getElementById('interactive-video-player');
const videoStage = document.getElementById('video-stage');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnCenterPlay = document.getElementById('btn-center-play');
const videoProgress = document.getElementById('video-progress');
const videoHandle = document.getElementById('video-handle');
const videoTimeline = document.getElementById('video-timeline');
const videoTime = document.getElementById('video-time');
const frame1 = document.getElementById('video-frame-1');
const btnToggleShadow = document.getElementById('btn-toggle-shadow');
const btnFullscreen = document.getElementById('btn-fullscreen');

if (videoPlayer && videoStage && frame1) {
    let isPlaying = true;
    let totalDuration = 10; // fallback duration in seconds

    videoPlayer.classList.add('is-playing');

    const updateTimeDisplay = (time, duration = totalDuration) => {
        const currentSec = Math.floor(time);
        const totalSec = Math.floor(duration);
        const curMin = Math.floor(currentSec / 60);
        const curRemSec = currentSec % 60;
        const durMin = Math.floor(totalSec / 60);
        const durRemSec = totalSec % 60;

        const curStr = `${curMin < 10 ? '0' : ''}${curMin}:${curRemSec < 10 ? '0' : ''}${curRemSec}`;
        const durStr = `${durMin < 10 ? '0' : ''}${durMin}:${durRemSec < 10 ? '0' : ''}${durRemSec}`;
        if (videoTime) videoTime.textContent = `${curStr} / ${durStr}`;

        const percentage = duration > 0 ? (time / duration) * 100 : 0;
        if (videoProgress) videoProgress.style.width = `${percentage}%`;
        if (videoHandle) videoHandle.style.left = `${percentage}%`;
        if (videoTimeline) videoTimeline.setAttribute('aria-valuenow', Math.round(percentage));
    };

    if (frame1.duration && !isNaN(frame1.duration)) {
        totalDuration = frame1.duration;
    }
    frame1.addEventListener('loadedmetadata', () => {
        if (frame1.duration && !isNaN(frame1.duration)) {
            totalDuration = frame1.duration;
        }
        updateTimeDisplay(frame1.currentTime, totalDuration);
    });

    frame1.addEventListener('timeupdate', () => {
        if (frame1.duration && !isNaN(frame1.duration)) {
            totalDuration = frame1.duration;
        }
        updateTimeDisplay(frame1.currentTime, totalDuration);
    });

    const play = () => {
        isPlaying = true;
        videoPlayer.classList.add('is-playing');
        if (btnPlayPause) btnPlayPause.classList.add('is-playing');
        if (btnCenterPlay) {
            btnCenterPlay.classList.add('is-playing');
            btnCenterPlay.classList.remove('is-paused');
        }
        frame1.play().catch(() => {});
    };

    const pause = () => {
        isPlaying = false;
        videoPlayer.classList.remove('is-playing');
        if (btnPlayPause) btnPlayPause.classList.remove('is-playing');
        if (btnCenterPlay) {
            btnCenterPlay.classList.remove('is-playing');
            btnCenterPlay.classList.add('is-paused');
        }
        frame1.pause();
    };

    const togglePlay = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    if (btnPlayPause) btnPlayPause.addEventListener('click', togglePlay);
    if (btnCenterPlay) {
        btnCenterPlay.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });
    }
    videoStage.addEventListener('click', (e) => {
        if (e.target.closest('.video-center-play')) return;
        togglePlay();
    });

    // Toggle do filtro anti-sombra
    if (btnToggleShadow) {
        let shadowActive = true;
        btnToggleShadow.addEventListener('click', () => {
            shadowActive = !shadowActive;
            btnToggleShadow.classList.toggle('is-active', shadowActive);
            frame1.style.filter = shadowActive ? 'none' : 'brightness(0.7) contrast(0.85)';
        });
    }

    // Controle da timeline
    if (videoTimeline) {
        videoTimeline.addEventListener('click', (e) => {
            const rect = videoTimeline.getBoundingClientRect();
            const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            if (frame1.duration) {
                frame1.currentTime = clickPos * frame1.duration;
            } else {
                updateTimeDisplay(clickPos * totalDuration, totalDuration);
            }
        });
    }

    // Tela cheia
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (videoPlayer.requestFullscreen) {
                    videoPlayer.requestFullscreen();
                } else if (videoPlayer.webkitRequestFullscreen) {
                    videoPlayer.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });
    }

    play();
}
