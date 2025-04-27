// TwinSphere - Digital Twins Platform Website JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initTabSystem();
    initCounterAnimation();
    initContactForm();
});

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Highlight active nav item based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            if (scrollTopBtn) scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on page load
}

// Tab system for business plan section
function initTabSystem() {
    const tabs = document.querySelectorAll('.plan-tab');
    const tabContents = document.querySelectorAll('.plan-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Deactivate all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Activate clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Animated counters for statistics
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current).toLocaleString();
            }
        }, 16);
    }
    
    // Intersection Observer to trigger counter animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Validate form data
            let isValid = true;
            const name = formValues.name;
            const email = formValues.email;
            const message = formValues.message;
            
            if (!name || name.trim() === '') {
                showFormError('name', 'Please enter your name');
                isValid = false;
            } else {
                removeFormError('name');
            }
            
            if (!email || !isValidEmail(email)) {
                showFormError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                removeFormError('email');
            }
            
            if (!message || message.trim() === '') {
                showFormError('message', 'Please enter your message');
                isValid = false;
            } else {
                removeFormError('message');
            }
            
            if (isValid) {
                // In a real implementation, you would send the data to a server
                // For now, we'll just show a success message
                contactForm.reset();
                showFormSuccess('Your message has been sent successfully!');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    const successMessage = document.querySelector('.form-success');
                    if (successMessage) {
                        successMessage.remove();
                    }
                }, 5000);
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        let errorElement = field.nextElementSibling;
        
        if (!errorElement || !errorElement.classList.contains('form-error')) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        errorElement.textContent = message;
        field.classList.add('error');
    }
    
    function removeFormError(fieldName) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const errorElement = field.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.remove();
        }
        
        field.classList.remove('error');
    }
    
    function showFormSuccess(message) {
        let successElement = document.querySelector('.form-success');
        
        if (!successElement) {
            successElement = document.createElement('div');
            successElement.className = 'form-success';
            contactForm.parentNode.insertBefore(successElement, contactForm.nextSibling);
        }
        
        successElement.textContent = message;
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    if (!slider || slides.length === 0) return;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    // Show slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize slider
    showSlide(currentSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Navigation buttons
    document.querySelector('.slider-prev').addEventListener('click', () => {
        prevSlide();
    });
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        nextSlide();
    });
}

// FAQ accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}
