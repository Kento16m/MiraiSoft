// Funcionalidad para la página de proyectos
document.addEventListener('DOMContentLoaded', () => {
    // Filtrado de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filtrar proyectos
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Añadir animación
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        // Ocultar después de la animación
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Modal de proyecto
    const modalLinks = document.querySelectorAll('.btn-view-project');
    const modals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Abrir modal al hacer clic en el enlace
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Evitar scroll en el body
                
                // Animación de entrada
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.opacity = '1';
                    modal.querySelector('.modal-content').style.transform = 'translateY(0)';
                }, 10);
            }
        });
    });
    
    // Cerrar modal al hacer clic en el botón de cierre
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-modal');
            
            // Animación de salida
            modal.querySelector('.modal-content').style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            
            // Ocultar después de la animación
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restaurar scroll en el body
            }, 300);
        });
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                // Animación de salida
                modal.querySelector('.modal-content').style.opacity = '0';
                modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
                
                // Ocultar después de la animación
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Restaurar scroll en el body
                }, 300);
            }
        });
    });
    
    // Cambiar imagen principal al hacer clic en miniaturas
    const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
    
    galleryThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Actualizar clase activa
            galleryThumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Cambiar imagen principal
            const mainImage = this.closest('.modal-gallery').querySelector('img:first-child');
            mainImage.src = this.src.replace('150x100', '800x500');
            
            // Animación de cambio
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });
    
    // Añadir estilos para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .project-item {
            transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .modal-content {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .modal-gallery > img {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});