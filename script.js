// Elementos del DOM
const navigation = document.getElementById('navigation');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const sakuraContainer = document.getElementById('sakura-container');
const particlesCanvas = document.getElementById('particles-canvas');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sakura particles system
class SakuraParticle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = -10;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 6 + 4;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.element = this.createElement();
        this.animationDuration = Math.random() * 3 + 5;
        this.animationDelay = Math.random() * 2;
    }

    createElement() {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        petal.style.left = this.x + 'px';
        petal.style.width = this.size + 'px';
        petal.style.height = this.size + 'px';
        petal.style.opacity = this.opacity;
        petal.style.animationDuration = this.animationDuration + 's';
        petal.style.animationDelay = this.animationDelay + 's';
        return petal;
    }

    spawn() {
        sakuraContainer.appendChild(this.element);
        
        // Remove particle after animation
        setTimeout(() => {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, (this.animationDuration + this.animationDelay) * 1000);
    }
}

// Create sakura particles más lento
function createSakuraParticle() {
    const particle = new SakuraParticle();
    particle.spawn();
}

// Spawn sakura particles menos frecuentemente
setInterval(createSakuraParticle, 800);

// Hero particles canvas
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resizeCanvas();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y) {
        this.particles.push({
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 100,
            maxLife: 100,
            size: Math.random() * 3 + 1
        });
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            
            // Create gradient
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, '#f97316');
            gradient.addColorStop(1, '#ea580c');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system if canvas exists
if (particlesCanvas) {
    const particleSystem = new ParticleSystem(particlesCanvas);
    
    // Create particles menos frecuentemente
    setInterval(() => {
        const x = Math.random() * particlesCanvas.width;
        const y = Math.random() * particlesCanvas.height;
        particleSystem.createParticle(x, y);
    }, 200);
}

// Portfolio filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter portfolio cards
        portfolioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message (you can replace this with actual form submission)
        alert('¡Mensaje enviado! Te contactaremos pronto. ありがとうございます！');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer para animaciones más suaves
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .team-card, .portfolio-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 1s ease, transform 1s ease';
    observer.observe(el);
});

// Add stagger animation to service cards con más delay
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Add stagger animation to team cards con más delay
document.querySelectorAll('.team-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.3}s`;
});

// Add stagger animation to portfolio cards con más delay
document.querySelectorAll('.portfolio-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Parallax effect for floating circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    document.querySelectorAll('.floating-circle').forEach((circle, index) => {
        const speed = 0.5 + (index * 0.1);
        circle.style.transform = `translateY(${rate * speed}px)`;
    });
});

// Add smooth hover effects to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-white').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Hero particles interaction
if (particlesCanvas) {
    particlesCanvas.addEventListener('mousemove', (e) => {
        const rect = particlesCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create particles on mouse move
        if (window.particleSystem) {
            window.particleSystem.createParticle(x, y);
        }
    });
}

// Service card hover sound effect (optional)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle bounce animation
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Team card social button animations
document.querySelectorAll('.team-social button').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

// Portfolio card hover effects
document.querySelectorAll('.portfolio-card').forEach(card => {
    const overlay = card.querySelector('.portfolio-overlay');
    const actions = card.querySelector('.portfolio-actions');
    
    card.addEventListener('mouseenter', () => {
        if (overlay) overlay.style.opacity = '1';
        if (actions) actions.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        if (overlay) overlay.style.opacity = '0';
        if (actions) actions.style.opacity = '0';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 200) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect cuando la página carga con más delay
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 250);
        }, 2000);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f97316, #ea580c);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add easter egg - konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        console.log('🌸 Konami Code activated! KODAKASOFT says こんにちは! 🌸');
        konamiCode = [];
    }
});

// Form validation enhancement
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearError(e);
        
        if (!value) {
            showError(field, 'Este campo es requerido');
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showError(field, 'Por favor ingresa un email válido');
        }
    }
    
    function showError(field, message) {
        field.style.borderColor = '#ef4444';
        
        let errorDiv = field.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }
    
    function clearError(e) {
        const field = e.target;
        field.style.borderColor = '';
        
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// Initialize form validation
enhanceFormValidation();

console.log('🌸 KODAKASOFT website loaded successfully! 🌸');
console.log('Made with ❤️ and Japanese precision');

// Mejorar manejo del menú móvil
function handleMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    let isMenuOpen = false;

    function toggleMenu(event) {
        event.stopPropagation(); // Prevenir propagación del evento
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Añadir/remover clase para el botón
        if (isMenuOpen) {
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // Event listener para el botón de menú
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu({ stopPropagation: () => {} });
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMenu({ stopPropagation: () => {} });
        }
    });

    // Evitar que clicks dentro del menú cierren el menú
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMenu({ stopPropagation: () => {} });
        }
    });

    // Escape key para cerrar el menú
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu({ stopPropagation: () => {} });
        }
    });
}

// Inicializar el menú móvil
document.addEventListener('DOMContentLoaded', handleMobileMenu);

// Ejecutar optimizaciones móviles
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);