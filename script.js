// Основные анимации и функционал
document.addEventListener('DOMContentLoaded', function() {
    // 1. Анимация чисел в статистике
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                setTimeout(updateNumber, 30);
            } else {
                stat.textContent = target;
            }
        };
        
        // Запуск при появлении в viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });

    // 2. Копирование IP
    window.copyIP = function() {
        const ip = document.getElementById('server-ip').textContent.trim();
        navigator.clipboard.writeText(ip).then(() => {
            const icon = document.querySelector('.copy-icon');
            const original = icon.className;
            icon.className = 'fas fa-check';
            setTimeout(() => {
                icon.className = original;
            }, 2000);
            
            // Визуальный фидбек
            const ipDisplay = document.getElementById('server-ip');
            ipDisplay.style.background = 'rgba(0, 255, 136, 0.2)';
            setTimeout(() => {
                ipDisplay.style.background = '';
            }, 1000);
        });
    };

    // 3. Копирование API ключа
    window.copyAPI = function() {
        const apiKey = 'sk-150a4968bf95495984f8b19f7f4bf629';
        navigator.clipboard.writeText(apiKey).then(() => {
            const btn = document.querySelector('.copy-api-btn i');
            const original = btn.className;
            btn.className = 'fas fa-check';
            setTimeout(() => {
                btn.className = original;
            }, 2000);
        });
    };

    // 4. Обновление онлайн-статуса
    function updateOnlineStatus() {
        // Симуляция реального онлайн (замени на реальный API)
        const online = Math.floor(Math.random() * 5) + 10;
        document.getElementById('online-count').textContent = online;
        
        // Обновление времени
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
        document.getElementById('server-time').textContent = 'Время сервера: ' + timeString;
    }
    
    // Обновлять каждые 30 секунд
    updateOnlineStatus();
    setInterval(updateOnlineStatus, 30000);

    // 5. Счётчик посетителей
    let visitorCount = 1024;
    setInterval(() => {
        visitorCount += Math.floor(Math.random() * 3);
        document.getElementById('visitor-count').textContent = 'Посетителей: ' + visitorCount;
    }, 60000);

    // 6. Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.slide-up, .slide-left, .slide-right, .scale-in, .flip-in, .rotate-in, .fade-in');
    
    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        appearOnScroll.observe(element);
    });

    // 7. Кнопка наверх
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 8. Плавная прокрутка по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновление активного пункта меню
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // 9. Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'rgba(10, 10, 15, 0.95)';
                navMenu.style.backdropFilter = 'blur(10px)';
                navMenu.style.padding = '2rem';
                navMenu.style.borderBottom = '1px solid rgba(0, 255, 136, 0.2)';
            }
        });
    }

    // 10. Система частиц для фона
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 255, 136, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            // Анимация движения
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s infinite linear`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // 11. Изменение цвета заголовка при скролле
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (scrolled > 50) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(10, 10, 15, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // 12. Авто-обновление демо-чата
    const chatMessages = document.querySelector('.chat-messages');
    const demoMessages = [
        "Как сделать автоматическую ферму?",
        "Какие команды есть у админов?",
        "Сервер лагает, что делать?",
        "Как получить доступ к командным блокам?",
        "Можно ли сделать свой мини-игру?"
    ];
    
    const aiResponses = [
        "Используйте наблюдатель и поршни для автоматической фермы.",
        "Админы имеют доступ к /gamemode, /tp, /give и другим командам.",
        "Попробуйте уменьшить рендер-дистанцию и отключить моды.",
        "Командные блоки доступны в творческом режиме для админов.",
        "Да, можно создать мини-игру с помощью командных блоков и области."
    ];
    
    let messageIndex = 0;
    
    function addDemoMessage() {
        if (chatMessages && messageIndex < demoMessages.length) {
            // Сообщение пользователя
            const userMsg = document.createElement('div');
            userMsg.className = 'message user';
            userMsg.innerHTML = `
                <div class="avatar">И</div>
                <div class="content">${demoMessages[messageIndex]}</div>
            `;
            chatMessages.appendChild(userMsg);
            
            // Ответ ИИ
            setTimeout(() => {
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai';
                aiMsg.innerHTML = `
                    <div class="avatar">AI</div>
                    <div class="content">${aiResponses[messageIndex]}</div>
                `;
                chatMessages.appendChild(aiMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                messageIndex++;
                if (messageIndex >= demoMessages.length) {
                    messageIndex = 0;
                }
            }, 1000);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Добавлять сообщение каждые 10 секунд
    setInterval(addDemoMessage, 10000);

    // 13. Изменение темы (день/ночь)
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 6 && hour < 18) {
        // Дневная тема
        body.style.setProperty('--dark', '#f0f0f0');
        body.style.setProperty('--light', '#1a1a2e');
        body.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
    }

    // 14. Случайные факты о сервере
    const facts = [
        "Сервер работает с 2023 года",
        "На сервере построено 47 крупных сооружений",
        "Рекорд онлайн: 18 игроков одновременно",
        "Общий игровой мир: 5000x5000 блоков",
        "В базе знаний AI: 1000+ команд Minecraft"
    ];
    
    function showRandomFact() {
        const fact = facts[Math.floor(Math.random() * facts.length)];
        console.log(`📢 Факт о сервере: ${fact}`);
    }
    
    // Показывать факт каждые 60 секунд
    setInterval(showRandomFact, 60000);

    // 15. Эффект параллакса для героя
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // 16. Таймер до следующего ивента
    function updateEventTimer() {
        const eventTime = new Date();
        eventTime.setHours(20, 0, 0, 0); // Ивент в 20:00
        
        if (new Date() > eventTime) {
            eventTime.setDate(eventTime.getDate() + 1);
        }
        
        const diff = eventTime - new Date();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        const timerElement = document.getElementById('event-timer');
        if (timerElement) {
            timerElement.textContent = `Следующий ивент через: ${hours}ч ${minutes}м`;
        }
    }
    
    // Создаем элемент таймера если его нет
    const eventTimer = document.createElement('div');
    eventTimer.id = 'event-timer';
    eventTimer.style.position = 'fixed';
    eventTimer.style.bottom = '70px';
    eventTimer.style.right = '20px';
    eventTimer.style.background = 'rgba(0, 255, 136, 0.2)';
    eventTimer.style.color = 'var(--accent)';
    eventTimer.style.padding = '0.5rem 1rem';
    eventTimer.style.borderRadius = '10px';
    eventTimer.style.fontSize = '0.9rem';
    eventTimer.style.zIndex = '999';
    document.body.appendChild(eventTimer);
    
    updateEventTimer();
    setInterval(updateEventTimer, 60000);

    // 17. Анимация для карточек админов при наведении
    document.querySelectorAll('.admin-card-main, .admin-card-tech, .admin-card-regular, .admin-card-junior').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 18. Система уведомлений
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 1.5rem';
        notification.style.borderRadius = '10px';
        notification.style.background = type === 'success' ? 'rgba(0, 255, 136, 0.9)' : 
                                       type === 'error' ? 'rgba(255, 85, 85, 0.9)' : 
                                       'rgba(85, 85, 255, 0.9)';
        notification.style.color = 'white';
        notification.style.zIndex = '10000';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 19. Загрузка реального онлайн с сервера (пример)
    async function fetchRealOnline() {
        try {
            // Здесь должен быть реальный API запрос
            // const response = await fetch('https://api.mcsrvstat.us/2/ваш-сервер');
            // const data = await response.json();
            // const online = data.players.online;
            
            // Для примера используем случайное число
            const online = Math.floor(Math.random() * 5) + 10;
            document.getElementById('online-count').textContent = online;
            
            // Показываем уведомление при изменении онлайн
            const oldOnline = parseInt(localStorage.getItem('lastOnline') || online);
            if (Math.abs(online - oldOnline) >= 3) {
                showNotification(`Онлайн изменился: ${oldOnline} → ${online} игроков`, 'info');
            }
            localStorage.setItem('lastOnline', online);
            
        } catch (error) {
            console.log('Не удалось получить онлайн сервера');
        }
    }
    
    // Обновлять онлайн каждые 60 секунд
    setInterval(fetchRealOnline, 60000);
    fetchRealOnline();

    // 20. Интерактивная карта (если есть)
    const mapIframe = document.querySelector('.map-frame');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            console.log('Карта сервера загружена');
        });
    }

    console.log('🚀 Survival Server website loaded successfully!');
});

// Отслеживание ошибок загрузки
window.addEventListener('error', function(e) {
    console.error('Ошибка загрузки:', e.message);
});

// Анимация загрузки
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});
