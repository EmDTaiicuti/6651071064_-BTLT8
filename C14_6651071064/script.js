'use strict';

const toggle = document.querySelector('#themeToggle');
const label = document.querySelector('#themeLabel');
const stage = document.querySelector('#sceneStage');
const image = document.querySelector('#sceneImage');
const title = document.querySelector('#sceneTitle');
const description = document.querySelector('#sceneDescription');

function paintScene() {
  const isMorning = toggle.checked;
  const nextImage = isMorning ? 'images/Morning.png' : 'images/Evening.jpg';

  document.body.classList.toggle('dark-theme', !isMorning);
  stage.classList.toggle('is-changing', image.getAttribute('src') !== nextImage);
  stage.dataset.scene = isMorning ? 'morning' : 'evening';
  label.textContent = isMorning ? 'Sáng' : 'Tối';
  toggle.setAttribute('aria-label', `Bật chế độ buổi ${isMorning ? 'sáng' : 'tối'}`);
  title.textContent = isMorning ? 'Chào ngày mới' : 'Đèn trong nhà đã bật';
  description.textContent = isMorning
    ? 'Ánh sáng dịu nhẹ của buổi sáng.'
    : 'Ánh đèn ấm áp dần sáng lên trong đêm.';

  if (image.getAttribute('src') === nextImage) {
    stage.classList.remove('is-changing');
    return;
  }

  window.setTimeout(() => {
    image.onload = () => stage.classList.remove('is-changing');
    image.onerror = () => stage.classList.remove('is-changing');
    image.src = nextImage;
  }, 150);
}

toggle.addEventListener('change', paintScene);
paintScene();
