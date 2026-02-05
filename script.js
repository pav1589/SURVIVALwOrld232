// Копирование IP
function copyIP() {
    const ip = document.getElementById('server-ip').textContent;
    navigator.clipboard.writeText(ip);
    
    // Визуальный фидбек
    const btn = document.querySelector('.connect-btn');
    const original = btn.textContent;
    btn.textContent = 'IP скопирован!';
    btn.style.background = '#4CAF50';
    
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
    }, 2000);
}

// Анимация появления
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Авто-обновление онлайн (заглушка)
    setInterval(() => {
        const online = Math.floor(Math.random() * 8) + 12;
        document.querySelector('.hero-subtitle').innerHTML = 
            `Minecraft 1.20.1 • Ванильное выживание • Онлайн: ${online}/20`;
    }, 30000);
});