class Animations {
    constructor() {
        this.initScrollTrigger();
        this.initHoverEffects();
    }

    initScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('.section').forEach((section, i) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // Animate skill items
        gsap.from('.skill-items span', {
            scrollTrigger: {
                trigger: '.skills',
                start: 'top center'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });

        // Animate project cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.project-grid',
                start: 'top center'
            },
            opacity: 0,
            y: 100,
            stagger: 0.2,
            duration: 1,
            ease: 'power4.out'
        });
    }

    initHoverEffects() {
        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Social links hover effect
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}
