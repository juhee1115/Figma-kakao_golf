// ===== 헤더 배경 슬라이더 (페이드) =====
const slider = document.getElementById("slider");
const images = Array.from(slider.querySelectorAll("img"));
let currentIndex = 0;
let isFading = false;

function initSlider() {
  // 이미지들을 절대위치로 겹쳐 쌓기
  images.forEach((img, i) => {
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = i === 0 ? "1" : "0"; // 첫 번째만 보이게
    img.style.transition = "opacity 1.2s ease-in-out";
  });
}

function nextSlide() {
  if (isFading) return;
  isFading = true;

  const prevIndex = currentIndex;
  currentIndex = (currentIndex + 1) % images.length;

  images[prevIndex].style.opacity = "0"; // 현재 이미지 사라짐
  images[currentIndex].style.opacity = "1"; // 다음 이미지 나타남

  setTimeout(() => {
    isFading = false;
  }, 1200); // transition 시간과 동일하게
}

initSlider();
setInterval(nextSlide, 3000);

// ===== 인트로 슬라이더 =====
const introSlider = document.getElementById("slider-1");
const introImages = Array.from(introSlider.querySelectorAll("img"));
const pageBars = document.querySelectorAll(".page-bar");
let introIndex = 1;
let isIntroTransitioning = false;
let introTimer = null;
const SLIDE_INTERVAL = 3000; // 슬라이드 간격 (ms)

function initIntroSlider() {
  introSlider.style.display = "flex";
  introImages.forEach((img) => {
    img.style.minWidth = "100%";
    img.style.objectFit = "cover";
  });

  const firstClone = introImages[0].cloneNode(true);
  const lastClone = introImages[introImages.length - 1].cloneNode(true);
  introSlider.appendChild(firstClone);
  introSlider.insertBefore(lastClone, introImages[0]);

  introSlider.style.transition = "none";
  introSlider.style.transform = `translateX(-${introIndex * 100}%)`;

  updatePageBar();
}


function updatePageBar() {
  const realIndex = (introIndex - 1 + introImages.length) % introImages.length;
  pageBars.forEach((bar, i) => {
    bar.classList.remove("active"); // 애니메이션 리셋
    if (i === realIndex) {
      // 강제 리플로우 — 애니메이션 재시작을 위해
      void bar.offsetWidth;
      bar.classList.add("active");
    }
  });
}

function goToSlide(index) {
  if (isIntroTransitioning) return;
  isIntroTransitioning = true;

  introIndex = index + 1;
  introSlider.style.transition = "transform 0.6s ease-in-out";
  introSlider.style.transform = `translateX(-${introIndex * 100}%)`;
  updatePageBar();
}

function nextIntroSlide() {
  if (isIntroTransitioning) return;
  isIntroTransitioning = true;

  introIndex++;
  introSlider.style.transition = "transform 0.6s ease-in-out";
  introSlider.style.transform = `translateX(-${introIndex * 100}%)`;
  updatePageBar();
}

introSlider.addEventListener("transitionend", () => {
  const totalSlides = introImages.length + 2;

  if (introIndex === totalSlides - 1) {
    introSlider.style.transition = "none";
    introIndex = 1;
    introSlider.style.transform = `translateX(-${introIndex * 100}%)`;
  }
  if (introIndex === 0) {
    introSlider.style.transition = "none";
    introIndex = totalSlides - 2;
    introSlider.style.transform = `translateX(-${introIndex * 100}%)`;
  }

  isIntroTransitioning = false;
});

pageBars.forEach((bar) => {
  bar.addEventListener("click", () => {
    const index = parseInt(bar.dataset.index);
    goToSlide(index);

    clearInterval(introTimer);
    introTimer = setInterval(nextIntroSlide, SLIDE_INTERVAL);
  });
});

initIntroSlider();
introTimer = setInterval(nextIntroSlide, SLIDE_INTERVAL);


