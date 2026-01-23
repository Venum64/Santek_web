// header js
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
});



class FadeRight {
    constructor(elementsSelector) {
        this.elements = document.querySelectorAll(elementsSelector);

        if (this.elements.length === 0) {
            console.warn(`Elements with selector "${elementsSelector}" not found`);
            return;
        }
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll();
    }

    handleScroll() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const triggerPoint = window.innerHeight * 0.85;

            const speed = el.getAttribute('data-speed') || '800';
            el.style.transition = `all ${speed}ms ease-out`;

            if (rect.top < triggerPoint && rect.bottom > 0) {
                el.classList.add('active');
            }
        });
    }
}

const fadeEffects = new FadeRight('.speed');

// hedaer js

document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.feature__icon');

    icons.forEach(icon => {
        let flipped = false;
        let lastX = 0;
        let lastY = 0;

        icon.addEventListener('mouseenter', (e) => {
            flipped = !flipped;
            icon.classList.toggle('rotate', flipped);
            lastX = e.clientX;
            lastY = e.clientY;
        });

        icon.addEventListener('mousemove', (e) => {
            const dx = Math.abs(e.clientX - lastX);
            const dy = Math.abs(e.clientY - lastY);

            if (dx > 30 || dy > 30) {
                flipped = !flipped;
                icon.classList.toggle('rotate', flipped);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        });

        icon.addEventListener('mouseleave', () => {
            flipped = false;
            icon.classList.remove('rotate');
        });
    });
});


class Slider {
    constructor() {
        this.windowSlider = document.querySelector('.services__slider-window');
        this.slides = Array.from(document.querySelectorAll('.slider__page'));
        this.btnPrev = document.querySelector('.services__arrow-l');
        this.btnNext = document.querySelector('.services__arrow-r');

        this.current = 1;
        this.isAnimating = false;

        if (!this.windowSlider || !this.slides.length) return;

        this.setup();
        this.events();
    }

    setup() {
        const firstClone = this.slides[0].cloneNode(true);
        const lastClone = this.slides[this.slides.length - 1].cloneNode(true);

        this.windowSlider.appendChild(firstClone);
        this.windowSlider.insertBefore(lastClone, this.slides[0]);

        this.slides = Array.from(this.windowSlider.children);

        this.update(false);
    }

    update(animate = true) {
        this.windowSlider.style.transition = animate ? 'transform 0.4s ease' : 'none';
        this.windowSlider.style.transform = `translateX(-${this.current * 100}%)`;
    }

    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.current++;
        this.update();

        this.windowSlider.addEventListener('transitionend', () => {
            if (this.current === this.slides.length - 1) {
                this.current = 1;
                this.update(false);
            }
            this.isAnimating = false;
        }, { once: true });
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.current--;
        this.update();

        this.windowSlider.addEventListener('transitionend', () => {
            if (this.current === 0) {
                this.current = this.slides.length - 2;
                this.update(false);
            }
            this.isAnimating = false;
        }, { once: true });
    }

    events() {
        this.btnNext.addEventListener('click', () => this.next());
        this.btnPrev.addEventListener('click', () => this.prev());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});
