/**
 * app.js - Lógica interactiva para la aplicación web
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 [NovaWeb] Aplicación inicializada correctamente.');

  // =========================================================================
  // 1. Reloj en vivo y Año en Footer
  // =========================================================================
  const liveClockEl = document.getElementById('live-clock');
  const currentYearEl = document.getElementById('current-year');

  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  function updateClock() {
    if (!liveClockEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    liveClockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // =========================================================================
  // 2. Sistema de Notificaciones Toast
  // =========================================================================
  const toastContainer = document.getElementById('toast-container');
  const notifyBtn = document.getElementById('btn-notify');

  const toastMessages = [
    { icon: '🚀', text: '¡JavaScript y CSS comunicándose al 100%!' },
    { icon: '💡', text: 'Tip: Haz clic en los colores para cambiar el acento.' },
    { icon: '⚡', text: 'Renderizado fluido y sin frameworks pesados.' },
    { icon: '🎉', text: '¡Tu entorno base está funcionando con éxito!' }
  ];

  let toastIndex = 0;

  function showToast(message, icon = '✨') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${icon}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      toast.classList.add('toast-leave');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 3500);
  }

  if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
      const item = toastMessages[toastIndex % toastMessages.length];
      toastIndex++;
      showToast(item.text, item.icon);
    });
  }

  // =========================================================================
  // 3. Contador Interactivo
  // =========================================================================
  let counter = 0;
  const counterValueEl = document.getElementById('counter-value');
  const btnIncrement = document.getElementById('btn-increment');
  const btnDecrement = document.getElementById('btn-decrement');
  const btnReset = document.getElementById('btn-reset');

  function updateCounterDisplay(animate = true) {
    if (!counterValueEl) return;
    counterValueEl.textContent = counter;

    if (animate) {
      counterValueEl.classList.remove('counter-bump');
      // Forzar reflow para reiniciar la animación
      void counterValueEl.offsetWidth;
      counterValueEl.classList.add('counter-bump');
    }
  }

  if (btnIncrement) {
    btnIncrement.addEventListener('click', () => {
      counter++;
      updateCounterDisplay();
    });
  }

  if (btnDecrement) {
    btnDecrement.addEventListener('click', () => {
      counter--;
      updateCounterDisplay();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      counter = 0;
      updateCounterDisplay();
      showToast('Contador reiniciado a 0', '🔄');
    });
  }

  // =========================================================================
  // 4. Selector Dinámico de Color / Tema
  // =========================================================================
  const colorSamples = document.querySelectorAll('.color-sample');
  const btnRandomTheme = document.getElementById('btn-random-theme');

  const presetColors = [
    { primary: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
    { primary: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)' },
    { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
    { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  ];

  function setAccentColor(hexColor) {
    document.documentElement.style.setProperty('--accent-primary', hexColor);
    document.documentElement.style.setProperty('--accent-glow', `${hexColor}55`);

    colorSamples.forEach(sample => {
      if (sample.getAttribute('data-color') === hexColor) {
        sample.classList.add('active');
      } else {
        sample.classList.remove('active');
      }
    });
  }

  colorSamples.forEach(sample => {
    sample.addEventListener('click', () => {
      const color = sample.getAttribute('data-color');
      setAccentColor(color);
      showToast(`Color de acento cambiado a ${color}`, '🎨');
    });
  });

  if (btnRandomTheme) {
    btnRandomTheme.addEventListener('click', () => {
      const randomPreset = presetColors[Math.floor(Math.random() * presetColors.length)];
      setAccentColor(randomPreset.primary);
      showToast('¡Acento aleatorio aplicado!', '🎲');
    });
  }

  // Toast inicial de bienvenida
  setTimeout(() => {
    showToast('¡Bienvenido! La página se cargó correctamente.', '👋');
  }, 500);
});
