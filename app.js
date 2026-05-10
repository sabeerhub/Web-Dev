/**
 * SABEER — Cinematic Motion Engine
 * Powered by GSAP, Lenis, and Physical Principles
 */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initPreloader();
    initNavigation();
    initHeroParallax();
    initSectionReveals();
    initProductHover();
    initExpertiseInteraction();
    initMarquee();
    initCustomCursor();
});

/* 1. Smooth Scroll Engine (Lenis) */
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

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

/* 2. Orchestrated Preloader */
function initPreloader() {
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('is-loading');
            initEntranceSequence();
        }
    });

    tl.to('.loader-branding', { opacity: 1, duration: 1, ease: 'power2.out' })
      .to('.loader-track', { width: '100%', duration: 1.5, ease: 'expo.inOut' }, '-=0.5')
      .to('.loader-meta', { opacity: 1, duration: 0.8 }, '-=1')
      .to('.product-loader', {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut',
          delay: 0.5
      });
}

/* 3. Hero Entrance Sequence */
function initEntranceSequence() {
    const tl = gsap.timeline();

    // Split text for cinematic reveal
    const heroTitle = new SplitType('.hero-title', { types: 'lines, words' });
    const heroDesc = new SplitType('.hero-description p', { types: 'lines' });

    tl.from('.nav-frame', {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out'
    })
    .from(heroTitle.words, {
        y: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 1.5,
        ease: 'expo.out'
    }, '-=0.8')
    .from('.hero-tag', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
    }, '-=1.2')
    .from(heroDesc.lines, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out'
    }, '-=1')
    .from('.hero-scroll', {
        opacity: 0,
        y: 20,
        duration: 1
    }, '-=0.5');

    // Scroll Indicator Animation
    gsap.to('.scroll-thumb', {
        y: '100%',
        repeat: -1,
        duration: 1.5,
        ease: 'power2.inOut'
    });
}

/* 4. Navigation Dynamics */
function initNavigation() {
    let lastScroll = 0;
    const nav = document.querySelector('.nav-interface');
    const navFrame = document.querySelector('.nav-frame');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.transform = currentScroll > lastScroll ? 'translateY(-150%)' : 'translateY(0)';
            navFrame.style.background = 'rgba(10, 10, 10, 0.8)';
            navFrame.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.transform = 'translateY(0)';
            navFrame.style.background = 'transparent';
            navFrame.style.backdropFilter = 'none';
        }
        lastScroll = currentScroll;
    });
}

/* 5. Section Motion Systems */
function initSectionReveals() {
    const sections = document.querySelectorAll('.section-xl');

    sections.forEach(section => {
        const heading = section.querySelector('.label-heading');
        const content = section.querySelectorAll('.editorial-h3, .p-large, .showcase-item, .exp-tile, .journal-item');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        if (heading) {
            tl.from(heading, { opacity: 0, x: -20, duration: 1 });
        }

        tl.from(content, {
            opacity: 0,
            y: 40,
            stagger: 0.1,
            duration: 1.2,
            ease: 'expo.out'
        }, '-=0.5');
    });
}

/* 6. Physical Hover Effects */
function initProductHover() {
    if (window.innerWidth < 1024) return; // Disable physical tilt on mobile for better performance

    const items = document.querySelectorAll('.showcase-item');

    items.forEach(item => {
        const visual = item.querySelector('.visual-inner');

        item.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = item.getBoundingClientRect();

            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            gsap.to(visual, {
                rotateY: x * 10,
                rotateX: -y * 10,
                transformPerspective: 1000,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(visual, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/* 7. Expertise Interaction */
function initExpertiseInteraction() {
    const tiles = document.querySelectorAll('.exp-tile');

    tiles.forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* 8. Infinite Marquee */
function initMarquee() {
    const inner = document.querySelector('.marquee-inner');
    if (!inner) return;

    gsap.to(inner, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: 'none'
    });
}

/* 9. Custom Cursor System */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-pointer');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: () => {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            gsap.set(follower, {
                css: {
                    left: posX - 24,
                    top: posY - 24
                }
            });

            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover states
    const interactive = document.querySelectorAll('a, button, .showcase-item, .exp-tile');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 0,
                duration: 0.3
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderWidth: 1,
                duration: 0.3
            });
        });
    });
}

/* 10. Hero Parallax */
function initHeroParallax() {
    gsap.to('.ls-1', {
        scrollTrigger: {
            trigger: '.hero-interface',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        x: -100
    });

    gsap.to('.ls-2', {
        scrollTrigger: {
            trigger: '.hero-interface',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        },
        y: -150,
        x: 100
    });
}
