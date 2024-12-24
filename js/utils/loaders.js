class ResourceLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.loadingManager = new THREE.LoadingManager(
            // onLoad
            () => {
                this.hideLoadingScreen();
            },
            // onProgress
            (url, itemsLoaded, itemsTotal) => {
                const progress = (itemsLoaded / itemsTotal) * 100;
                this.updateLoadingScreen(progress);
            }
        );
    }

    loadTexture(path) {
        return this.textureLoader.load(path);
    }

    updateLoadingScreen(progress) {
        // Update loading screen progress
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.width = `${progress}%`;
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
            });
        }
    }
}
