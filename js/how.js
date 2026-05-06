window.addEventListener('load', () => {
  const steps = document.querySelectorAll('.how-step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold:0.3
  });

  steps.forEach(step => observer.observe(step));
});