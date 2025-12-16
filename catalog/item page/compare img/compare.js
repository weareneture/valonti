document.addEventListener('DOMContentLoaded', () => {
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.querySelectorAll('[data-compare]').forEach(wrapper => {
    const divider = wrapper.querySelector('[data-divider]');
    const afterImage = wrapper.querySelector('.compare__image--after');
    let isDragging = false;

    const setPosition = (clientX) => {
    const rect = wrapper.getBoundingClientRect();
    const percent = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    afterImage.style.setProperty('--position', `${percent}%`);
    divider.style.left = `${percent}%`;
    };

    const start = (event) => {
    isDragging = true;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    setPosition(clientX);
    };

    const move = (event) => {
    if (!isDragging) return;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    setPosition(clientX);
    };

    const end = () => { isDragging = false; };

    divider.addEventListener('mousedown', start);
    divider.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
});
});