export const triggerConfetti = () => {
  // Create confetti elements
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = -10;
    
    // Random size
    const size = Math.random() * 10 + 5;
    
    // Random rotation
    const rotation = Math.random() * 360;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    confetti.style.left = `${posX}px`;
    confetti.style.top = `${posY}px`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.transform = `rotate(${rotation}deg)`;
    
    // Random animation
    const animationDuration = Math.random() * 3 + 2;
    const animationDelay = Math.random() * 5;
    
    confetti.style.animation = `confetti-fall ${animationDuration}s linear ${animationDelay}s forwards`;
    
    // Add to body
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, (animationDuration + animationDelay) * 1000);
  }
};

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
  @keyframes confetti-fall {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(calc(100vh + 10px)) rotate(360deg);
      opacity: 0;
    }
  }
`;

document.head.appendChild(style);
