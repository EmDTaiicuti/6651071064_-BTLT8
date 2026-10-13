'use strict';

const menuToggle = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Mở menu' : 'Đóng menu');
  mobileMenu.classList.toggle('open', !isOpen);
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Mở menu');
    mobileMenu.classList.remove('open');
  });
});

document.querySelectorAll('.media-frame img').forEach((image) => {
  const showImage = () => image.parentElement.classList.add('has-image');
  image.addEventListener('load', showImage);
  if (image.complete && image.naturalWidth > 0) showImage();
});

document.querySelector('#orderForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#customerName').value.trim();
  document.querySelector('#formMessage').textContent = `Cảm ơn ${name}! Bếp sẽ sớm gọi xác nhận đơn bánh.`;
  event.currentTarget.reset();
});
