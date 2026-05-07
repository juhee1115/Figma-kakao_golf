$(function () {
  const counters = document.querySelectorAll('.counter');

  function getThreshold() {
    const width = window.innerWidth;
    if (width <= 380) return 0.1;
    if (width <= 768) return 0.3;
    if (width >= 1920) return 0.7;
    return 0.5;
  }

  function animateCounter(target) {
    const $this = $(target);

    // 이미 실행됐으면 스킵
    if ($this.data('animated')) return;
    $this.data('animated', true);

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
  }

  function createObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animateCounter(entry.target);
      });
    }, {
      threshold: getThreshold()
    });

    counters.forEach((counter) => {
      // 이미 애니메이션 된 건 다시 등록 안 함
      if (!$(counter).data('animated')) {
        observer.observe(counter);
      }
    });

    return observer;
  }

  let observer = createObserver();

  // 리사이즈 시 observer 재생성
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      observer.disconnect();
      observer = createObserver();
    }, 300);
  });
});