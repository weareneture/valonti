document.addEventListener('DOMContentLoaded', () => {
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

document.querySelectorAll('[data-compare]').forEach(wrapper => {
    const divider = wrapper.querySelector('[data-divider]');
    const afterImage = wrapper.querySelector('.compare__image--after');
    let isDragging = false;
    let initialTouchX = 0;
    let initialPercent = 0;

    const setPosition = (clientX) => {
    const rect = wrapper.getBoundingClientRect();
    const percent = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
        
    afterImage.style.setProperty('--position', `${percent}%`);
    divider.style.left = `${percent}%`;
    };

    const start = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const rect = wrapper.getBoundingClientRect();
        
        // Сохраняем начальную точку касания
        initialTouchX = clientX;
        
        // Получаем текущую позицию divider через getBoundingClientRect
        // Это более надежно, чем CSS переменная
        const dividerRect = divider.getBoundingClientRect();
        const dividerCenterX = dividerRect.left + dividerRect.width / 2;
        const currentX = dividerCenterX - rect.left;
        initialPercent = clamp((currentX / rect.width) * 100, 0, 100);
        
    isDragging = true;
        
        // НЕ меняем позицию при start - это предотвращает прыжок
    };

    const move = (event) => {
    if (!isDragging) return;
        event.preventDefault();
        event.stopPropagation();
        
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const rect = wrapper.getBoundingClientRect();
        
        // Вычисляем смещение от начальной точки
        const deltaX = clientX - initialTouchX;
        const deltaPercent = (deltaX / rect.width) * 100;
        const newPercent = clamp(initialPercent + deltaPercent, 0, 100);
        
        afterImage.style.setProperty('--position', `${newPercent}%`);
        divider.style.left = `${newPercent}%`;
    };

    const end = (event) => {
        if (isDragging) {
            event.preventDefault();
            event.stopPropagation();
        }
        isDragging = false;
    };

    divider.addEventListener('mousedown', start);
    divider.addEventListener('touchstart', start, { passive: false });
    document.addEventListener('mousemove', move, { passive: false });
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);
    document.addEventListener('touchcancel', end);
});
});