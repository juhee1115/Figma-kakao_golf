

// 날짜 탭
const tabs = document.querySelectorAll('.bottom-title a');
const today = new Date();
const days = ['일', '월', '화', '수', '목', '금', '토'];

tabs.forEach((tab, index) => {
  const date = new Date(today);
  date.setDate(today.getDate() + index);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = days[date.getDay()];

  if (index === 0) tab.textContent = '오늘';
  else if (index === 1) tab.textContent = '내일';
  else tab.textContent = `${month}/${day}(${dayName})`;
});

// 잔여현황 색상
const timeLis = document.querySelectorAll('.bottom-time li');

timeLis.forEach((li) => {
  const pText = li.querySelector('p').textContent;

  if (pText === '마감') {
    li.classList.add('soldout');
  } else {
    const count = parseInt(pText.replace('잔여', '').replace('팀', ''));
    if (count <= 2) {
      li.classList.add('imminent');
    } else {
      li.classList.add('available');
    }
  }
});