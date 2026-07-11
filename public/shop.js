// Shop Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Category Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn[data-category]');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;

            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            });

            // Update results count
            const visibleCount = document.querySelectorAll('.product-card[style="display: block"], .product-card:not([style])').length;
            const resultsCount = document.querySelector('.results-count strong');
            if (resultsCount) {
                resultsCount.textContent = category === 'all' ? '12' : document.querySelectorAll(`.product-card[data-category="${category}"]`).length;
            }
        });
    });

    // Price Range Slider
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            priceValue.textContent = '$' + value.toLocaleString('es-CO');
        });
    }

    // Add to Cart Animation
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                Agregado
            `;
            this.style.backgroundColor = '#22c55e';
            this.style.borderColor = '#22c55e';

            // Update cart count
            cartItems++;
            if (cartCount) {
                cartCount.textContent = cartItems;
                cartCount.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                }, 200);
            }

            // Reset button after delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }, 1500);
        });
    });

    // Favorite Button Toggle
    const favoriteBtns = document.querySelectorAll('.action-btn[aria-label="Agregar a favoritos"]');

    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const svg = this.querySelector('svg path');
            const isFilled = svg.getAttribute('fill') === 'currentColor';
            
            if (isFilled) {
                svg.setAttribute('fill', 'none');
            } else {
                svg.setAttribute('fill', 'currentColor');
                this.style.backgroundColor = '#dc2626';
                this.style.borderColor = '#dc2626';
                this.style.color = '#fff';
            }
        });
    });

    // Sort Products
    const sortSelect = document.getElementById('sortBy');

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const value = this.value;
            const grid = document.querySelector('.products-grid');
            const cards = Array.from(grid.querySelectorAll('.product-card'));

            cards.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.product-price').textContent.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.querySelector('.product-price').textContent.replace(/[^0-9]/g, ''));

                switch(value) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    default:
                        return 0;
                }
            });

            // Re-append sorted cards
            cards.forEach(card => grid.appendChild(card));
        });
    }

    // Scroll Animation for Product Cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
