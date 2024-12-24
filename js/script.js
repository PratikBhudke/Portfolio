// Three.js Scene Setup
let scene, camera, renderer, particles;
let lastScrollTop = 0;
let currentRotationSpeed = 0.002;
const baseRotationSpeed = 0.002;
let rotationDirection = 1; // 1 for right, -1 for left

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 30;

    // Create particles
    createParticles();

    // Add event listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('scroll', handleScroll, false);

    // Start animation loop
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 2000;

    for (let i = 0; i < 2000; i++) {
        const x = Math.random() * size - size/2;
        const y = Math.random() * size - size/2;
        const z = Math.random() * size - size/2;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x64ffda,
        size: 2,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    if (st > lastScrollTop) {
        // Scrolling down - rotate right
        rotationDirection = 1;
    } else if (st < lastScrollTop) {
        // Scrolling up - rotate left
        rotationDirection = -1;
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (particles) {
        // Apply continuous rotation in the current direction
        particles.rotation.y += baseRotationSpeed * rotationDirection;
    }

    renderer.render(scene, camera);
}

// Project Animations
class ProjectAnimation {
    constructor(canvas) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        
        this.renderer.setSize(canvas.width, canvas.height);
        this.camera.position.z = 5;
        
        this.init();
    }
}

class ChatProjectAnimation extends ProjectAnimation {
    init() {
        // Create animated spheres representing chat bubbles
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        this.bubbles = [];
        for (let i = 0; i < 3; i++) {
            const bubble = new THREE.Mesh(geometry, material);
            bubble.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            this.bubbles.push(bubble);
            this.scene.add(bubble);
        }
        
        // Add lights
        const light = new THREE.PointLight(0x64ffda, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        
        this.animate();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.bubbles.forEach((bubble, i) => {
            bubble.position.y = Math.sin(Date.now() * 0.001 + i) * 1.5;
            bubble.rotation.x += 0.01;
            bubble.rotation.y += 0.01;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

class EcommerceProjectAnimation extends ProjectAnimation {
    init() {
        // Create animated cubes representing products
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff3366,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        this.cubes = [];
        for (let i = 0; i < 5; i++) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            this.cubes.push(cube);
            this.scene.add(cube);
        }
        
        // Add lights
        const light = new THREE.PointLight(0xff3366, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        
        this.animate();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.cubes.forEach((cube, i) => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.position.y = Math.sin(Date.now() * 0.001 + i) * 1;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

class PortfolioProjectAnimation extends ProjectAnimation {
    init() {
        // Create animated torus knot
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.8,
            shininess: 100,
            wireframe: true
        });
        
        this.torusKnot = new THREE.Mesh(geometry, material);
        this.scene.add(this.torusKnot);
        
        // Add lights
        const light1 = new THREE.PointLight(0xff6b6b, 1);
        light1.position.set(5, 5, 5);
        this.scene.add(light1);
        
        const light2 = new THREE.PointLight(0x64ffda, 0.5);
        light2.position.set(-5, -5, -5);
        this.scene.add(light2);
        
        this.animate();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.torusKnot.rotation.x += 0.01;
        this.torusKnot.rotation.y += 0.01;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize project animations
function initProjectAnimations() {
    const projectCanvases = document.querySelectorAll('.project-canvas');
    
    projectCanvases.forEach((canvas, index) => {
        // Resize canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Create appropriate animation
        switch(index) {
            case 0:
                new ChatProjectAnimation(canvas);
                break;
            case 1:
                new EcommerceProjectAnimation(canvas);
                break;
            case 2:
                new PortfolioProjectAnimation(canvas);
                break;
        }
    });
}

// Loader
function initLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const loaderProgress = document.querySelector('.loader-progress');
    let progress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        loaderProgress.textContent = Math.round(progress) + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderWrapper.classList.add('fade-out');
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                    document.dispatchEvent(new Event('loaderHidden'));
                }, 500);
            }, 500);
        }
    }, 500);
}

// Scroll Progress Bar
function updateScrollProgress() {
    const progressBar = document.getElementById('progress-bar');
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / maxScroll) * 100;
    progressBar.style.width = scrollPercent + '%';
}

// Navbar scroll effect
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Add scroll event listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
});
window.addEventListener('resize', updateScrollProgress);
window.addEventListener('load', updateNavbar);

// Handle navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow normal navigation without storing section
        const section = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(section);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Always scroll to top on page refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// Ensure we start at top when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    init(); // Main Three.js init
    initProjectAnimations();
});
