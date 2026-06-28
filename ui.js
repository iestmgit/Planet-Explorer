class UI {
    constructor(explorer) {
        this.explorer = explorer;
        this.init();
    }

    init() {
        // پنهان کردن لودینگ
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 1500);

        // ساخت لیست سیارات
        this.createPlanetList();

        // رویدادها
        this.setupEvents();
    }

    createPlanetList() {
        const nav = document.getElementById('planet-list');
        
        Object.keys(PLANETS_DATA).forEach(key => {
            const data = PLANETS_DATA[key];
            const btn = document.createElement('button');
            btn.className = 'planet-btn';
            btn.innerHTML = `
                <span class="planet-color" style="background: #${data.color.toString(16).padStart(6, '0')}"></span>
                <span>${data.name}</span>
            `;
            btn.addEventListener('click', () => {
                this.explorer.focusOnPlanet(key);
                this.showPlanetInfo(key);
            });
            nav.appendChild(btn);
        });
    }

    showPlanetInfo(key) {
        const data = PLANETS_DATA[key];
        const panel = document.getElementById('planet-info');
        
        document.getElementById('planet-name').textContent = `${data.name} (${data.nameEn})`;
        document.getElementById('planet-desc').textContent = data.description;
        
        const statsHtml = Object.entries(data.stats)
            .map(([k, v]) => `<div class="stat"><span>${k}:</span><span>${v}</span></div>`)
            .join('');
        document.getElementById('planet-stats').innerHTML = statsHtml;
        
        panel.classList.remove('hidden');
    }

    setupEvents() {
        // بستن پنل
        document.getElementById('close-info').addEventListener('click', () => {
            document.getElementById('planet-info').classList.add('hidden');
        });

        // اسلایدر سرعت
        const slider = document.getElementById('speed-slider');
        slider.addEventListener('input', (e) => {
            this.explorer.speed = parseFloat(e.target.value);
            document.getElementById('speed-val').textContent = e.target.value + 'x';
        });

        // کلیک روی سیاره در صحنه
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        window.addEventListener('click', (e) => {
            if (e.target.tagName !== 'CANVAS') return;
            
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.explorer.camera);
            const intersects = raycaster.intersectObjects(
                Object.values(this.explorer.planets).map(p => p.mesh)
            );
            
            if (intersects.length > 0) {
                const key = intersects[0].object.userData.key;
                this.showPlanetInfo(key);
            }
        });
    }
}
