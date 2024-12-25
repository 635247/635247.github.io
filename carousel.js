class Carousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.indicators = document.querySelector('.carousel-indicators');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        
        this.init();
    }

    init() {
        // 创建指示器
        this.createIndicators();
        
        // 设置第一张幻灯片为活动状态
        this.slides[0].classList.add('active');
        this.indicators.children[0].classList.add('active');
        
        // 绑定事件
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // 自动播放
        this.startAutoPlay();
    }

    createIndicators() {
        for (let i = 0; i < this.slideCount; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
    }

    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators.children[this.currentSlide].classList.remove('active');
        
        // 设置新的活动状态
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.indicators.children[this.currentSlide].classList.add('active');
    }

    prevSlide() {
        const index = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.goToSlide(index);
    }

    nextSlide() {
        const index = (this.currentSlide + 1) % this.slideCount;
        this.goToSlide(index);
    }

    startAutoPlay() {
        setInterval(() => this.nextSlide(), 5000); // 每5秒切换一次
    }
}

// 页面加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
}); 