// ===== 이용방법 스텝 애니메이션 =====
const stepCircles = document.querySelectorAll('.step-circle');
let currentStep = 0;

function activateStep(index) {
  // 0~index 까지 모두 활성화
  stepCircles.forEach((circle, i) => {
    circle.classList.toggle('active', i <= index);
  });
}

// 1.5초마다 누적으로 활성화
const stepTimer = setInterval(() => {
  activateStep(currentStep);
  currentStep++;

  // 마지막까지 다 켜지면 잠깐 후 리셋
  if (currentStep >= stepCircles.length) {
    setTimeout(() => {
      currentStep = 0;
      stepCircles.forEach(circle => circle.classList.remove('active'));
    }, 1500);
    clearInterval(stepTimer);

    // 다시 반복 시작
    setTimeout(() => {
      currentStep = 0;
      startStepAnimation();
    }, 3000);
  }
}, 1500);

function startStepAnimation() {
  const timer = setInterval(() => {
    activateStep(currentStep);
    currentStep++;

    if (currentStep >= stepCircles.length) {
      setTimeout(() => {
        currentStep = 0;
        stepCircles.forEach(circle => circle.classList.remove('active'));
      }, 1500);
      clearInterval(timer);

      setTimeout(() => {
        currentStep = 0;
        startStepAnimation();
      }, 3000);
    }
  }, 1500);
}