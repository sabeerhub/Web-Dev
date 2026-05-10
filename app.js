/**
 * SABEER — PREMIUM MOTION SYSTEM
 * Principles: Orchestration, Physicality, Pacing, Precision
 */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initSmoothScroll();
    initPhysicalCursor();
    initMagneticInteractions();
    initSectionAnimations();
    initMarquee();
    initProjectParallax();
});

/**
 * 1. Cinematic Loader
 */
function initLoader() {
    const tl = gsap.timeline();

    tl.to('.loader-logo', {
        opacity: 1,
        y: -10,
        duration: 1,
        ease: 'power3.out'
    })
    .to('.loader-progress', {
        width: '100%',
        duration: 2.5,
        ease: 'expo.inOut'
    }, '-=0.5')
    .to('.loader', {
        yPercent: -100,
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: () => {
            document.body.classList.remove('is-loading');
            initHeroEntrance();
        }
    });
}

/**
 * 2. Smooth Scrolling (Lenis)
 */
function initSmoothScroll() {
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

    // Sync ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

/**
 * 3. Physical Cursor
 */
function initPhysicalCursor() {
    const dot = document.querySelector('.cursor-dot');
    const aura = document.querySelector('.cursor-aura');
    const system = document.querySelector('.cursor-system');
    if (!dot || !aura || !system) return;

    // Initially hide cursor to avoid top-left flicker
    gsap.set(system, { opacity: 0 });

    window.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;

        // Show on first move
        if (gsap.getProperty(system, "opacity") === 0) {
            gsap.to(system, { opacity: 1, duration: 0.3 });
        }

        gsap.to(dot, {
            x, y,
            duration: 0.1,
            ease: 'none'
        });

        gsap.to(aura, {
            x: x - 16,
            y: y - 16,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // Interaction states
    const hoverables = document.querySelectorAll('a, button, .glass-material');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(aura, {
                scale: 2.5,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.1)',
                duration: 0.4
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(aura, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,0.3)',
                duration: 0.4
            });
        });
    });
}

/**
 * 4. Hero Entrance Timeline
 */
function initHeroEntrance() {
    const titleLines = document.querySelectorAll('.hero-heading .line');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.from('.glass-nav', {
        y: -100,
        opacity: 0,
        duration: 1.5
    })
    .from(titleLines, {
        y: 200,
        skewY: 10,
        duration: 2,
        stagger: 0.15
    }, '-=1')
    .from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 1.2
    }, '-=1.5')
    .from('.hero-meta p', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1
    }, '-=1.2')
    .from('.scroll-line', {
        scaleY: 0,
        duration: 1.5
    }, '-=1');

    // Hero parallax on scroll
    gsap.to('.hero-main', {
        yPercent: 30,
        scrollTrigger: {
            trigger: '.hero-wrap',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

/**
 * 5. Section Reveal Choreography
 */
function initSectionAnimations() {
    // Reveal Headings
    const splitHeadings = document.querySelectorAll('.split-text');
    splitHeadings.forEach(heading => {
        const split = new SplitType(heading, { types: 'lines' });
        gsap.from(split.lines, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
            }
        });
    });

    // Reveal Paragraphs
    const revealParas = document.querySelectorAll('.reveal-text');
    revealParas.forEach(para => {
        gsap.from(para, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: para,
                start: 'top 85%',
            }
        });
    });

    // Experience Items Reveal
    const expItems = document.querySelectorAll('.exp-item');
    expItems.forEach(item => {
        gsap.from(item, {
            x: -40,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            }
        });
    });

    // Skills Bento Reveal
    gsap.from('.skill-tile', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.skills-grid-bento',
            start: 'top 85%',
        }
    });
}

/**
 * 6. Magnetic Interactions
 */
function initMagneticInteractions() {
    const magneticElements = document.querySelectorAll('.btn-magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.3,
                ease: 'power1.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/**
 * 7. Project Parallax & Reveal
 */
function initProjectParallax() {
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        const speed = item.getAttribute('data-speed') || 0.1;
        gsap.to(item, {
            y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

/**
 * 8. Infinite Testimonial Marquee
 */
function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;

    gsap.to(track, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1
    });

    track.addEventListener('mouseenter', () => {
        gsap.to(track, { timeScale: 0.2, duration: 0.6 });
    });

    track.addEventListener('mouseleave', () => {
        gsap.to(track, { timeScale: 1, duration: 0.6 });
    });
}
