class Slider {
    constructor() {
        this.slider = document.querySelector('.services__slider');
        this.window = document.querySelector('.services__slider-window');
        this.pages = document.querySelectorAll('.slider__page');
        this.arrowLeft = document.querySelector('.services__arrow-l');
        this.arrowRight = document.querySelector('.services__arrow-r');
        
        this.currentPage = 0;
        this.itemsPerView = 3;
        this.totalPages = this.pages.length;
        
        this.init();
    }
    
    init() {
        this.setupStyles();
        this.attachEventListeners();
        this.updateSlider();
    }
    
    setupStyles() {
        // Устанавливаем ширину контейнера для всех страниц
        this.window.style.display = 'flex';
        this.window.style.transition = 'transform 0.3s ease-in-out';
        
        this.pages.forEach(page => {
            page.style.minWidth = '100%';
            page.style.flex = '0 0 auto';
        });
    }
    
    attachEventListeners() {
        this.arrowLeft.addEventListener('click', () => this.prev());
        this.arrowRight.addEventListener('click', () => this.next());
        
        // Поддержка свайпа на мобильных
        let startX = 0;
        this.window.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.window.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
                this.next();
            } else if (endX - startX > 50) {
                this.prev();
            }
        });
    }
    
    updateSlider() {
        const offset = -this.currentPage * 100;
        this.window.style.transform = `translateX(${offset}%)`;
    }
    
    next() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updateSlider();
        } else {
            // Циклический переход в начало
            this.currentPage = 0;
            this.updateSlider();
        }
    }
    
    prev() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updateSlider();
        } else {
            // Циклический переход в конец
            this.currentPage = this.totalPages - 1;
            this.updateSlider();
        }
    }
}

// Инициализация когда загружен DOM
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});
