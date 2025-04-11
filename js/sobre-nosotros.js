// Funcionalidad para la página Sobre Nosotros
document.addEventListener('DOMContentLoaded', () => {
    // Animación de números en estadísticas
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const targetValue = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const startTime = Date.now();
            const startValue = 0;
            
            const updateNumber = () => {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    const easedProgress = easeOutQuad(progress);
                    const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);
                    
                    stat.textContent = currentValue;
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = targetValue;
                }
            };
            
            // Función de easing para una animación más natural
            const easeOutQuad = t => t * (2 - t);
            
            // Iniciar animación cuando el elemento sea visible
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
    };
    
    // Animación al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.value-card, .team-member, .timeline-item');
        
        elements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    };
    
    // Inicializar animaciones
    animateStats();
    animateOnScroll();
    
    // Añadir estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .value-card, .team-member, .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .value-card.animate, .team-member.animate, .timeline-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(30px);
        }
        
        .timeline-item:nth-child(odd) {
            transform: translateX(-30px);
        }
        
        .timeline-item.animate:nth-child(even),
        .timeline-item.animate:nth-child(odd) {
            transform: translateX(0);
        }
        
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        .timeline-item:nth-child(4) { transition-delay: 0.4s; }
        .timeline-item:nth-child(5) { transition-delay: 0.5s; }
        .timeline-item:nth-child(6) { transition-delay: 0.6s; }
        
        .value-card:nth-child(1) { transition-delay: 0.1s; }
        .value-card:nth-child(2) { transition-delay: 0.2s; }
        .value-card:nth-child(3) { transition-delay: 0.3s; }
        .value-card:nth-child(4) { transition-delay: 0.4s; }
        
        .team-member:nth-child(1) { transition-delay: 0.1s; }
        .team-member:nth-child(2) { transition-delay: 0.2s; }
        .team-member:nth-child(3) { transition-delay: 0.3s; }
        .team-member:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
    
    // Efecto parallax en la imagen de historia
    const storyImage = document.querySelector('.story-image');
    if (storyImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const offset = scrollPosition * 0.1;
            
            if (isElementInViewport(storyImage)) {
                storyImage.style.transform = `translateY(${offset}px)`;
            }
        });
    }
    
    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});