/**
 * DELTA_VERSE | Core Interactions
 */

// Prevent browser from restoring previous scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top and remove hash on load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});

function init() {
    initScrollAnimations();
    initVideoVolumeToggle();
    initSlideshow();
    initWipSlideshows();
    initMobileMenu();
    initHireFormToggle();
    initFooterYear();
    initActiveNavHighlight();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * Custom Cursor Logic
 */
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if device supports hover (desktop vs mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Hide custom cursor on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move dot instantly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Animate outline with a slight delay for a smooth trailing effect
    function animate() {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .tech-stack li');
    
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(0, 245, 255, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class to animate again on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Typewriter Effect for Hero Title
 */
function initTypewriterEffect() {
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    const fullText = "Delta_Verse";
    // Set up HTML structure for typing and cursor
    titleEl.innerHTML = '<span class="type-text"></span><span class="type-cursor" style="opacity: 1; animation: blink 1s infinite;">|</span>';
    const textEl = titleEl.querySelector('.type-text');
    
    let isDeleting = false;
    let txt = '';

    function type() {
        let typingSpeed = 120;

        if (isDeleting) {
            txt = fullText.substring(0, txt.length - 1);
            typingSpeed = 50; 
        } else {
            txt = fullText.substring(0, txt.length + 1);
            typingSpeed = 100 + Math.random() * 50; // Realistic typing variance
        }

        textEl.textContent = txt;

        let delay = typingSpeed;

        if (!isDeleting && txt === fullText) {
            // Oscillate after 30 seconds
            delay = 30000; 
            isDeleting = true;
        } else if (isDeleting && txt === '') {
            isDeleting = false;
            delay = 1000; 
        }

        setTimeout(type, delay);
    }

    // Start typing after initial load animations
    setTimeout(type, 1200);
}

/**
 * Video Volume Toggle Control
 */
function initVideoVolumeToggle() {
    const video = document.getElementById('profile-video');
    const toggleBtn = document.getElementById('volume-toggle');
    const iconMuted = document.getElementById('icon-muted');
    const iconUnmuted = document.getElementById('icon-unmuted');

    if (!video || !toggleBtn) return;

    // Set initial browser volume state
    video.volume = 1.0;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click bubble conflicts
        if (video.muted) {
            video.muted = false;
            video.volume = 1.0; // Ensure it isn't zero
            iconMuted.style.display = 'none';
            iconUnmuted.style.display = 'block';
        } else {
            video.muted = true;
            iconMuted.style.display = 'block';
            iconUnmuted.style.display = 'none';
        }
    });
}

/**
 * Image Slideshow Logic (with cinematic Ken Burns support)
 */
function initSlideshow() {
    const slideshows = document.querySelectorAll('.project-slideshow');

    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        if (slides.length <= 1) return;

        const isCinematic = slideshow.classList.contains('cinematic');
        const interval = isCinematic ? 5000 : 3000;
        let currentIndex = 0;

        function goToSlide(nextIndex) {
            const current = slides[currentIndex];
            const next = slides[nextIndex];

            if (isCinematic) {
                // Add leaving class for push-back exit on outgoing slide
                current.classList.add('leaving');
                current.classList.remove('active');

                // Force reflow so Ken Burns animation restarts on incoming slide
                next.style.animation = 'none';
                next.offsetHeight; // trigger reflow
                next.style.animation = '';
                next.classList.add('active');

                // Clean up leaving class after transition completes
                setTimeout(() => current.classList.remove('leaving'), 1600);
            } else {
                current.classList.remove('active');
                next.classList.add('active');
            }

            currentIndex = nextIndex;
        }

        setInterval(() => {
            goToSlide((currentIndex + 1) % slides.length);
        }, interval);
    });
}


/**
 * WIP Projects Dynamic Slideshow System
 */
function initWipSlideshows() {
    const slideshowWrappers = document.querySelectorAll('.wip-slideshow-wrapper');
    
    slideshowWrappers.forEach(wrapper => {
        const slides = wrapper.querySelectorAll('.wip-slide');
        const leftArrow = wrapper.querySelector('.wip-arrow-left');
        const rightArrow = wrapper.querySelector('.wip-arrow-right');
        const dotsContainer = wrapper.querySelector('.wip-slide-dots');
        
        if (slides.length <= 1) return;
        
        let currentIndex = 0;
        let timer = null;
        
        // Create dots if dots container exists
        if (dotsContainer) {
            dotsContainer.innerHTML = ''; // clear any static content
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('wip-slide-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dotsContainer.appendChild(dot);
                
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(index);
                });
            });
        }
        
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.wip-slide-dot') : [];
        
        function updateSlides() {
            if (timer) clearTimeout(timer);
            
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                    if (dots[index]) dots[index].classList.add('active');
                    
                    // If video slide
                    if (slide.tagName.toLowerCase() === 'video') {
                        slide.currentTime = 0;
                        slide.play().catch(err => console.log("Video auto-play prevented:", err));
                        
                        // When video ends, advance to next slide
                        slide.onended = () => {
                            nextSlide();
                        };
                    } else {
                        // Image slide: auto advance after 3 seconds
                        timer = setTimeout(nextSlide, 3000);
                    }
                } else {
                    slide.classList.remove('active');
                    if (dots[index]) dots[index].classList.remove('active');
                    
                    if (slide.tagName.toLowerCase() === 'video') {
                        slide.pause();
                        slide.onended = null;
                    }
                }
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
        }
        
        // Set up arrow event listeners
        if (leftArrow) {
            leftArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }
        
        // Initial setup
        updateSlides();
    });
}

/**
 * Mobile Hamburger Menu Overlay & Interaction
 */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburgerBtn || !mobileMenu) return;

    function toggleMenu() {
        const isOpen = hamburgerBtn.classList.contains('active');
        if (isOpen) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore scroll
        } else {
            hamburgerBtn.classList.add('active');
            mobileMenu.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent scroll under overlay
        }
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when tapping any nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore scroll
        });
    });

    // Close menu when clicking outside the menu (on the overlay container itself)
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            toggleMenu();
        }
    });
}

/**
 * Hire Me — Collapsible Contact Form Toggle
 */
function initHireFormToggle() {
    const toggleBtn = document.getElementById('hire-form-toggle');
    const panel = document.getElementById('hire-form-panel');

    if (!toggleBtn || !panel) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = panel.classList.contains('is-open');

        if (isOpen) {
            panel.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            panel.classList.add('is-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
    });
}

/**
 * Footer Copyright Year
 */
function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
}

/**
 * Active Nav Link Highlighting on Scroll
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}
