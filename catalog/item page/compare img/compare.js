document.addEventListener('DOMContentLoaded', () => {
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.querySelectorAll('[data-compare]').forEach(wrapper => {
    const divider = wrapper.querySelector('[data-divider]');
    const afterImage = wrapper.querySelector('.compare__image--after');
    let isDragging = false;
    let offsetX = 0;

    const setPosition = (clientX) => {
        const rect = wrapper.getBoundingClientRect();
        const x = clientX - rect.left - offsetX;
        const percent = clamp((x / rect.width) * 100, 0, 100);
        afterImage.style.setProperty('--position', `${percent}%`);
        divider.style.left = `${percent}%`;
    };

    const start = (event) => {
        event.preventDefault();
        isDragging = true;
        
        const rect = wrapper.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        
        // Вычисляем текущую позицию divider
        const currentPercent = parseFloat(divider.style.left) || 50;
        const currentX = (currentPercent / 100) * rect.width;
        
        // Вычисляем смещение от точки касания до центра divider
        offsetX = clientX - rect.left - currentX;
        
        setPosition(clientX);
    };

    const move = (event) => {
        if (!isDragging) return;
        event.preventDefault();
        
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        setPosition(clientX);
    };

    const end = (event) => {
        if (isDragging) {
            event.preventDefault();
        }
        isDragging = false;
        offsetX = 0;
    };

    divider.addEventListener('mousedown', start);
    divider.addEventListener('touchstart', start, { passive: false });
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);
});
});