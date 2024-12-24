class PandaLoader {
    constructor() {
        this.container = document.querySelector('.loader-container');
        this.letters = document.querySelectorAll('.inline-block');
        this.body = document.body;
        this.startLoading();
    }

    startLoading() {
        // Prevent scrolling during loader
        this.body.style.overflow = 'hidden';
        
        // Animate each letter with a delay
        this.letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('show');
            }, index * 200); // 200ms delay between each letter
        });

        // Hide loader after all animations
        setTimeout(() => this.hide(), 4500);
    }

    hide() {
        this.container.classList.add('hidden');
        // Add class to body to show progress bar
        this.body.classList.add('loader-hidden');
        // Enable scrolling
        this.body.style.overflow = '';
        
        // Emit event when loader is hidden
        const event = new CustomEvent('loaderHidden');
        document.dispatchEvent(event);
        
        setTimeout(() => {
            this.container.style.display = 'none';
        }, 300);
    }
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PandaLoader();
});
