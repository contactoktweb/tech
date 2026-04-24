/* ============================================
   FANGAN TECH S.A.S - Main JavaScript
   Tecnología que Transforma
   Advanced Animations & Interactions
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-cta');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // Intersection Observer for Scroll Animations
    // ============================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.15
        };

        const observerCallback = function(entries, observer) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    // Get custom delay from CSS variable or use index-based delay
                    const customDelay = entry.target.style.getPropertyValue('--delay');
                    const delay = customDelay ? (parseInt(customDelay) * 100) : (index * 50);
                    
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, Math.min(delay, 400));
                    
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(function(element) {
            element.classList.add('visible');
        });
    }

    // ============================================
    // Header Scroll Effect with Sharp Transition
    // ============================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
            header.style.backgroundColor = 'var(--color-white)';
        } else {
            header.classList.remove('scrolled');
            header.style.backgroundColor = '';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // ============================================
    // Hero Parallax Effect
    // ============================================
    const heroBg = document.querySelector('.hero-bg[data-parallax]');
    
    if (heroBg && window.matchMedia('(min-width: 1024px)').matches) {
        let parallaxTicking = false;
        
        window.addEventListener('scroll', function() {
            if (!parallaxTicking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.scrollY;
                    const heroHeight = document.querySelector('.hero').offsetHeight;
                    
                    if (scrolled < heroHeight) {
                        const translateY = scrolled * 0.3;
                        heroBg.style.transform = 'translateY(' + translateY + 'px)';
                    }
                    
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const topBarHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - topBarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Video Placeholder Click Handler
    // ============================================
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            console.log('Video clicked - implement video modal or redirect');
        });

        videoPlaceholder.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // ============================================
    // Category Cards Hover Enhancement
    // ============================================
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-6px, -6px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // Interest Cards - Image Scale on Hover
    // ============================================
    const interestCards = document.querySelectorAll('.interest-card');

    interestCards.forEach(function(card) {
        const bg = card.querySelector('.interest-bg');
        
        if (bg) {
            card.addEventListener('mouseenter', function() {
                bg.style.transform = 'scale(1.08)';
            });

            card.addEventListener('mouseleave', function() {
                bg.style.transform = 'scale(1)';
            });
        }
    });

    // ============================================
    // Button Border Animation Enhancement
    // ============================================
    const animatedButtons = document.querySelectorAll('.btn-animated');

    animatedButtons.forEach(function(btn) {
        // Create left and right border elements
        const leftBorder = document.createElement('span');
        const rightBorder = document.createElement('span');
        
        leftBorder.className = 'btn-border-left';
        rightBorder.className = 'btn-border-right';
        
        // Style the border elements
        const borderStyle = {
            position: 'absolute',
            width: '2px',
            height: '0',
            backgroundColor: 'currentColor',
            transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
        
        Object.assign(leftBorder.style, borderStyle, { left: '0', bottom: '0' });
        Object.assign(rightBorder.style, borderStyle, { right: '0', top: '0' });
        
        btn.style.position = 'relative';
        btn.appendChild(leftBorder);
        btn.appendChild(rightBorder);
        
        btn.addEventListener('mouseenter', function() {
            leftBorder.style.height = '100%';
            rightBorder.style.height = '100%';
        });
        
        btn.addEventListener('mouseleave', function() {
            leftBorder.style.height = '0';
            rightBorder.style.height = '0';
        });
    });

    // ============================================
    // Bento Card Hover Effects
    // ============================================
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });

    // ============================================
    // B2B Image Grid Stagger Animation
    // ============================================
    const b2bImages = document.querySelectorAll('.b2b-img');

    b2bImages.forEach(function(img, index) {
        img.style.transitionDelay = (index * 0.1) + 's';
    });

    // ============================================
    // Badge Items Stagger Animation
    // ============================================
    const badgeItems = document.querySelectorAll('.badge-item');

    if ('IntersectionObserver' in window) {
        const badgeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    const allBadges = document.querySelectorAll('.badge-item');
                    allBadges.forEach(function(badge, i) {
                        setTimeout(function() {
                            badge.classList.add('visible');
                        }, i * 100);
                    });
                    badgeObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });

        if (badgeItems.length > 0) {
            badgeObserver.observe(badgeItems[0]);
        }
    }

    // ============================================
    // Title Reveal Animation Trigger
    // ============================================
    const titleLines = document.querySelectorAll('.title-line[data-reveal]');
    
    titleLines.forEach(function(line, index) {
        line.style.animationDelay = (0.2 + index * 0.2) + 's';
    });

    // ============================================
    // Lazy Load Images (Future Enhancement)
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window && lazyImages.length > 0) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        imageObserver.unobserve(image);
                    }
                });
            });

            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            lazyImages.forEach(function(image) {
                image.src = image.dataset.src;
            });
        }
    }

    // ============================================
    // Scroll Progress Indicator (Optional)
    // ============================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        let indicatorHidden = false;
        
        window.addEventListener('scroll', function() {
            if (!indicatorHidden && window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
                indicatorHidden = true;
            }
        }, { passive: true });
    }

    // ============================================
    // Unique Interaction: Magnetic Buttons
    // ============================================
    const magneticElements = document.querySelectorAll('.btn-glow, .btn-outline, .btn-primary, .category-card');
    
    magneticElements.forEach(function(btn) {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            // Limit distance from center (max 1)
            const x = (e.clientX - rect.left - h) / h;
            const y = (e.clientY - rect.top - v) / v;
            
            // Move item up to 12px from original position, based on cursor proximity
            this.style.transform = 'translate(' + (x * 12) + 'px, ' + (y * 12) + 'px)';
            // Faster immediate follow (no transition delay when moving)
            this.style.transition = 'transform 0.1s ease-out';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
            // Elastic return physics
            this.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // ============================================
    // Unique Interaction: Glow Cursor Tracker
    // ============================================
    const glowCards = document.querySelectorAll('.bento-card, .category-card');
    
    glowCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // ============================================
    // Unique Interaction: Scroll Velocity Skew (Smooth)
    // ============================================
    const skewElements = document.querySelectorAll('.b2b-img, .category-card, .interest-card');
    let lastScrollYSkew = window.scrollY;
    let currentSkew = 0;

    function renderSkew() {
        const currentScrollY = window.scrollY;
        // Calculate raw velocity
        let targetVelocity = currentScrollY - lastScrollYSkew;
        
        // Clamp and soften velocity to prevent extreme skewing
        targetVelocity = Math.max(-15, Math.min(15, targetVelocity));
        
        // Lerp for smoothness
        currentSkew = currentSkew + (targetVelocity - currentSkew) * 0.1;
        
        const skewAmount = currentSkew * 0.2;
        
        if (Math.abs(currentSkew) > 0.01) {
            skewElements.forEach(function(el) {
                // Ignore elements with magnetic active state to avoid fighting transforms
                if (!el.matches(':hover')) {
                    el.style.transform = 'skewY(' + skewAmount + 'deg) scale(1)';
                    el.style.transition = 'transform 0.1s linear';
                }
            });
        }
        
        lastScrollYSkew = currentScrollY;
        requestAnimationFrame(renderSkew);
    }
    
    if(window.matchMedia('(min-width: 768px)').matches && skewElements.length > 0) {
        requestAnimationFrame(renderSkew);
    }

    // ============================================
    // Console Greeting (for developers)
    // ============================================
    console.log('%c FANGAN TECH S.A.S ', 'background: #0a0a0a; color: #ffffff; padding: 12px 24px; font-size: 16px; font-weight: bold; font-family: monospace;');
    console.log('%c Tecnología que Transforma ', 'color: #737373; font-size: 12px; font-family: monospace;');
    console.log('%c Built with pure HTML5, CSS3 & Vanilla JS ', 'color: #a3a3a3; font-size: 10px;');

})();
