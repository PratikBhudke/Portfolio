class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = new THREE.Group();
        this.particleCount = 1000;
        this.init();
    }

    init() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);

        for (let i = 0; i < this.particleCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;

            // Color
            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        this.particles.rotation.x += 0.0005;
        this.particles.rotation.y += 0.0005;
    }

    update(scrollProgress) {
        // Update particle system based on scroll
        this.particles.rotation.y = scrollProgress * Math.PI * 2;
    }
}
