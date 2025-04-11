// Pantalla de carga
document.addEventListener('DOMContentLoaded', () => {
    // Simular tiempo de carga
    setTimeout(() => {
        const loader = document.querySelector('.loader-container');
        loader.classList.add('hidden');
        
        // Eliminar el loader del DOM después de la transición
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2500); // 2.5 segundos de pantalla de carga
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animar las barras del menú
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
}

// Animación al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .project-card, .testimonial');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Inicializar animación al cargar la página
setTimeout(animateOnScroll, 500);

// Slider de testimonios
const initTestimonialSlider = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!testimonials.length || !dots.length) return;
    
    let currentIndex = 0;
    
    // Función para mostrar un testimonio específico
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };
    
    // Mostrar el primer testimonio
    showTestimonial(currentIndex);
    
    // Event listeners para los botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Event listeners para los puntos
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showTestimonial(currentIndex);
        });
    });
    
    // Cambio automático cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
};

// Inicializar el slider cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// Efecto de partículas en la sección CTA
const createParticles = () => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamaño aleatorio
        const size = Math.random() * 5 + 1;
        
        // Velocidad aleatoria
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;
        
        // Aplicar estilos
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        // Añadir al contenedor
        particlesContainer.appendChild(particle);
        
        // Animar la partícula
        let x = posX;
        let y = posY;
        
        const animateParticle = () => {
            x += speedX * 0.1;
            y += speedY * 0.1;
            
            // Mantener dentro del contenedor
            if (x < 0 || x > 100) x = posX;
            if (y < 0 || y > 100) y = posY;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            requestAnimationFrame(animateParticle);
        };
        
        animateParticle();
    }
};

// Inicializar partículas cuando el documento esté listo
document.addEventListener('DOMContentLoaded', createParticles);

// Efecto de navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 5%';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 5%';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animación para los enlaces del navbar
const navbarLinks = document.querySelectorAll('.nav-links a');
navbarLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Añadir clase active al enlace actual
const currentPage = window.location.pathname.split('/').pop();
navbarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});