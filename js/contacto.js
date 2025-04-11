// Validación del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validar nombre
            if (name === '') {
                showError('name', 'Por favor, ingresa tu nombre');
                isValid = false;
            } else {
                removeError('name');
            }
            
            // Validar email
            if (email === '') {
                showError('email', 'Por favor, ingresa tu correo electrónico');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Por favor, ingresa un correo electrónico válido');
                isValid = false;
            } else {
                removeError('email');
            }
            
            // Validar asunto
            if (subject === '') {
                showError('subject', 'Por favor, ingresa el asunto');
                isValid = false;
            } else {
                removeError('subject');
            }
            
            // Validar mensaje
            if (message === '') {
                showError('message', 'Por favor, ingresa tu mensaje');
                isValid = false;
            } else {
                removeError('message');
            }
            
            // Si todo es válido, enviar el formulario
            if (isValid) {
                // Aquí normalmente enviarías el formulario a Formspree
                // Para esta demo, simularemos el envío
                
                // Mostrar mensaje de carga
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = 'Enviando...';
                submitBtn.disabled = true;
                
                // Simular envío (reemplazar con el envío real a Formspree)
                setTimeout(() => {
                    // Mostrar mensaje de éxito
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h3>¡Mensaje enviado con éxito!</h3>
                            <p>Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.</p>
                            <button class="btn btn-primary" onclick="window.location.reload()">Enviar otro mensaje</button>
                        </div>
                    `;
                }, 2000);
            }
        });
    }
    
    // Función para mostrar errores
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Eliminar mensaje de error existente si hay
        removeError(inputId);
        
        // Añadir clase de error al input
        input.classList.add('error');
        
        // Añadir mensaje de error después del input
        input.parentNode.appendChild(errorElement);
    }
    
    // Función para eliminar errores
    function removeError(inputId) {
        const input = document.getElementById(inputId);
        const errorElement = input.parentNode.querySelector('.error-message');
        
        if (errorElement) {
            input.parentNode.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Añadir estilos para mensajes de error y éxito
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ff6584 !important;
        }
        
        .error-message {
            color: #ff6584;
            font-size: 0.85rem;
            margin-top: 5px;
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
        }
        
        .success-icon {
            width: 60px;
            height: 60px;
            color: #4CAF50;
            margin: 0 auto 20px;
            display: block;
        }
        
        .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--dark-color);
        }
        
        .success-message p {
            margin-bottom: 25px;
            color: var(--text-light);
        }
    `;
    document.head.appendChild(style);
});