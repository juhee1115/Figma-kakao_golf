$(function () {
  const counters = document.querySelectorAll('.counter');

  function getThreshold() {
    const width = window.innerWidth;
    if (width <= 380) return 0.1;       // 소형 모바일: 10%만 보여도 실행
    if (width <= 768) return 0.3;       // 모바일: 30%
    if (width >= 1920) return 0.7;      // 대형 모니터: 70%
    return 0.5;                          // 일반 PC: 50%
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const $this = $(entry.target);
      const countTo = $this.attr('data-count');
      const $span = $this.find('span');

      $({ countNum: 0 }).animate({
        countNum: countTo
      }, {
        duration: 3000,
        easing: 'linear',
        step: function () {
          $this.contents().first().replaceWith(Math.floor(this.countNum).toLocaleString());
          $this.append($span);
        },
        complete: function () {
          $this.contents().first().replaceWith(Number(this.countNum).toLocaleString());
          $this.append($span);
        }
      });
    });
  }, {
    threshold: getThreshold()
  });

  counters.forEach((counter) => observer.observe(counter));
});