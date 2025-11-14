// GitHub Button Drag Functionality + Random Rotation Movement
document.addEventListener('DOMContentLoaded', function() {
  const githubBtn = document.getElementById('github-btn');
  
  if (!githubBtn) return;

  let isPressed = false;
  let offsetX = 0;
  let offsetY = 0;
  let autoMoveInterval = null;
  let rotationAngle = 0;

  // Função para mover o botão para posição aleatória com rotação suave
  function moveToRandomPositionWithRotation() {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const randomRotation = Math.floor(Math.random() * 360);
    
    githubBtn.style.left = randomX + 'px';
    githubBtn.style.top = randomY + 'px';
    githubBtn.style.right = 'auto';
    githubBtn.style.bottom = 'auto';
    
    // Rotação suave
    githubBtn.style.transition = 'left 2s ease-in-out, top 2s ease-in-out, transform 2s ease-in-out';
    githubBtn.style.transform = `rotate(${randomRotation}deg)`;
  }

  // Inicia movimento aleatório a cada 8 segundos
  function startAutoMove() {
    autoMoveInterval = setInterval(moveToRandomPositionWithRotation, 8000);
    // Primeira movimento imediato
    moveToRandomPositionWithRotation();
  }

  // Para o movimento aleatório
  function stopAutoMove() {
    if (autoMoveInterval) {
      clearInterval(autoMoveInterval);
      autoMoveInterval = null;
    }
  }

  // Inicia movimento automático ao carregar
  startAutoMove();

  // Mouse events
  githubBtn.addEventListener('mousedown', function(e) {
    isPressed = true;
    githubBtn.classList.add('dragging');
    stopAutoMove(); // Para movimento automático ao arrastar
    githubBtn.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    githubBtn.style.transform = 'rotate(0deg)';
    
    const rect = githubBtn.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (!isPressed) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    // Limita dentro da viewport
    const limitX = Math.max(0, Math.min(x, window.innerWidth - 100));
    const limitY = Math.max(0, Math.min(y, window.innerHeight - 100));
    
    githubBtn.style.left = limitX + 'px';
    githubBtn.style.top = limitY + 'px';
    githubBtn.style.right = 'auto';
    githubBtn.style.bottom = 'auto';
  });

  document.addEventListener('mouseup', function() {
    isPressed = false;
    githubBtn.classList.remove('dragging');
    startAutoMove(); // Retoma movimento automático
  });

  // Touch events (mobile)
  githubBtn.addEventListener('touchstart', function(e) {
    isPressed = true;
    githubBtn.classList.add('dragging');
    stopAutoMove();
    githubBtn.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    githubBtn.style.transform = 'rotate(0deg)';
    
    const rect = githubBtn.getBoundingClientRect();
    const touch = e.touches[0];
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    
    e.preventDefault();
  });

  document.addEventListener('touchmove', function(e) {
    if (!isPressed) return;
    
    const touch = e.touches[0];
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;
    
    const limitX = Math.max(0, Math.min(x, window.innerWidth - 100));
    const limitY = Math.max(0, Math.min(y, window.innerHeight - 100));
    
    githubBtn.style.left = limitX + 'px';
    githubBtn.style.top = limitY + 'px';
    githubBtn.style.right = 'auto';
    githubBtn.style.bottom = 'auto';
    
    e.preventDefault();
  });

  document.addEventListener('touchend', function() {
    isPressed = false;
    githubBtn.classList.remove('dragging');
    startAutoMove();
  });
});