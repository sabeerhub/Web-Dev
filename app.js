// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initLenis();
    initCursor();
    initLighting();
    initAboutAnimations();
    initSkillsAnimations();
    initProjectsAnimations();
    initExperienceAnimations();
    initMarquee();
    initContactInteractions();
    initMagneticButtons();
    console.log('Sabeer Portfolio Initialized');
});

/**
 * Initialize Loader
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderBar = document.querySelector('.loader-bar');
    const tl = gsap.timeline();

    tl.to(loaderBar, {
        width: '100%',
        duration: 2,
        ease: 'power4.inOut'
    })
    .to(loader, {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: () => {
            loader.style.display = 'none';
            initHeroAnimations();
            gsap.from('.nav-container', {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }
    });
}

/**
 * Initialize Lenis Smooth Scrolling
 */
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/**
 * Initialize Custom Cursor
 */
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');

    if (!dot || !follower) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;

        gsap.to(dot, {
            x: x - 4,
            y: y - 4,
            duration: 0.1
        });

        gsap.to(follower, {
            x: x - 20,
            y: y - 20,
            duration: 0.3
        });
    });

    // Hover effects
    const links = document.querySelectorAll('a, button, .clickable');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.3
            });
        });
    });
}

/**
 * Experience Section Animations
 */
function initExperienceAnimations() {
    const items = document.querySelectorAll('.reveal-timeline');

    items.forEach(item => {
        gsap.from(item, {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });

    // Animate the timeline line growth
    gsap.from('.timeline-line', {
        scaleY: 0,
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
        }
    });
}

/**
 * Testimonials Marquee
 */
function initMarquee() {
    const marquee = document.querySelector('.marquee-content');
    if (!marquee) return;

    gsap.to(marquee, {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1
    });

    marquee.addEventListener('mouseenter', () => {
        gsap.to(marquee, { timeScale: 0.2, duration: 0.5 });
    });

    marquee.addEventListener('mouseleave', () => {
        gsap.to(marquee, { timeScale: 1, duration: 0.5 });
    });
}

/**
 * Contact Form Interactions
 */
/**
 * Magnetic Buttons
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-logo');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const moveX = (x - rect.width / 2) / 3;
            const moveY = (y - rect.height / 2) / 3;

            gsap.to(btn, {
                x: moveX,
                y: moveY,
                duration: 0.3
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

function initContactInteractions() {
    const inputs = document.querySelectorAll('.form-input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3
            });
        });
    });

    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn-primary');
            btn.textContent = 'Sending...';

            setTimeout(() => {
                btn.textContent = 'Message Sent';
                form.reset();
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Projects Section Animations
 */
function initProjectsAnimations() {
    const projects = document.querySelectorAll('.reveal-project');

    projects.forEach(project => {
        gsap.from(project, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: project,
                start: 'top 85%',
            }
        });
    });

    // Custom cursor text on project hover
    const projectContainers = document.querySelectorAll('.project-image-container');
    const follower = document.querySelector('.cursor-follower');

    projectContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                width: 100,
                height: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                duration: 0.5
            });
            follower.innerHTML = '<span style="font-size: 0.6rem; color: white; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">View</span>';
            gsap.set(follower.querySelector('span'), {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                duration: 0.5
            });
            follower.innerHTML = '';
        });
    });
}

/**
 * Skills Section Animations
 */
function initSkillsAnimations() {
    gsap.from('.skill-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
        }
    });

    // Magnetic effect on skill icons
    const icons = document.querySelectorAll('.skill-icon');
    icons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const moveX = (x - rect.width / 2) / 2;
            const moveY = (y - rect.height / 2) / 2;

            gsap.to(icon, {
                x: moveX,
                y: moveY,
                duration: 0.3
            });
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/**
 * About Section Animations
 */
function initAboutAnimations() {
    const revealTexts = document.querySelectorAll('.reveal-text');

    revealTexts.forEach(text => {
        const split = new SplitType(text, { types: 'lines' });

        gsap.from(split.lines, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.from('.stat-item', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
        }
    });
}

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
    const title = new SplitType('.hero-title', { types: 'chars' });
    const description = new SplitType('.hero-description', { types: 'lines' });

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from(title.chars, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
    })
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
    }, '-=1')
    .from(description.lines, {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
    }, '-=0.8')
    .from('.hero-actions .btn-primary, .hero-actions .btn-secondary', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
    }, '-=0.8')
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 1,
    }, '-=0.5');

    // Hero Parallax on Scroll
    gsap.to('.hero-content', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

/**
 * Initialize Mouse-reactive Lighting
 */
function initLighting() {
    const light1 = document.querySelector('.light-1');
    const light2 = document.querySelector('.light-2');

    if (!light1 || !light2) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        const moveX = (x - window.innerWidth / 2) / 20;
        const moveY = (y - window.innerHeight / 2) / 20;

        gsap.to(light1, {
            x: moveX,
            y: moveY,
            duration: 1
        });

        gsap.to(light2, {
            x: -moveX,
            y: -moveY,
            duration: 1
        });
    });
}
