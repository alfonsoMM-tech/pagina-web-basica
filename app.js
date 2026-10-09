/**
 * app.js - Lógica interactiva para la web romántica de Renata & Alfonso
 * 1 Año y 9 Meses Juntos 💕
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('💖 Web romántica para Renata inicializada con amor.');

  // =========================================================================
  // 1. Contador de Tiempo Juntos en Vivo (1 Año y 9 Meses = 21 Meses)
  // =========================================================================
  // Fecha calculada de inicio: hace 1 año y 9 meses

const startDate = new Date(2025, 0, 10, 0, 0, 0);

function updateAnniversaryCounter() {
    const current = new Date();

    let months =
        (current.getFullYear() - startDate.getFullYear()) * 12 +
        (current.getMonth() - startDate.getMonth());

    let anniversary = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + months,
        startDate.getDate()
    );

    if (current < anniversary) {
        months--;
        anniversary = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + months,
            startDate.getDate()
        );
    }

    const remainderMs = current - anniversary;

    const days = Math.floor(remainderMs / 86400000);
    const hours = Math.floor((remainderMs / 3600000) % 24);
    const minutes = Math.floor((remainderMs / 60000) % 60);
    const seconds = Math.floor((remainderMs / 1000) % 60);

    document.getElementById('count-months').textContent = months;
    document.getElementById('count-days').textContent =
        String(days).padStart(2, '0');
    document.getElementById('count-hours').textContent =
        String(hours).padStart(2, '0');
    document.getElementById('count-mins').textContent =
        String(minutes).padStart(2, '0');
    document.getElementById('count-secs').textContent =
        String(seconds).padStart(2, '0');
}

updateAnniversaryCounter();
setInterval(updateAnniversaryCounter, 1000);

  // =========================================================================
  // 2. Música de Fondo: WOS - "Alma Dinamita" en bucle (YouTube + Local)
  // =========================================================================
  let ytPlayer = null;
  let isPlaying = true;
  const musicDisc = document.getElementById('music-disc');
  const musicIcon = document.getElementById('music-icon');
  const btnToggleMusic = document.getElementById('btn-toggle-music');
  const musicPrompt = document.getElementById('music-start-prompt');
  const localAudio = document.getElementById('local-audio');

  function updateMusicUI(playing) {
    isPlaying = playing;
    if (playing) {
      if (musicDisc) musicDisc.classList.add('spinning');
      if (musicIcon) musicIcon.textContent = '⏸';
      if (musicPrompt) musicPrompt.style.display = 'none';
    } else {
      if (musicDisc) musicDisc.classList.remove('spinning');
      if (musicIcon) musicIcon.textContent = '▶';
    }
  }

  // Carga de YouTube IFrame API
  window.onYouTubeIframeAPIReady = function() {
    ytPlayer = new YT.Player('yt-audio-player', {
      height: '1',
      width: '1',
      videoId: 'c3aN6Tv4WLA', // WOS - ALMA DINAMITA
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: 'c3aN6Tv4WLA',
        controls: 0,
        playsinline: 1
      },
      events: {
        onReady: (event) => {
          console.log('🎵 Reproductor WOS listo');
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.PLAYING) {
            updateMusicUI(true);
          } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
            updateMusicUI(false);
          }
        }
      }
    });
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  function startMusic() {
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.playVideo();
        updateMusicUI(true);
      } catch (e) {
        console.warn('Error al iniciar YT player:', e);
      }
    } else if (localAudio) {
      localAudio.play().then(() => updateMusicUI(true)).catch(() => {});
    }
  }

  function pauseMusic() {
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try {
        ytPlayer.pauseVideo();
        updateMusicUI(false);
      } catch (e) {}
    } else if (localAudio) {
      localAudio.pause();
      updateMusicUI(false);
    }
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }

  if (btnToggleMusic) btnToggleMusic.addEventListener('click', toggleMusic);
  if (musicPrompt) musicPrompt.addEventListener('click', startMusic);

  // Reproducir automáticamente al primer toque de la usuaria en pantalla
  let userInteracted = false;
  function handleFirstInteraction() {
    if (!userInteracted && !isPlaying) {
      userInteracted = true;
      startMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    }
  }
  document.addEventListener('click', handleFirstInteraction, { once: true });
  document.addEventListener('touchstart', handleFirstInteraction, { once: true });

  // =========================================================================
  // 3. Actividad 1: Tarjetas Volteables (Flip Cards)
  // =========================================================================
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', (e) => {
      card.classList.toggle('is-flipped');
      if (navigator.vibrate) navigator.vibrate(25);
      createTapHeart(e.clientX || (e.touches && e.touches[0].clientX), e.clientY || (e.touches && e.touches[0].clientY));
    });
  });

  // =========================================================================
  // 4. Actividad 2: Rasca-Rasca Virtual (Scratchcard con Canvas)
  // =========================================================================
  const canvas = document.getElementById('scratch-canvas');
  const progressBar = document.getElementById('scratch-progress');
  const statusText = document.getElementById('scratch-status-text');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let isRevealed = false;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Dibujar textura brillante / oro rosa
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#fbcfe8');
      gradient.addColorStop(0.5, '#f472b6');
      gradient.addColorStop(1, '#fda4af');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Destellos decorativos
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mensaje de invitación a raspar
      ctx.font = 'bold 16px "Outfit", sans-serif';
      ctx.fillStyle = '#881337';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ Raspa aquí con tu dedito ✨', canvas.width / 2, canvas.height / 2);
    }

    // Inicializar canvas al cargar
    setTimeout(resizeCanvas, 150);
    window.addEventListener('resize', () => {
      if (!isRevealed) resizeCanvas();
    });

    function scratch(x, y) {
      if (isRevealed) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();

      checkScratchPercentage();
    }

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const coords = getCoords(e);
      scratch(coords.x, coords.y);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const coords = getCoords(e);
      scratch(coords.x, coords.y);
    });

    window.addEventListener('mouseup', () => { isDrawing = false; });

    // Soporte táctil para móvil
    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      const coords = getCoords(e);
      scratch(coords.x, coords.y);
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const coords = getCoords(e);
      scratch(coords.x, coords.y);
    }, { passive: true });

    canvas.addEventListener('touchend', () => { isDrawing = false; });

    // Cálculo de porcentaje raspado
    let throttleCheck = null;
    function checkScratchPercentage() {
      if (throttleCheck || isRevealed) return;
      throttleCheck = setTimeout(() => {
        throttleCheck = null;
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          let transparentCount = 0;
          const totalPixels = pixels.length / 4;

          // Muestrear cada 4 píxeles para máxima fluidez
          for (let i = 3; i < pixels.length; i += 16) {
            if (pixels[i] === 0) {
              transparentCount += 4;
            }
          }

          const percent = Math.min(100, Math.round((transparentCount / totalPixels) * 100));
          if (progressBar) progressBar.style.width = percent + '%';

          if (percent >= 45 && !isRevealed) {
            isRevealed = true;
            canvas.style.transition = 'opacity 0.6s ease';
            canvas.style.opacity = '0';
            setTimeout(() => { canvas.style.display = 'none'; }, 600);
            if (statusText) statusText.textContent = '🎉 ¡Felicidades! Sorpresa desbloqueada';
            launchHeartConfetti(50);
            if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
          }
        } catch (e) {}
      }, 100);
    }
  }

  // =========================================================================
  // 5. Actividad 3: Cuadro de Mensajes (Galleta de la Fortuna / Regalo)
  // =========================================================================
  const btnGift = document.getElementById('btn-gift');
  const giftIcon = document.getElementById('gift-icon');
  const fortuneText = document.getElementById('fortune-text');

  const romanticMessages = [
    'Cada vez que sonríes, mi mundo entero tiene sentido.',
    'Amo cómo se siente abrazarte y encajar exactamente contigo.',
    'Eres mi persona favorita en todo el universo entero.',
    'Gracias por llenar estos 21 meses de tantas risas y amor sincero.',
    'No cambiaría ni un solo segundo de nuestra historia a tu lado.',
    'Me encanta tu carita hermosa, tus ojitos y tu forma tan tierna de mirarme.',
    'Eres mi hogar, mi paz y mi mayor motivación todos los días.',
    'Contigo aprendí lo que significa amar bonito y sin miedo.',
    'Ya quiero celebrar nuestro segundo año juntos, mi niña.',
    'Te elegiría a ti en esta y en mil vidas más, Renata.',
    'Tu voz es mi sonido favorito cuando he tenido un día difícil.',
    'Admiro tu fuerza, tu inteligencia y tu corazón tan noble.',
    'Eres el sueño más lindo del que nunca quiero despertar.',
    'Si supieras lo feliz que me haces con un simple mensaje tuyo...',
    'Para siempre tú y yo, de la mano y contra todo. Te amo.'
  ];

  let currentMsgIndex = 0;

  if (btnGift && fortuneText) {
    btnGift.addEventListener('click', (e) => {
      if (giftIcon) {
        giftIcon.classList.add('shake');
        setTimeout(() => giftIcon.classList.remove('shake'), 600);
      }

      // Animación suave del texto
      fortuneText.style.opacity = '0';
      setTimeout(() => {
        currentMsgIndex = (currentMsgIndex + 1) % romanticMessages.length;
        fortuneText.textContent = romanticMessages[currentMsgIndex];
        fortuneText.style.opacity = '1';
      }, 250);

      createTapHeart(e.clientX, e.clientY);
      if (navigator.vibrate) navigator.vibrate(30);
    });
  }

  // =========================================================================
  // 6. Actividad 4: Botón de Emergencia "¿Me extrañas?" y Modal
  // =========================================================================
  const btnMissYou = document.getElementById('btn-miss-you');
  const modalMissYou = document.getElementById('modal-miss-you');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalLove = document.getElementById('btn-modal-love');

  function openMissModal() {
    if (modalMissYou) {
      modalMissYou.classList.add('active');
      modalMissYou.setAttribute('aria-hidden', 'false');
      launchHeartConfetti(60);
      if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
    }
  }

  function closeMissModal() {
    if (modalMissYou) {
      modalMissYou.classList.remove('active');
      modalMissYou.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnMissYou) btnMissYou.addEventListener('click', openMissModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeMissModal);
  if (btnModalLove) {
    btnModalLove.addEventListener('click', () => {
      launchHeartConfetti(80);
      closeMissModal();
    });
  }

  // Cerrar al tocar fuera del modal
  if (modalMissYou) {
    modalMissYou.addEventListener('click', (e) => {
      if (e.target === modalMissYou) closeMissModal();
    });
  }

  // =========================================================================
  // 7. Sistema de Confeti de Corazones (Canvas Partículas)
  // =========================================================================
  const confettiCanvas = document.getElementById('hearts-canvas');
  let confettiCtx = null;
  let particles = [];

  if (confettiCanvas) {
    confettiCtx = confettiCanvas.getContext('2d');

    function resizeConfetti() {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
    resizeConfetti();
    window.addEventListener('resize', resizeConfetti);
  }

  function launchHeartConfetti(count = 40) {
    if (!confettiCtx) return;
    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#e11d48', '#fbbf24'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 100,
        y: window.innerHeight * 0.6,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 15 - 8,
        size: Math.random() * 18 + 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 60 + 80
      });
    }

    if (!isAnimatingConfetti) {
      isAnimatingConfetti = true;
      requestAnimationFrame(renderConfetti);
    }
  }

  let isAnimatingConfetti = false;
  function renderConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravedad suave
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.life++;

      const progress = p.life / p.maxLife;
      p.opacity = Math.max(0, 1 - progress);

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);
      confettiCtx.globalAlpha = p.opacity;
      confettiCtx.fillStyle = p.color;
      confettiCtx.font = `${p.size}px serif`;
      confettiCtx.textAlign = 'center';
      confettiCtx.textBaseline = 'middle';
      confettiCtx.fillText('❤️', 0, 0);
      confettiCtx.restore();

      if (p.life >= p.maxLife || p.y > window.innerHeight) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(renderConfetti);
    } else {
      isAnimatingConfetti = false;
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // =========================================================================
  // 8. Efecto de Corazón al Tocar la Pantalla (Tap Heart)
  // =========================================================================
  function createTapHeart(x, y) {
    if (!x || !y) return;
    const heart = document.createElement('div');
    heart.className = 'floating-tap-heart';
    const emojis = ['💖', '💕', '✨', '🌸', '🌷', '❤️'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1200);
  }

  document.addEventListener('click', (e) => {
    // Si no es un botón ni canvas de raspado, lanzar corazoncito
    if (!e.target.closest('#scratch-canvas') && !e.target.closest('.modal-close-btn')) {
      createTapHeart(e.clientX, e.clientY);
    }
  });

  // =========================================================================
  // 9. Generador de Corazones Ambientales Suaves de Fondo
  // =========================================================================
  const bgContainer = document.getElementById('hearts-bg');
  if (bgContainer) {
    const bgIcons = ['🤍', '🌸', '✨', '💕', '🌷'];
    for (let i = 0; i < 15; i++) {
      const el = document.createElement('div');
      el.className = 'bg-heart-item';
      el.textContent = bgIcons[Math.floor(Math.random() * bgIcons.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.animationDelay = `${Math.random() * 12}s`;
      el.style.fontSize = `${Math.random() * 14 + 14}px`;
      bgContainer.appendChild(el);
    }
  }
});
