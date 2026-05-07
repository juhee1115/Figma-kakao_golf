window.addEventListener('load', () => {
  const steps = document.querySelectorAll('.how-step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const index = [...steps].indexOf(entry.target);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 200); // 200ms 간격으로 순차 등장

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.3
  });

  steps.forEach(step => observer.observe(step));
});