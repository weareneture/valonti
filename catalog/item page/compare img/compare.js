document.addEventListener('DOMContentLoaded', () => {
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.querySelectorAll('[data-compare]').forEach(wrapper => {
    const divider = wrapper.querySelector('[data-divider]');
    const afterImage = wrapper.querySelector('.compare__image--after');
    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    const setPosition = (clientX) => {
        const rect = wrapper.getBoundingClientRect();
        const deltaX = clientX - startX;
        const deltaPercent = (deltaX / rect.width) * 100;
        const newPercent = clamp(startLeft + deltaPercent, 0, 100);
        
        afterImage.style.setProperty('--position', `${newPercent}%`);
        divider.style.left = `${newPercent}%`;
    };

    const start = (event) => {
        event.preventDefault();
        isDragging = true;
        
        const rect = wrapper.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        
        // Сохраняем начальную точку касания
        startX = clientX;
        
        // Получаем текущую позицию из CSS переменной
        const currentPosition = afterImage.style.getPropertyValue('--position');
        startLeft = currentPosition ? parseFloat(currentPosition) : 50;
        
        // Не устанавливаем позицию сразу, чтобы избежать прыжка
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