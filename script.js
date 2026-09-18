// Smooth-scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Let the hero flashcard be flipped manually with click or keyboard,
// on top of its automatic idle animation.
const flipCard = document.getElementById('flipCard');
if (flipCard) {
  flipCard.setAttribute('role', 'button');
  flipCard.setAttribute('tabindex', '0');
  flipCard.setAttribute('aria-label', 'Sample flashcard. Press to flip between question and answer.');

  const toggleFlip = () => flipCard.classList.toggle('is-flipped-manual');

  flipCard.addEventListener('click', toggleFlip);
  flipCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  });
}
