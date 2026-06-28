class PlanetExplorer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.planets = {};
        this.orbits = {};
        this.time = 0;
        this.speed = 1;
        this.selectedPlanet = null;
        
        this.init();
    }

    init() {
        // صحنه
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000011, 0.0005);

        // دوربین
        this.camera = new THREE.PerspectiveCamera(
            60, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            2000
        );
        this.camera.position.set(0, 80, 200);

        // رندرر
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;

        // کنترل
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 20;
        this.controls.maxDistance = 500;

        // نور
        this.setupLights();
        
        // ستاره‌ها
        this.createStars();
        
        // سیارات
        this.createPlanets();
        
        // مدارها
        this.createOrbits();

        // رویداد resize
        window.addEventListener('resize', () => this.onResize());
    }

    setupLights() {
        // نور خورشید
        const sunLight = new THREE.PointLight(0xFFF5E1, 2, 600);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        // نور محیطی
        const ambientLight = new THREE.AmbientLight(0x111122, 0.3);
        this.scene.add(ambientLight);
    }

    createStars() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 8000;
        const positions = new Float32Array(starsCount * 3);
        const colors = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

            // رنگ ستاره‌ها (سفید تا آبی-زرد)
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.5, 0.3, Math.random() * 0.5 + 0.5);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(this.stars);
    }

    createPlanets() {
        Object.keys(PLANETS_DATA).forEach(key => {
            const data = PLANETS_DATA[key];
            
            // گروه سیاره (برای چرخش مداری)
            const planetGroup = new THREE.Group();
            
            // مش سیاره
            const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
            const material = new THREE.MeshStandardMaterial({
                color: data.color,
                emissive: data.emissive || 0x000000,
                emissiveIntensity: data.emissiveIntensity || 0,
                roughness: 0.7,
                metalness: 0.1
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { key, ...data };
            
            // حلقه زحل
            if (data.hasRings) {
                this.createRings(mesh, data.radius);
            }
            
            // ماه زمین
            if (data.hasMoon) {
                this.createMoon(planetGroup, data.radius);
            }

            // افکت نور خورشید (glow)
            if (key === 'sun') {
                this.createSunGlow(mesh, data.radius);
            }

            planetGroup.add(mesh);
            this.scene.add(planetGroup);
            
            this.planets[key] = {
                group: planetGroup,
                mesh: mesh,
                data: data,
                angle: Math.random() * Math.PI * 2
            };
        });
    }

    createRings(parent, radius) {
        const ringGeometry = new THREE.RingGeometry(
            radius * 1.4, 
            radius * 2.2, 
            64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xC4A35A,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6
        });
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2;
        parent.add(rings);
    }

    createMoon(parentGroup, planetRadius) {
        const moonGeometry = new THREE.SphereGeometry(planetRadius * 0.27, 32, 32);
        const moonMaterial = new THREE.MeshStandardMaterial({
            color: 0xAAAAAA,
            roughness: 0.9
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(planetRadius * 3, 0, 0);
        parentGroup.add(moon);
        
        // ذخیره برای انیمیشن
        this.moon = moon;
    }

    createSunGlow(mesh, radius) {
        const glowGeometry = new THREE.SphereGeometry(radius * 1.5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xFDB813,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        mesh.add(glow);
        
        // لایه دوم glow
        const glow2Geometry = new THREE.SphereGeometry(radius * 2, 32, 32);
        const glow2Material = new THREE.MeshBasicMaterial({
            color: 0xFFAA00,
            transparent: true,
            opacity: 0.1
        });
        const glow2 = new THREE.Mesh(glow2Geometry, glow2Material);
        mesh.add(glow2);
    }

    createOrbits() {
        Object.keys(PLANETS_DATA).forEach(key => {
            if (key === 'sun') return;
            
            const data = PLANETS_DATA[key];
            const orbitGeometry = new THREE.RingGeometry(
                data.distance - 0.2,
                data.distance + 0.2,
                128
            );
            const orbitMaterial = new THREE.MeshBasicMaterial({
                color: 0x444466,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            this.scene.add(orbit);
        });
    }

    animate() {
        this.time += 0.01 * this.speed;

        // چرخش ستاره‌ها
        this.stars.rotation.y += 0.0002;

        // حرکت سیارات
        Object.keys(this.planets).forEach(key => {
            const planet = this.planets[key];
            const data = planet.data;

            // چرخش محوری
            planet.mesh.rotation.y += data.rotationSpeed;

            // چرخش مداری
            if (data.distance > 0) {
                planet.angle += data.speed * this.speed * 0.1;
                planet.group.position.x = Math.cos(planet.angle) * data.distance;
                planet.group.position.z = Math.sin(planet.angle) * data.distance;
            }

            // چرخش ماه
            if (this.moon && key === 'earth') {
                const moonAngle = this.time * 2;
                this.moon.position.x = Math.cos(moonAngle) * data.radius * 4;
                this.moon.position.z = Math.sin(moonAngle) * data.radius * 4;
            }
        });

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    focusOnPlanet(key) {
        const planet = this.planets[key];
        if (!planet) return;

        const targetPos = planet.group.position.clone();
        const offset = planet.data.radius * 5;
        
        // انیمیشن دوربین
        const startPos = this.camera.position.clone();
        const endPos = new THREE.Vector3(
            targetPos.x + offset,
            targetPos.y + offset * 0.5,
            targetPos.z + offset
        );

        let progress = 0;
        const animateCamera = () => {
            progress += 0.02;
            if (progress > 1) progress = 1;
            
            this.camera.position.lerpVectors(startPos, endPos, progress);
            this.controls.target.lerp(targetPos, 0.05);
            
            if (progress < 1) requestAnimationFrame(animateCamera);
        };
        animateCamera();
        
        this.selectedPlanet = key;
    }
}
