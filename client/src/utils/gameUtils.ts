// Format numbers with commas for readability
export function formatNumber(num: number): string {
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// Check if player can afford an upgrade
export function canAfford(currentPoints: number, price: number): boolean {
  return currentPoints >= price;
}

// Calculate rebirth cost
export function calculateRebirthCost(rebirthLevel: number): number {
  return 1000 * Math.pow(10, rebirthLevel);
}

// Create click ripple effect element
export function createClickRipple(e: React.MouseEvent<HTMLButtonElement>): void {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.width = '100px';
  ripple.style.height = '100px';
  ripple.style.left = (centerX - 50) + 'px';
  ripple.style.top = (centerY - 50) + 'px';
  
  document.body.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 500);
}
