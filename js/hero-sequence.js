(function () {
  const TOTAL_FRAMES = 192;
  const canvas = document.getElementById('sequenceCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const frames = [];
  let currentFrame = 0;
  let isHovering = false;
  let loadedCount = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(Math.floor(currentFrame));
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    const padIndex = String(i).padStart(3, '0');
    img.src = `assets/sequence/frame_${padIndex}.webp`;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === 1) {
        resizeCanvas();
      }
    };
    frames.push(img);
  }

  function renderFrame(index) {
    if (!frames[index] || !frames[index].complete) return;

    const img = frames[index];
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;

    const nx = cw - nw;
    const ny = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);
  }

  function animateSequence() {
    const speed = 0.32;

    if (isHovering) {
      if (currentFrame < TOTAL_FRAMES - 1) {
        currentFrame = Math.min(TOTAL_FRAMES - 1, currentFrame + speed);
      }
    } else {
      if (currentFrame > 0) {
        currentFrame = Math.max(0, currentFrame - speed);
      }
    }

    renderFrame(Math.floor(currentFrame));
    requestAnimationFrame(animateSequence);
  }

  document.addEventListener('mousemove', (e) => {
    const isInProsthesisZone = e.clientX > window.innerWidth * 0.60 && e.clientY <= window.innerHeight;
    if (isInProsthesisZone) {
      isHovering = true;
    } else {
      isHovering = false;
    }
  });

  document.addEventListener('mouseleave', () => {
    isHovering = false;
  });

  requestAnimationFrame(animateSequence);
})();
