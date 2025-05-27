// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Loading overlay
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
    }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        answer.style.maxHeight = '0';
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add intersection observer for enhanced animations
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

// Observe all cards and elements with animations
document.querySelectorAll('.modern-card, .problem-card, .feature-card, .benefit-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to cards
document.querySelectorAll('.modern-card, .problem-card, .feature-card, .benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize tooltips if Bootstrap is available
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Enhanced button interactions
document.querySelectorAll('.btn-modern').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        createEnergyBurst(this);
    });
    
    btn.addEventListener('click', function(e) {
        createParticleExplosion(this);
        
        if (this.href && this.href.includes('#demo')) {
            e.preventDefault();
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Ładowanie...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                console.log('Demo request initiated');
            }, 2000);
        }
    });
});

// Energy burst effect function
function createEnergyBurst(element) {
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, var(--energy-orange), var(--energy-green));
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: energyBurstAnim 0.6s ease-out forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(burst);
    
    setTimeout(() => {
        if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
        }
    }, 600);
}

// Particle explosion effect function
function createParticleExplosion(element) {
    const particles = 12;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particles) * i;
        const velocity = 50 + Math.random() * 50;
        
        particle.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
            width: 4px;
            height: 4px;
            background: var(--energy-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleExplosion 1s ease-out forwards;
        `;
        
        particle.style.setProperty('--angle', `${angle}deg`);
        particle.style.setProperty('--velocity', `${velocity}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Add CSS animations for energy effects
const energyStyles = document.createElement('style');
energyStyles.textContent = `
    @keyframes energyBurstAnim {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
    
    @keyframes particleExplosion {
        0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--velocity));
            opacity: 0;
        }
    }
    
    @keyframes energyFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(energyStyles);

// Enhanced Video Player with Energy Effects
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    const videoContainer = video?.parentElement;
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (video && videoContainer && videoOverlay) {
        // Show overlay on video pause
        video.addEventListener('pause', function() {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
        });
        
        // Hide overlay on video play
        video.addEventListener('play', function() {
            videoOverlay.style.opacity = '0';
            videoOverlay.style.pointerEvents = 'none';
            // Create energy burst effect when video plays
            createEnergyBurst(videoContainer);
        });
        
        // Enhanced video container hover effects
        videoContainer.addEventListener('mouseenter', function() {
            if (video.paused) {
                videoOverlay.style.opacity = '1';
            }
            // Add energy border animation
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 20px 50px rgba(77, 150, 255, 0.3)';
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            if (video.paused) {
                setTimeout(() => {
                    videoOverlay.style.opacity = '0';
                }, 1000);
            }
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        // Energy particle effect on video click
        video.addEventListener('click', function() {
            createParticleExplosion(videoContainer);
        });
        
        // Auto-hide controls after inactivity
        let controlsTimeout;
        video.addEventListener('mousemove', function() {
            this.setAttribute('controls', 'true');
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                if (!this.paused) {
                    this.removeAttribute('controls');
                }
            }, 3000);
        });
        
        // Energy effect on video ended
        video.addEventListener('ended', function() {
            videoOverlay.style.opacity = '1';
            videoOverlay.style.pointerEvents = 'auto';
            createParticleExplosion(videoContainer);
            
            // Show replay message with energy effect
            const replayMessage = document.createElement('div');
            replayMessage.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, var(--energy-blue), var(--energy-purple));
                color: white;
                padding: 15px 25px;
                border-radius: 25px;
                font-weight: 600;
                box-shadow: 0 10px 30px rgba(77, 150, 255, 0.4);
                z-index: 10;
                animation: pulse 2s ease-in-out infinite;
            `;
            replayMessage.innerHTML = '<i class="fas fa-redo me-2"></i>Kliknij aby obejrzeć ponownie';
            videoContainer.appendChild(replayMessage);
            
            setTimeout(() => {
                if (replayMessage.parentNode) {
                    replayMessage.parentNode.removeChild(replayMessage);
                }
            }, 5000);
        });
    }
});

console.log('FIXme Enhanced Website with Video Loaded Successfully! 🚀✨');

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        }, 2000);
    });
    
    // Form validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearFieldError(e);
        
        if (!value) {
            showFieldError(field, 'To pole jest wymagane');
            return false;
        }
        
        // Email validation
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Wprowadź poprawny adres email');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error styling
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = 'color: #dc3545; font-size: 12px; margin-top: 5px; font-weight: 500;';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    function clearFieldError(e) {
        const field = e.target;
        const formGroup = field.closest('.form-group');
        
        // Remove error styling
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        // Remove error message
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showSuccessMessage() {
        // Create success overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const successBox = document.createElement('div');
        successBox.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        // Set innerHTML for the success box content (excluding the button)
        successBox.innerHTML = `
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #28a745, #20c997); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <i class="fas fa-check" style="font-size: 40px; color: white;"></i>
            </div>
            <h3 style="color: #333; margin-bottom: 15px;">Wiadomość Wysłana!</h3>
            <p style="color: #666; margin-bottom: 25px;">Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.</p>
        `;
        
        // Create and add close button separately
        const closeButton = document.createElement('button');
        closeButton.style.cssText = 'background: linear-gradient(135deg, var(--energy-orange), var(--energy-blue)); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer;';
        closeButton.textContent = 'Zamknij';
        closeButton.addEventListener('click', function() {
            overlay.remove();
        });
        successBox.appendChild(closeButton);

        overlay.className = 'success-overlay';
        overlay.appendChild(successBox);
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            successBox.style.transform = 'scale(1)';
        }, 10);
        
        // Auto close after 5 seconds
        setTimeout(() => {
            overlay.remove();
        }, 5000);
    }
});

// Schedule Demo Function
function scheduleDemo() {
    // Create demo scheduling modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Set innerHTML for the modal content (excluding the button)
    modalContent.innerHTML = `
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--energy-blue), var(--energy-purple)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <i class="fas fa-calendar-alt" style="font-size: 40px; color: white;"></i>
        </div>
        <h3 style="color: #333; margin-bottom: 15px;">Umów Demo</h3>
        <p style="color: #666; margin-bottom: 25px;">Skontaktuj się z nami przez formularz powyżej lub zadzwoń bezpośrednio:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: var(--energy-blue);">
                <i class="fas fa-phone me-2"></i>+48 123 456 789
            </p>
        </div>
    `;

    // Create and add close button separately
    const closeButton = document.createElement('button');
    closeButton.style.cssText = 'background: linear-gradient(135deg, var(--energy-orange), var(--energy-blue)); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer;';
    closeButton.textContent = 'Zamknij';
    closeButton.addEventListener('click', function() {
        modal.remove();
    });
    modalContent.appendChild(closeButton);
    
    modal.className = 'demo-modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
} 