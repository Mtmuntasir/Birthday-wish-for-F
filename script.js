const heartWrapper = document.getElementById('heartWrapper');
const wishContent = document.getElementById('wishContent');
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

let isDragging = false;
let startY = 0;

// Pull down gesture detection
heartWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  if (deltaY > 0 && deltaY < 120) {
    heartWrapper.style.transform = `translateY(${deltaY}px)`;
  }
});

window.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const deltaY = e.clientY - startY;
  
  if (deltaY > 60) {
    // Trigger animation state
    heartWrapper.style.opacity = '0';
    setTimeout(() => {
      heartWrapper.style.display = 'none';
      wishContent.classList.add('show');
      growTree();
    }, 300);
  } else {
    heartWrapper.style.transform = 'translateY(0px)';
  }
});

// Canvas Tree Animation with Heart Leaves
function drawTree(startX, startY, len, angle, branchWidth) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = '#5a3d31';
  ctx.fillStyle = '#ff6b81';
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 10) {
    // Draw leaf hearts
    ctx.beginPath();
    ctx.arc(0, -len, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#e64c65';
    ctx.fill();
    ctx.restore();
    return;
  }

  setTimeout(() => {
    drawTree(0, -len, len * 0.75, angle + 15, branchWidth * 0.7);
    drawTree(0, -len, len * 0.75, angle - 15, branchWidth * 0.7);
  }, 50);

  ctx.restore();
}

function growTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(200, 280, 60, 0, 8);
}
