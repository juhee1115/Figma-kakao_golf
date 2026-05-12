// ===== 인트로 슬라이더 (480px) =====
const introSlider480 = document.getElementById("480slider-1");
const introImages480 = Array.from(introSlider480.querySelectorAll("img"));
const pageBars480 = document.querySelectorAll(".slider-intro1 .page-bar");
let introIndex480 = 1;
let isIntroTransitioning480 = false;
let introTimer480 = null;

function initIntroSlider480() {
  introSlider480.style.display = "flex";
  introImages480.forEach((img) => {
    img.style.minWidth = "100%";
    img.style.objectFit = "cover";
  });
  const firstClone = introImages480[0].cloneNode(true);
  const lastClone = introImages480[introImages480.length - 1].cloneNode(true);
  introSlider480.appendChild(firstClone);
  introSlider480.insertBefore(lastClone, introImages480[0]);
  introSlider480.style.transition = "none";
  introSlider480.style.transform = `translateX(-${introIndex480 * 100}%)`;
  updatePageBar480();
}

function updatePageBar480() {
  const realIndex = (introIndex480 - 1 + introImages480.length) % introImages480.length;
  pageBars480.forEach((bar, i) => {
    bar.classList.remove("active");
    if (i === realIndex) {
      void bar.offsetWidth;
      bar.classList.add("active");
    }
  });
}

function nextIntroSlide480() {
  if (isIntroTransitioning480) return;
  isIntroTransitioning480 = true;
  introIndex480++;
  introSlider480.style.transition = "transform 0.6s ease-in-out";
  introSlider480.style.transform = `translateX(-${introIndex480 * 100}%)`;
  updatePageBar480();
}

introSlider480.addEventListener("transitionend", () => {
  const totalSlides = introImages480.length + 2;
  if (introIndex480 === totalSlides - 1) {
    introSlider480.style.transition = "none";
    introIndex480 = 1;
    introSlider480.style.transform = `translateX(-${introIndex480 * 100}%)`;
  }
  if (introIndex480 === 0) {
    introSlider480.style.transition = "none";
    introIndex480 = totalSlides - 2;
    introSlider480.style.transform = `translateX(-${introIndex480 * 100}%)`;
  }
  isIntroTransitioning480 = false;
});

pageBars480.forEach((bar) => {
  bar.addEventListener("click", () => {
    const index = parseInt(bar.dataset.index);
    introIndex480 = index + 1;
    introSlider480.style.transition = "transform 0.6s ease-in-out";
    introSlider480.style.transform = `translateX(-${introIndex480 * 100}%)`;
    updatePageBar480();
    clearInterval(introTimer480);
    introTimer480 = setInterval(nextIntroSlide480, SLIDE_INTERVAL);
  });
});

initIntroSlider480();
introTimer480 = setInterval(nextIntroSlide480, SLIDE_INTERVAL);