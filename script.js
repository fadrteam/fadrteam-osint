// ==========================================
// 1. МУЗЫКА (Визуальный Плеер)
// ==========================================
const canvasViz = document.getElementById('visualizer');

const playlist = [
// ==========================================
// TRACK 1
// ==========================================           
{ file: "music/track1.mp3", title: "pyro-super (slowed)", artist: "ZERTAL", cover: "covers/cover1.jpg" },

// ==========================================
// TRACK 2
// ==========================================    
{ file: "music/track2.mp3", title: "Overlook (Slowed)", artist: "Bomby", cover: "covers/cover2.jpg" },

// ==========================================
// TRACK 3
// ==========================================    
{ file: "music/track3.mp3", title: "Faith", artist: "Hugeloud", cover: "covers/cover3.jpg" },

// ==========================================
// TRACK 4
// ==========================================    
{ file: "music/track4.mp3", title: "Liquid", artist: "GreenHuedee", cover: "covers/cover4.jpg" },

// ==========================================
// TRACK 5
// ==========================================    
{ file: "music/track5.mp3", title: "VEM ME PEGAR", artist: "HONEYWOOD", cover: "covers/cover5.jpg" },

// ==========================================
// TRACK 6
// ==========================================    
{ file: "music/track6.mp3", title: "CHOD L", artist: "WARMANE, TRXSHBXY, MATORO", cover: "covers/cover6.jpg" },

// ==========================================
// TRACK 7
// ==========================================    
{ file: "music/track7.mp3", title: "To Forever Moonbeam (Remix)", artist: "Rachael Starr", cover: "covers/cover7.jpg" },

// ==========================================
// TRACK 8
// ==========================================    
{ file: "music/track8.mp3", title: "ELOY", artist: "NVXUS", cover: "covers/cover8.jpg" },

// ==========================================
// TRACK 9
// ==========================================    
{ file: "music/track9.mp3", title: "mr popular", artist: "predayed", cover: "covers/cover9.jpg" },

// ==========================================
// TRACK 10
// ==========================================    
{ file: "music/track10.mp3", title: "theclubrock (House)", artist: "Rmidrah", cover: "covers/cover10.jpg" },

// ==========================================
// TRACK 11
// ==========================================
{ file: "music/track11.mp3", title: "Redline", artist: "onimanxd", cover: "covers/cover11.jpg" },

// ==========================================
// TRACK 12
// ==========================================
{ file: "music/track12.mp3", title: "Дельфины DnB (remix)", artist: "NLXTN, SG17.06", cover: "covers/cover12.jpg" },

// ==========================================
// TRACK 13
// ==========================================
{ file: "music/track13.mp3", title: "Fool", artist: "Kaito Shoma", cover: "covers/cover13.jpg" },

// ==========================================
// TRACK 14
// ==========================================
{ file: "music/track14.mp3", title: "Cold Nights", artist: "Apovabin", cover: "covers/cover14.jpg" },

// ==========================================
// TRACK 15
// ==========================================
{ file: "music/track15.mp3", title: "Disappear", artist: "DXRTYTYPE", cover: "covers/cover15.jpg" },

// ==========================================
// TRACK 16
// ==========================================
{ file: "music/track16.mp3", title: "Here Comes The Cowboy", artist: "DustBowlChampion", cover: "covers/cover16.jpg" },


// ==========================================
// TRACK 17
// ==========================================
{ file: "music/track17.mp3", title: "In Your Night", artist: "SKWLKR", cover: "covers/cover17.jpg" },

// ==========================================
// TRACK 18
// ==========================================
{ file: "music/track18.mp3", title: "NIGHTMARE (Slowed)", artist: "TEENWXVE", cover: "covers/cover18.jpg" },

// ==========================================
// TRACK 19
// ==========================================
{ file: "music/track19.mp3", title: "ANTRUM (Slowed)", artist: "GERXMVP", cover: "covers/cover19.jpg" },

// ==========================================
// TRACK 20
// ==========================================
{ file: "music/track20.mp3", title: "Afraid", artist: "HAIX", cover: "covers/cover20.jpg" },

// ==========================================
// TRACK 21
// ==========================================
{ file: "music/track21.mp3", title: "Genesis (Slowed)", artist: "onimanxd", cover: "covers/cover21.jpg" },

// ==========================================
// TRACK 22
// ==========================================
{ file: "music/track22.mp3", title: "Astray", artist: "UdieNnx", cover: "covers/cover22.jpg" },

// ==========================================
// TRACK 23
// ==========================================
{ file: "music/track23.mp3", title: "I Wanna Be Honest", artist: "PureSnow", cover: "covers/cover23.jpg" },

// ==========================================
// TRACK 24
// ==========================================
{ file: "music/track24.mp3", title: "Taking Drugs", artist: "SAIBOTAJE", cover: "covers/cover24.jpg" },

// ==========================================
// TRACK 25
// ==========================================
{ file: "music/track25.mp3", title: "crimson touch", artist: "HXVSAGE", cover: "covers/cover25.jpg" },


];

let currentTrack = 0;
const player = document.getElementById('bg-music');

if (player) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeSlider = document.getElementById('volume-slider');
    const repeatBtn = document.getElementById('repeat-btn');
    
    let isRepeat = false;
    let isSeeking = false;

        function loadTrack(index) {
        const track = playlist[index];
        player.src = track.file;
        player.load();
        player.volume = volumeSlider ? volumeSlider.value : 0.1;
        
        if(trackTitle) trackTitle.textContent = track.title;
        if(trackArtist) trackArtist.textContent = track.artist;
        if(progressBar) progressBar.style.width = '0%';
        
        const cover = document.getElementById('player-cover-img');
        if(cover) cover.src = track.cover;

        // 1. ОБНОВЛЯЕМ РАЗМЫТЫЙ ФОН
        const bgGlow = document.getElementById('player-bg-glow');
        if (bgGlow) {
            // Берем ту же картинку, что и обложка, и ставим её на фон
            bgGlow.style.backgroundImage = `url('${track.cover}')`;
        }

        // 2. МЕНЯЕМ ЦВЕТ ВИЗУАЛИЗАТОРА В ЗАВИСИМОСТИ ОТ ТРЕКА
        // Тут мы задаем цвета для первых 3 треков. Остальные будут брать цвет акцента.
        const vizColors = {
            0: '#a855f7', // Track 1 (например, фиолетовый)
            1: '#3b82f6', // Track 2 (синий)
            2: '#4ade80', // Track 3 (зеленый)
        };

        if (vizColors[index]) {
            // Принудительно перекрашиваем холст эквалайзера
            canvasViz.style.setProperty('--viz-color', vizColors[index]);
        } else {
            // Для остальных треков берем твой акцентный цвет
            const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
            canvasViz.style.setProperty('--viz-color', accent);
        }
    }

    function updateProgress() {
        if (isSeeking) return;

        if (player.duration && !isNaN(player.duration) && player.duration !== Infinity && progressBar) {
            const percent = (player.currentTime / player.duration) * 100;
            const safePercent = Math.min(100, Math.max(0, percent));
            progressBar.style.width = `${safePercent}%`;
        } else if (progressBar) {
            progressBar.style.width = '0%';
        }

        if (currentTimeEl && totalTimeEl && player.duration !== Infinity) {
            let curMins = Math.floor(player.currentTime / 60);
            let curSecs = Math.floor(player.currentTime % 60);
            let durMins = Math.floor(player.duration / 60) || 0;
            let durSecs = Math.floor(player.duration % 60) || 0;
            currentTimeEl.textContent = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`;
            totalTimeEl.textContent = `${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
        }
    }

      // Перемотка по клику
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            if (!player.duration || isNaN(player.duration) || player.duration === Infinity) return;
            
            const rect = progressContainer.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const safePercent = Math.min(1, Math.max(0, percent));
            const newTime = safePercent * player.duration;
            
            isSeeking = true;
            player.currentTime = newTime;
            
            player.addEventListener('seeked', function onSeeked() {
                // Если браузер скинул время в 0, но мы кликнули не в начало — возвращаем
                if (player.currentTime === 0 && newTime > 1) {
                    console.log("Браузер сбросил время. Возвращаем...");
                    player.currentTime = newTime;
                }
                isSeeking = false;
                player.removeEventListener('seeked', onSeeked);
            }, { once: true });
            
            setTimeout(() => { isSeeking = false; }, 500);
        });
    }

     if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (player.paused) {
                player.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                playPauseBtn.classList.add('playing'); // Включаем пульсацию
            } else {
                player.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                playPauseBtn.classList.remove('playing'); // Выключаем пульсацию
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
            player.play();
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', playNextTrack);
    }

    if (repeatBtn) {
        repeatBtn.addEventListener('click', () => {
            isRepeat = !isRepeat;
            repeatBtn.classList.toggle('active', isRepeat);
            repeatBtn.innerHTML = isRepeat 
                ? '<i class="fa-solid fa-shuffle"></i>' 
                : '<i class="fa-solid fa-repeat"></i>';
            
            // Показываем уведомление
            showToast(isRepeat ? "Режим рандома включен" : "Режим рандома выключен", isRepeat ? "success" : "info");
        });
    }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            player.volume = e.target.value;
            // Добавляем класс свечения, пока пользователь крутит ползунок
            volumeSlider.classList.add('active');
        });

        // Убираем свечение, когда отпускаем мышку/палец
        volumeSlider.addEventListener('change', () => {
            volumeSlider.classList.remove('active');
        });
        
        // Убираем свечение, если кликнули в другое место
        volumeSlider.addEventListener('mouseout', () => {
            volumeSlider.classList.remove('active');
        });
    }

    player.addEventListener('timeupdate', updateProgress);
    
    player.addEventListener('loadedmetadata', () => {
        updateProgress();
    });

    // Функция для включения следующего трека (учитывает рандом)
    function playNextTrack() {
        if (isRepeat) {
            // Рандом
            let nextTrack = Math.floor(Math.random() * playlist.length);
            // Защита от повтора
            while (nextTrack === currentTrack && playlist.length > 1) {
                nextTrack = Math.floor(Math.random() * playlist.length);
            }
            currentTrack = nextTrack;
        } else {
            // По порядку
            currentTrack = (currentTrack + 1) % playlist.length;
        }
        loadTrack(currentTrack);
        player.play();
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        playPauseBtn.classList.add('playing');
    }

    // При окончании трека вызываем эту функцию
    player.addEventListener('ended', playNextTrack);

    // Загружаем первый трек при старте
    loadTrack(currentTrack);

    // Автовоспроизведение при первом клике по сайту (из-за политик браузеров)
    document.body.addEventListener('click', function initAudio() {
        if (player.paused) {
            player.play().catch(e => console.log("Ошибка воспроизведения:", e));
            if(playPauseBtn) playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            playPauseBtn.classList.add('playing');
        }
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
}

// ==========================================
// 1.1 АУДИО ВИЗУАЛИЗАТОР
// ==========================================

if (canvasViz) {
    const ctxViz = canvasViz.getContext('2d');
    let audioContext, analyser, dataArray;

    function initVisualizer() {
        if (!audioContext && player) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(player);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 128;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }

    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);
        ctxViz.clearRect(0, 0, canvasViz.width, canvasViz.height);
        if (!analyser) return;

        analyser.getByteFrequencyData(dataArray);
        
        const barWidth = 4;
        const barGap = 3;
        const totalBars = Math.floor(canvasViz.width / (barWidth + barGap));
        
        let x = 0;
        for (let i = 0; i < totalBars; i++) {
            let sum = 0;
            let count = 0;
            for(let j = 0; j < (dataArray.length / totalBars); j++) {
                sum += dataArray[Math.floor(i * (dataArray.length / totalBars)) + j] || 0;
                count++;
            }
            let average = sum / count;
            
            let barHeight = (average / 255) * canvasViz.height;
            if (barHeight < 4) barHeight = 4; 
const accentColor = getComputedStyle(canvasViz).getPropertyValue('--viz-color').trim() || 
                    getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#4ade80';
            
                     // градиент для каждого столбика
            let gradient = ctxViz.createLinearGradient(0, canvasViz.height - barHeight, 0, canvasViz.height);
            
            
            gradient.addColorStop(0, accentColor); // Верхушка столбика
            
            
            gradient.addColorStop(1, 'transparent'); 
            
            

            ctxViz.fillStyle = gradient;
            ctxViz.beginPath();
            ctxViz.roundRect(x, canvasViz.height - barHeight, barWidth, barHeight, [2, 2, 0, 0]);
            ctxViz.fill();

            x += barWidth + barGap;
        }
    }

    document.body.addEventListener('click', function initAudioAndViz() {
        initVisualizer();
        drawVisualizer();
        document.body.removeEventListener('click', initAudioAndViz);
    }, { once: true });
}

// ==========================================
// 2. СМЕНА ТЕМЫ (День/Ночь)
// ==========================================
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
}

// ==========================================
// 3. ЖИВЫЕ ЧАСЫ
// ==========================================
const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');

function updateClock() {
    const now = new Date();
    if (clockEl) clockEl.textContent = now.toLocaleTimeString('ru-RU');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

if (clockEl) {
    updateClock();
    setInterval(updateClock, 1000);
}

// ==========================================
// 4. ГЕНЕРАТОР ЦВЕТОВ
// ==========================================
const colorBtn = document.getElementById('color-btn');
if (colorBtn) {
    colorBtn.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        document.body.style.backgroundColor = randomColor;
        const code = document.getElementById('color-code');
        if(code) code.textContent = randomColor.toUpperCase();
    });
}

// ==========================================
// 5. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК (Внутренние)
// ==========================================
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.tagName === 'A') return;
        e.preventDefault();
        const targetId = button.getAttribute('data-target');
        const targetTab = document.getElementById(targetId);
        if (!targetTab) return;
        const parentMenu = button.closest('.nav-menu');
        if (!parentMenu) return;
        parentMenu.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const parentContainer = parentMenu.parentElement;
        if (parentContainer) {
            parentContainer.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        }
        button.classList.add('active');
        targetTab.classList.add('active');
    });
});

// ==========================================
// 6. МАТРИЦА (Частицы)
// ==========================================
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
const particleCount = 60;
const mouse = { x: null, y: null, radius: 150 };
window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = '#4ade80';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
for (let i = 0; i < particleCount; i++) particles.push(new Particle());
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update(); p.draw();
        if (mouse.x && mouse.y) {
            let dx = p.x - mouse.x, dy = p.y - mouse.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < mouse.radius) {
                ctx.strokeStyle = `rgba(74, 222, 128, ${1 - dist/mouse.radius})`;
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// 7. СКАНЕР СЕТИ
// ==========================================
const scanBtn = document.getElementById('scan-btn');
if (scanBtn) {
    scanBtn.addEventListener('click', async () => {
        const logBox = document.getElementById('scan-log');
        if (!logBox) return;
        logBox.style.display = 'block';
        logBox.innerHTML = '> Инициализация сканера...<br>';
        const devices = ["Router", "Desktop-PC", "Unknown Smartphone", "IP-Camera", "Smart TV"];
        for (let i = 0; i < devices.length; i++) {
            await new Promise(r => setTimeout(r, 600));
            logBox.innerHTML += `> Пинг ... OK<br>`;
            await new Promise(r => setTimeout(r, 400));
            logBox.innerHTML += `> <span style="color:#3b82f6;">Найдено: ${devices[i]}</span><br>`;
            logBox.scrollTop = logBox.scrollHeight;
        }
        logBox.innerHTML += `> Сканирование завершено.<br>`;
    });
}

// ==========================================
// 8. АНАЛИЗАТОР ПАРОЛЕЙ
// ==========================================
const passInput = document.getElementById('password-input');
const passResult = document.getElementById('password-result');
if (passInput && passResult) {
    passInput.addEventListener('input', () => {
        const pass = passInput.value;
        if (pass.length === 0) { passResult.innerHTML = ''; return; }
        let score = 0;
        if (pass.length > 5) score++;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        let msg = "", color = "";
        if (score <= 2) { msg = "🔴 СЛАБЫЙ."; color = "#ff5f56"; }
        else if (score === 3 || score === 4) { msg = "🟡 СРЕДНИЙ."; color = "#ffbd2e"; }
        else { msg = "🟢 НАДЕЖНЫЙ."; color = "#27c93f"; }
        passResult.innerHTML = `<span style="color: ${color}">${msg}</span>`;
    });
}

// ==========================================
// 9. МУЛЬТИПОИСК (чекбоксы + очередь)
// ==========================================
const PLATFORM_URLS = {
    github:      u => `https://github.com/${u}`,
    telegram:    u => `https://t.me/${u}`,
    vk:          u => `https://vk.com/${u}`,
    steam:       u => `https://steamcommunity.com/id/${u}`,
    tiktok:      u => `https://www.tiktok.com/@${u}`,
    instagram:   u => `https://www.instagram.com/${u}/`,
    reddit:      u => `https://www.reddit.com/user/${u}`,
    pinterest:   u => `https://www.pinterest.com/${u}/`,
    twitch:      u => `https://www.twitch.tv/${u}`,
    soundcloud:  u => `https://soundcloud.com/${u}`,
    behance:     u => `https://www.behance.net/${u}`,
    keybase:     u => `https://keybase.io/${u}`,
    hackernews:  u => `https://news.ycombinator.com/user?id=${u}`,
    flickr:      u => `https://www.flickr.com/people/${u}`,
    deviantart:  u => `https://www.deviantart.com/${u}`
};

function selectAllPlatforms(state) {
    document.querySelectorAll('#platform-checkboxes input[type="checkbox"]').forEach(cb => cb.checked = state);
}

const multiSearchBtn = document.getElementById('multi-search-btn');
if (multiSearchBtn) {
    multiSearchBtn.addEventListener('click', async () => {
        const username = document.getElementById('multi-search-input').value.trim();
        const resultBox = document.getElementById('multi-search-result');
        if (!username) return alert("Введи ник!");

        const selected = [...document.querySelectorAll('#platform-checkboxes input:checked')]
            .map(cb => cb.value);

        if (selected.length === 0) {
            resultBox.innerHTML = '<span style="color:#ffbd2e;">[!] Выбери хотя бы одну площадку</span>';
            return;
        }

        resultBox.innerHTML = `<span style="color:#4ade80;">[>] Сканирую ${selected.length} площадок... Пожалуйста, подожди.</span>`;

        let html = `<p style="color:#fff; font-weight:bold; margin-bottom:10px;">Результаты для "${username}":</p>`;
        
        for (let i = 0; i < selected.length; i++) {
            const platform = selected[i];
            const url = PLATFORM_URLS[platform](username);
            
            const rowId = `scan-${platform}`;
            // Строгий статус "[>]" вместо "..."
            resultBox.innerHTML += `<p id="${rowId}" style="margin:4px 0;"><span style="color:#888;">[>]</span> ${platform.toUpperCase()}</p>`;

            try {
                const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
                const res = await fetch(proxyUrl + encodeURIComponent(url));
                const data = await res.json();
                
                const isNotFound = !data.contents || 
                                   data.status.http_code === 404 || 
                                   data.contents.includes('404 Not Found') || 
                                   data.contents.includes('Page not found');

                const row = document.getElementById(rowId);
                if (isNotFound) {
                    // Строгий статус "[X]" вместо "✖"
                    row.innerHTML = `<span style="color:#ff5f56;">[X]</span> ${platform.toUpperCase()} — <a href="${url}" target="_blank" style="color:#888; text-decoration:line-through;">не найден</a>`;
                } else {
                    // Строгий статус "[+]" вместо "✔"
                    row.innerHTML = `<span style="color:#27c93f;">[+]</span> ${platform.toUpperCase()} — <a href="${url}" target="_blank" style="color:#4ade80; font-weight:bold;">найден</a>`;
                }
            } catch (e) {
                // Строгий статус "[!]" вместо "?"
                const row = document.getElementById(rowId);
                row.innerHTML = `<span style="color:#ffbd2e;">[!]</span> ${platform.toUpperCase()} — <a href="${url}" target="_blank" style="color:#d1d1d1;">проверить вручную</a>`;
            }

            await new Promise(r => setTimeout(r, 500));
        }
        
        resultBox.innerHTML += `<button onclick="document.getElementById('multi-search-result').innerHTML=''" style="margin-top:15px; padding:5px 10px; background:#222; border:1px solid #444; color:#fff; border-radius:4px; cursor:pointer;">Очистить</button>`;
    });
}

// ==========================================
// 10. МОНИТОРИНГ ПК
// ==========================================
const cpuBar = document.getElementById('cpu-bar');
if (cpuBar) {
    setInterval(() => {
        const cpu = Math.floor(Math.random() * 40) + 10;
        const ram = Math.floor(Math.random() * 20) + 40;
        const gpu = Math.floor(Math.random() * 15) + 45;
        document.getElementById('cpu-value').textContent = cpu + '%';
        document.getElementById('ram-value').textContent = ram + '%';
        document.getElementById('gpu-value').textContent = gpu + '°C';
        cpuBar.style.width = cpu + '%';
        document.getElementById('ram-bar').style.width = ram + '%';
        const gpuBar = document.getElementById('gpu-bar');
        gpuBar.style.width = gpu + '%';
        gpuBar.style.backgroundColor = (gpu > 55) ? '#ff5f56' : '#a855f7';
    }, 2000);
}

// ==========================================
// 11. КНОПКА "НАВЕРХ"
// ==========================================
const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = (window.scrollY > 300) ? 'flex' : 'none';
    });
    scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

// ==========================================
// 12. МАТРИЧНЫЙ ДОЖДЬ
// ==========================================
const matrixCanvas = document.createElement('canvas');
matrixCanvas.id = 'matrix-rain';
document.body.prepend(matrixCanvas);
const mCtx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;
matrixCanvas.style.position = 'fixed';
matrixCanvas.style.top = '0';
matrixCanvas.style.left = '0';
matrixCanvas.style.zIndex = '-2';
matrixCanvas.style.opacity = '0.4';
const matrixChars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = matrixCanvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;
setInterval(() => {
    mCtx.fillStyle = 'rgba(15, 15, 15, 0.05)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mCtx.fillStyle = '#4ade80';
    mCtx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}, 50);

// ==========================================
// 14. МИНИ-ТЕРМИНАЛ (расширенный)
// ==========================================
const termInput = document.getElementById('terminal-input');
const termOutput = document.getElementById('terminal-output');

if (termInput && termOutput) {
    const cmdHistory = [];

    const printLine = (text, color = '#3b82f6', pre = false) => {
        const el = document.createElement(pre ? 'pre' : 'p');
        el.style.color = color;
        if (pre) el.style.whiteSpace = 'pre-wrap';
        el.textContent = text;
        termOutput.appendChild(el);
        termOutput.scrollTop = termOutput.scrollHeight;
    };

    const commands = {
        help: "Команды: help, about, clear, matrix, date, user, ascii, whoami, ip, dns <host>, headers, theme <color>, open <tab>, history",
        about: "Я — Fadr. Этот терминал написан на чистом JavaScript.",
        date: new Date().toLocaleString('ru-RU'),
        matrix: "Матрица уже вокруг тебя..."
    };

    async function runCommand(raw) {
        const trimmed = raw.trim();
        if (!trimmed) return;

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        const echo = document.createElement('p');
        echo.innerHTML = `$ ${trimmed}`;
        termOutput.appendChild(echo);
        cmdHistory.push(trimmed);

        if (cmd === 'clear') {
            termOutput.innerHTML = '';
            return;
        }

        if (cmd === 'user') {
            printLine([
                `ОС: ${navigator.platform}`,
                `Браузер: ${navigator.userAgent}`,
                `Язык: ${navigator.language}`,
                `Экран: ${window.screen.width}x${window.screen.height}`,
                `Онлайн: ${navigator.onLine ? 'Да' : 'Нет'}`,
                `Часовой пояс: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`
            ].join('\n'), '#3b82f6', true);
            return;
        }

        if (cmd === 'whoami') {
            const ua = navigator.userAgent;
            let os = 'Неизвестно';
            if (/Windows NT 10/.test(ua)) os = 'Windows 10/11';
            else if (/Windows NT 6\.3/.test(ua)) os = 'Windows 8.1';
            else if (/Mac OS X/.test(ua)) os = 'macOS';
            else if (/Android/.test(ua)) os = 'Android';
            else if (/iPhone|iPad/.test(ua)) os = 'iOS';
            else if (/Linux/.test(ua)) os = 'Linux';

            let browser = 'Неизвестно';
            if (/Edg\//.test(ua)) browser = 'Edge';
            else if (/OPR\//.test(ua)) browser = 'Opera';
            else if (/Firefox\//.test(ua)) browser = 'Firefox';
            else if (/Chrome\//.test(ua)) browser = 'Chrome';
            else if (/Safari\//.test(ua)) browser = 'Safari';

            printLine([
                `ОС: ${os}`,
                `Браузер: ${browser}`,
                `Ядер: ${navigator.hardwareConcurrency || '—'}`,
                `Память: ${navigator.deviceMemory ? navigator.deviceMemory + ' ГБ' : '—'}`,
                `Экран: ${window.screen.width}x${window.screen.height}`,
                `Язык: ${navigator.language}`
            ].join('\n'), '#4ade80', true);
            return;
        }

        if (cmd === 'ascii') {
            printLine(`
  ███████╗ █████╗ ██████╗ ██████╗ 
  ██╔════╝██╔══██╗██╔══██╗██╔══██╗
  █████╗  ███████║██║  ██║██████╔╝
  ██╔══╝  ██╔══██║██║  ██║██╔══██╗
  ██║     ██║  ██║██████╔╝██║  ██║
  ╚═╝     ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ 
`, '#4ade80', true);
            return;
        }

        if (cmd === 'ip') {
            printLine('Запрос...', '#888');
            try {
                const res = await fetch('https://hackmyip.com/api/ip');
                const data = await res.json();
                if (data.error) throw new Error(data.reason || 'ошибка');
                printLine([
    `IP: ${d.ip}`,
    `Страна: ${d.country || '—'}`,
    `Город: ${d.city || '—'}`,
    `Провайдер: ${d.isp || '—'}`,
    `ASN: ${d.asn || '—'}`
].join('\n'), '#4ade80', true);
            } catch (e) {
                printLine(`Ошибка: ${e.message}`, '#ff5f56');
            }
            return;
        }

        if (cmd === 'dns') {
            const host = args[0];
            if (!host) { printLine('Использование: dns <host>', '#ffbd2e'); return; }
            printLine(`DNS-запрос для ${host}...`, '#888');
            try {
                const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(host)}&type=A`);
                const data = await res.json();
                if (!data.Answer || data.Answer.length === 0) {
                    printLine(`Нет A-записей для ${host}`, '#ffbd2e');
                    return;
                }
                const lines = data.Answer.map(a => `▸ ${a.data} (TTL ${a.TTL}s)`);
                printLine(`${host} — A:\n${lines.join('\n')}`, '#4ade80', true);
            } catch (e) {
                printLine(`Ошибка: ${e.message}`, '#ff5f56');
            }
            return;
        }

        if (cmd === 'headers') {
            printLine('Запрос заголовков...', '#888');
            try {
                const res = await fetch('https://httpbin.org/headers');
                const data = await res.json();
                const lines = Object.entries(data.headers).map(([k, v]) => `${k}: ${v}`);
                printLine(lines.join('\n'), '#4ade80', true);
            } catch (e) {
                printLine(`Ошибка: ${e.message}`, '#ff5f56');
            }
            return;
        }

        if (cmd === 'theme') {
            const color = args[0];
            if (!color || !/^#[0-9a-f]{6}$/i.test(color)) {
                printLine('Использование: theme #4ade80', '#ffbd2e');
                return;
            }
            if (typeof changeAccent === 'function') {
                changeAccent(color);
                printLine(`Акцент изменён на ${color}`, '#4ade80');
            } else {
                printLine('Функция changeAccent не найдена', '#ff5f56');
            }
            return;
        }

        if (cmd === 'open') {
            const tab = args[0];
            const map = { home: 'tab-home', osint: 'tab-osint', tools: 'tab-tools', about: 'tab-about-page' };
            if (!tab || !map[tab]) {
                printLine('Использование: open home|osint|tools|about', '#ffbd2e');
                return;
            }
            if (typeof openTab === 'function') {
                openTab(map[tab]);
                printLine(`Открыта вкладка: ${tab}`, '#4ade80');
            } else {
                printLine('Функция openTab не найдена', '#ff5f56');
            }
            return;
        }

        if (cmd === 'history') {
            if (cmdHistory.length === 0) { printLine('История пуста', '#888'); return; }
            printLine(cmdHistory.map((c, i) => `${i + 1}. ${c}`).join('\n'), '#4ade80', true);
            return;
        }

        if (commands[cmd]) {
            printLine(commands[cmd], '#3b82f6');
            return;
        }

        printLine(`Команда не найдена: ${cmd}. Введи 'help'.`, '#ff5f56');
    }

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runCommand(termInput.value);
            termInput.value = '';
        }
    });
}

// ==========================================
// 15. СВЕЧЕНИЕ ЗА МЫШКОЙ
// ==========================================
const glow = document.createElement('div');
glow.id = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// ==========================================
// 16. ТАЙМЕР ПОМОДОРО
// ==========================================
const pomodoroDisplay = document.getElementById('pomodoro-display');
const startBtn = document.getElementById('pomodoro-start');
const resetBtn = document.getElementById('pomodoro-reset');
if (pomodoroDisplay && startBtn && resetBtn) {
    let pomodoroTime = 25 * 60;
    let pomodoroInterval;
    const updateDisplay = () => {
        const minutes = Math.floor(pomodoroTime / 60);
        const seconds = pomodoroTime % 60;
        pomodoroDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    startBtn.addEventListener('click', () => {
        if (pomodoroInterval) {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            startBtn.textContent = 'Старт';
        } else {
            startBtn.textContent = 'Пауза';
            pomodoroInterval = setInterval(() => {
                if (pomodoroTime > 0) {
                    pomodoroTime--;
                    updateDisplay();
                } else {
                    clearInterval(pomodoroInterval);
                    pomodoroInterval = null;
                    startBtn.textContent = 'Старт';
                    alert("Время вышло! Пора отдохнуть.");
                    pomodoroTime = 25 * 60;
                    updateDisplay();
                }
            }, 1000);
        }
    });
    resetBtn.addEventListener('click', () => {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        startBtn.textContent = 'Старт';
        pomodoroTime = 25 * 60;
        updateDisplay();
    });
}

// ==========================================
// 17. БЛОКНОТ
// ==========================================
const notepad = document.getElementById('notepad');
if (notepad) {
    const savedText = localStorage.getItem('myNotepad');
    if (savedText) notepad.value = savedText;
    notepad.addEventListener('input', () => {
        localStorage.setItem('myNotepad', notepad.value);
    });
}

// ==========================================
// 18. ПОГОДА (Резервный API wttr.in)
// ==========================================
const weatherBtn = document.getElementById('weather-btn');
if (weatherBtn) {
    weatherBtn.addEventListener('click', async () => {
        const cityInput = document.getElementById('city-input');
        const resultBox = document.getElementById('weather-result');
        
        if (!cityInput || !resultBox) return;
        const city = cityInput.value.trim();
        if (!city) return alert("Введи город!");

        resultBox.innerHTML = "Загрузка...";

        try {
            const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Город не найден");
            
            const data = await response.json();
            const current = data.current_condition[0];
            const temp = current.temp_C;
            const desc = current.lang_ru ? current.lang_ru[0].value : current.weatherDesc[0].value;

            resultBox.innerHTML = `
                <div class="weather-temp">${temp}°C</div>
                <div class="weather-desc">${city}: ${desc}</div>
            `;
        } catch (error) {
            console.error("Ошибка погоды:", error);
            resultBox.innerHTML = "Ошибка: город не найден или нет связи.";
        }
    });
}

// ==========================================
// 19. IP / DOMAIN ИНСТРУМЕНТ
// ==========================================
const targetBtn = document.getElementById('target-btn');
if (targetBtn) {
    targetBtn.addEventListener('click', () => {
        const target = document.getElementById('target-input').value.trim();
        if (!target) return alert("Введи IP или домен!");
        const services = [`https://www.virustotal.com/gui/ip-address/${target}`, `https://www.shodan.io/host/${target}`, `https://2ip.ru/whois/${target}`, `https://whois.ru/${target}`];
        services.forEach(url => window.open(url, '_blank'));
    });
}

// ==========================================
// 20. ИНТЕРАКТИВНЫЙ ТАЙМЛАЙН
// ==========================================
function toggleTimeline(element) {
    if(element && element.parentElement) {
        element.parentElement.classList.toggle('active');
    }
}

// ==========================================
// 21. УПРАВЛЕНИЕ ГЛАВНЫМИ ВКЛАДКАМИ (Боковая панель)
// ==========================================
function openTab(tabId) {
    document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(tabId);
    if (targetPage) targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 22. АККОРДЕОН
// ==========================================
function toggleSection(headerElement) {
    if(!headerElement || !headerElement.parentElement) return;
    const section = headerElement.parentElement;
    if (section.classList.contains('tab-content')) return;
    section.classList.toggle('active');
}

// ==========================================
// 23. СМЕНА ЦВЕТА АКЦЕНТА
// ==========================================
function changeAccent(color) {
    localStorage.setItem('accentColor', color);
    document.documentElement.style.setProperty('--accent-color', color);
    const logoSpan = document.querySelector('.sidebar-logo span');
    if (logoSpan) logoSpan.style.color = color;
}

// ==========================================
// 24. ЗАЩИТА ССЫЛОК ОТ ПЕРЕХВАТА
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const allLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto"]');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
        changeAccent(savedColor);
    } else {
                changeAccent('#38bdf8'); // Голубой ледяной цвет
    }
});

// ==========================================
// 25. ПРОВЕРКА УТЕЧЕК EMAIL (XposedOrNot через прокси)
// ==========================================
const emailBtn = document.getElementById('email-check-btn');
if (emailBtn) {
    emailBtn.addEventListener('click', async () => {
        const emailInput = document.getElementById('email-input');
        const resultBox = document.getElementById('email-result');
        
        if (!emailInput || !resultBox) return;
        const email = emailInput.value.trim();
        if (!email) return alert("Введи email!");

        resultBox.innerHTML = "Проверка...";

        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const targetUrl = `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`;
            
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            
            if (!response.ok) {
                if (response.status === 404) {
                    resultBox.innerHTML = "✅ Этот email не найден в известных утечках.";
                    return;
                }
                throw new Error("Ошибка сервера");
            }

            const data = await response.json();
            
            if (data && data.breaches && data.breaches.length > 0) {
                let html = `<p style="color: #ff5f56; font-weight: bold;">⚠️ Найдено в ${data.breaches.length} утечках:</p><ul style="color: #d1d1d1; margin-top: 5px;">`;
                data.breaches.forEach(breach => {
                    html += `<li>${breach}</li>`;
                });
                html += `</ul>`;
                resultBox.innerHTML = html;
            } else {
                resultBox.innerHTML = "✅ Этот email не найден в известных утечках.";
            }
        } catch (error) {
            console.error("Ошибка проверки:", error);
            resultBox.innerHTML = "❌ Ошибка соединения. Попробуй позже.";
        }
    });
}

// ==========================================
// 26. ПРЕЛОАДЕР (СЧЕТЧИК ДО 100%)
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const logBox = document.getElementById('loader-log');
    const percentBox = document.getElementById('loader-percent');
    const fillBar = document.querySelector('.scanner-fill'); 
    
    if (preloader && logBox && fillBar && percentBox) {
        const logs = [
            "[SYSTEM] BOOTING...",
            "[OK] LOADING MODULES...",
            "[OK] CONNECTING...",
            "[OK] DECRYPTING...",
            "[SYSTEM] ACCESS GRANTED."
        ];
        
        let currentLine = 0;
        let currentChar = 0;
        let currentPercent = 0;
        
        // 1. Анимация процентов (долетает до 100%)
        const percentInterval = setInterval(() => {
            if (currentPercent < 100) {
                // Прибавляем случайно от 2 до 6, чтобы было похоже на реальную загрузку
                currentPercent += Math.floor(Math.random() * 2) + 2; 
                if (currentPercent > 100) currentPercent = 100;
                
                percentBox.textContent = currentPercent + '%';
                fillBar.style.width = currentPercent + '%';
            } else {
                clearInterval(percentInterval);
            }
        }, 80); 

        // 2. Печать текста в терминале
        function typeLog() {
            if (currentLine < logs.length) {
                if (currentChar < logs[currentLine].length) {
                    logBox.innerHTML += logs[currentLine][currentChar];
                    currentChar++;
                    setTimeout(typeLog, 20); // Скорость печати текста
                } else {
                    logBox.innerHTML += "<br>";
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeLog, 150); // Пауза между строками
                }
            } else {
                // Когда текст закончился
                checkFinish();
            }
        }
        
        // 3. Проверка, что и текст, и проценты закончились
        function checkFinish() {
            // Если проценты все еще грузятся, ждем
            if (currentPercent < 100) {
                setTimeout(checkFinish, 100);
                return;
            }
            
            // Если проценты и текст готовы — даем паузу 800мс (чтобы прочитать "ACCESS GRANTED")
            // и запускаем исчезновение
            setTimeout(() => {
                preloader.classList.add('explode'); 
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800); // Время анимации разлета (совпадает с CSS)
            }, 800); 
        }
        
        setTimeout(typeLog, 200); // Задержка перед стартом печати
    } else {
        if(preloader) preloader.style.display = 'none';
    }
});
// ==========================================
// 27. ЭФФЕКТ "ВЗЛОМА" ДЛЯ НИКА (ГЛИТЧ + СВЕЧЕНИЕ)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('header h1');
    if (!h1) return;

    const finalText = h1.textContent;
    const chars = "!<>-_\\/[]{}—=+*^?#________"; // Символы для глитча
    let iteration = 0;

    // Очищаем текст
    h1.textContent = '';

    // Пауза перед началом (1.5 секунды), чтобы ты успел увидеть
    setTimeout(() => {
        const interval = setInterval(() => {
            h1.textContent = finalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return finalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            // Когда все буквы "взломаны"
            if (iteration >= finalText.length) {
                clearInterval(interval);
                // Добавляем класс для финального свечения
                h1.style.textShadow = '0 0 20px var(--accent-color, #4ade80), 0 0 40px var(--accent-color, #4ade80)';
                setTimeout(() => {
                    h1.style.textShadow = 'none';
                }, 1000);
            }

            iteration += 1 / 5; // Скорость расшифровки (чем меньше, тем медленнее)
        }, 30); // частота обновления (50мс)
    }, 4000); // задержка перед стартом
});

// ==========================================
// 29. ПАСХАЛКА: ВЗЛОМ (CTRL + SHIFT + H)
// ==========================================
document.addEventListener('keydown', (e) => {
    // проверка комбинации: Ctrl + Shift + H
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyH') {
        e.preventDefault();
        
        const overlay = document.getElementById('hack-overlay');
        const logBox = document.getElementById('hack-log');
        
        if (!overlay || !logBox) return;

        // очищаем и показываем
        logBox.innerHTML = '';
        overlay.classList.add('active');

        // Ускоряем матрицу (если она есть)
        const matrixInterval = setInterval(() => {
            // Просто дергаем матрицу чаще (если есть функция draw)
            // Для простоты просто добавим визуальный шум
            if (window.mCtx && window.matrixCanvas) {
                window.mCtx.fillStyle = 'rgba(15, 15, 15, 0.1)';
                window.mCtx.fillRect(0, 0, window.matrixCanvas.width, window.matrixCanvas.height);
            }
        }, 20);

        // Текст для вывода
        const lines = [
            "> INITIATING BREACH PROTOCOL...",
            "> BYPASSING FIREWALL [OK]",
            "> INJECTING PAYLOAD [OK]",
            "> ESCALATING PRIVILEGES [ROOT]",
            "> DOWNLOADING USER DATA...",
            "> 100% COMPLETE",
            "> ACCESS GRANTED."
        ];

        let currentLine = 0;
        
        function typeLine() {
            if (currentLine < lines.length) {
                const p = document.createElement('p');
                p.textContent = lines[currentLine];
                
                // Последняя строка — особая
                if (currentLine === lines.length - 1) {
                    p.className = 'success';
                }
                
                logBox.appendChild(p);
                logBox.scrollTop = logBox.scrollHeight;
                currentLine++;
                setTimeout(typeLine, 400); // Скорость появления строк
            } else {
                // Через 3 секунды закрываем
                setTimeout(() => {
                    overlay.classList.remove('active');
                    clearInterval(matrixInterval);
                    // Восстанавливаем матрицу (если нужно)
                }, 3000);
            }
        }

        setTimeout(typeLine, 300);
    }
});
// ==========================================
// 30. DNS LOOKUP (Google Public DNS JSON API)
// ==========================================
const dnsBtn = document.getElementById('dns-btn');
if (dnsBtn) {
    dnsBtn.addEventListener('click', async () => {
        const name = document.getElementById('dns-input').value.trim();
        const type = document.getElementById('dns-type').value;
        const resultBox = document.getElementById('dns-result');
        if (!name) return alert("Введи домен!");
        resultBox.textContent = "Запрос...";

        try {
            const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            if (!data.Answer || data.Answer.length === 0) {
                resultBox.innerHTML = `<span style="color:#ffbd2e;">Нет записей типа ${type} для ${name}</span>`;
                return;
            }

            let html = `<p style="color:#4ade80; font-weight:bold;">${name} — ${type} (${data.Answer.length} записей):</p>`;
            data.Answer.forEach(a => {
                html += `<p style="margin:4px 0; color:#d1d1d1;">▸ ${a.data} <span style="color:#666;">(TTL: ${a.TTL}s)</span></p>`;
            });
            resultBox.innerHTML = html;
        } catch (e) {
            resultBox.innerHTML = `<span style="color:#ff5f56;">Ошибка: ${e.message}</span>`;
        }
    });
}

// ==========================================
// 31. SHODAN INTERNETDB
// ==========================================
const shodanBtn = document.getElementById('shodan-btn');
if (shodanBtn) {
    shodanBtn.addEventListener('click', async () => {
        const ip = document.getElementById('shodan-input').value.trim();
        const resultBox = document.getElementById('shodan-result');
        if (!ip) return alert("Введи IP!");
        resultBox.textContent = "Запрос...";

        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const targetUrl = `https://internetdb.shodan.io/${encodeURIComponent(ip)}`;
            const res = await fetch(proxyUrl + encodeURIComponent(targetUrl));
            if (res.status === 404) {
                resultBox.innerHTML = `<span style="color:#ffbd2e;">IP ${ip} не найден в InternetDB (нет данных)</span>`;
                return;
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            let html = `<p style="color:#4ade80; font-weight:bold;">${ip}</p>`;

            if (data.ports && data.ports.length) {
                html += `<p style="color:#3b82f6;">Открытые порты:</p>`;
                html += `<p style="margin-left:10px; color:#d1d1d1;">${data.ports.join(', ')}</p>`;
            } else {
                html += `<p style="color:#666;">Порты: нет данных</p>`;
            }

            if (data.hostnames && data.hostnames.length) {
                html += `<p style="color:#3b82f6; margin-top:8px;">Хостнеймы:</p>`;
                html += `<p style="margin-left:10px; color:#d1d1d1;">${data.hostnames.join('<br>')}</p>`;
            }

            if (data.vulns && data.vulns.length) {
                html += `<p style="color:#ff5f56; margin-top:8px;">CVE (${data.vulns.length}):</p>`;
                html += `<p style="margin-left:10px; color:#ff5f56;">${data.vulns.join('<br>')}</p>`;
            } else {
                html += `<p style="color:#27c93f; margin-top:8px;">CVE: не найдено</p>`;
            }

            if (data.tags && data.tags.length) {
                html += `<p style="color:#a855f7; margin-top:8px;">Теги: ${data.tags.join(', ')}</p>`;
            }

            resultBox.innerHTML = html;
        } catch (e) {
            resultBox.innerHTML = `<span style="color:#ff5f56;">Ошибка: ${e.message}</span>`;
        }
    });
}

// ==========================================
// 32. IP GEO / ISP (HackMyIP)
// ==========================================
const ipinfoBtn = document.getElementById('ipinfo-btn');
if (ipinfoBtn) {
    ipinfoBtn.addEventListener('click', async () => {
        const ip = document.getElementById('ipinfo-input').value.trim();
        const resultBox = document.getElementById('ipinfo-result');
        if (!ip) return alert("Введи IP!");
        resultBox.textContent = "Запрос...";

        try {
            const res = await fetch(`https://hackmyip.com/api/lookup?ip=${encodeURIComponent(ip)}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            // Достаем данные
            const d = data.data || data;

            if (!d || !d.ip) {
                resultBox.innerHTML = `<span style="color:#ff5f56;">IP не найден или ошибка API</span>`;
                return;
            }

            // Формируем вывод
            const fields = [
                ['IP', d.ip],
                ['Страна', d.country || d.country_code || '—'],
                ['Город', d.city || '—'],
                ['Провайдер', d.isp || d.org || '—'],
                ['ASN', d.asn || '—']
            ];

            let html = `<p style="color:#4ade80; font-weight:bold;">Инфо по ${ip}</p>`;
            fields.forEach(([label, value]) => {
                if (value && value !== '—') {
                    html += `<p style="margin:4px 0;"><span style="color:#888;">${label}:</span> <span style="color:#d1d1d1;">${value}</span></p>`;
                }
            });
            resultBox.innerHTML = html;

        } catch (e) {
            resultBox.innerHTML = `<span style="color:#ff5f56;">Ошибка: ${e.message}</span>`;
        }
    });
}
// ==========================================
// 33. ГЕНЕРАТОР GOOGLE DORKS
// ==========================================
const dorkBtn = document.getElementById('dork-btn');
if (dorkBtn) {
    dorkBtn.addEventListener('click', () => {
        const domain = document.getElementById('dork-input').value.trim();
        const resultBox = document.getElementById('dork-result');
        
        if (!domain) return alert("Введи домен!");
        
        // Очищаем домен от лишних символов (http, www, слэши)
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
        
        // Список Dorks-запросов
        const dorks = [
            { title: "PDF документы", query: `site:${cleanDomain} ext:pdf` },
            { title: "Документы Word", query: `site:${cleanDomain} ext:doc | ext:docx` },
            { title: "Таблицы Excel", query: `site:${cleanDomain} ext:xls | ext:xlsx` },
            { title: "Открытые директории (Index of)", query: `site:${cleanDomain} intitle:"index of"` },
            { title: "Админ-панели", query: `site:${cleanDomain} inurl:admin | inurl:login | inurl:dashboard` },
            { title: "Конфигурационные файлы", query: `site:${cleanDomain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf` },
            { title: "SQL дампы", query: `site:${cleanDomain} ext:sql | ext:db` },
            { title: "Логи и бэкапы", query: `site:${cleanDomain} ext:log | ext:bak | ext:old` },
            { title: "Ошибки и стектрейсы", query: `site:${cleanDomain} intext:"Fatal error" | intext:"SQL syntax"` },
            { title: "Субдомены", query: `site:*.${cleanDomain} -www` }
        ];
        
        let html = '';
        dorks.forEach(dork => {
            // Кодируем запрос для URL
            const encodedQuery = encodeURIComponent(dork.query);
            // Ссылка на поиск в Google
            const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
            
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #151515; border: 1px solid #333; padding: 10px 15px; border-radius: 5px;">
                    <div>
                        <div style="color: #fff; font-weight: bold; font-size: 0.95rem;">${dork.title}</div>
                        <div style="color: #888; font-family: monospace; font-size: 0.8rem; margin-top: 4px;">${dork.query}</div>
                    </div>
                    <a href="${googleUrl}" target="_blank" style="background: var(--accent-color, #4ade80); color: #000; text-decoration: none; padding: 8px 12px; border-radius: 5px; font-weight: bold; font-size: 0.85rem; white-space: nowrap;">
                        Искать <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 5px;"></i>
                    </a>
                </div>
            `;
        });
        
        resultBox.innerHTML = html;
    });
}
// ==========================================
// 35. МОБИЛЬНОЕ МЕНЮ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('mobile-overlay');

    if (mobileBtn && sidebar && overlay) {
        // Открыть/Закрыть
        const toggleMenu = () => {
            sidebar.classList.toggle('active');
            overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
        };

        mobileBtn.addEventListener('click', toggleMenu);
        
        // Закрыть по клику на затемнение
        overlay.addEventListener('click', toggleMenu);

        // Закрыть при клике на любой пункт меню
        const menuItems = document.querySelectorAll('.sidebar-menu li');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.style.display = 'none';
                }
            });
        });
    }
});

// ==========================================
// 36. TOASTS (КРАСИВЫЕ УВЕДОМЛЕНИЯ)
// ==========================================
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-circle-info';
    if (type === 'error') icon = 'fa-circle-exclamation';
    if (type === 'success') icon = 'fa-circle-check';
    
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// ==========================================
// 37. EXIF АНАЛИЗ ФОТО
// ==========================================
const exifInput = document.getElementById('exif-input');
const exifResult = document.getElementById('exif-result');

if (exifInput && exifResult) {
    exifInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        exifResult.innerHTML = "Анализ...";
        
        EXIF.getData(file, function() {
            const exifData = EXIF.getAllTags(this);
            
            if (Object.keys(exifData).length === 0) {
                exifResult.innerHTML = `<span style="color:#ffbd2e;">Метаданные не найдены (возможно, фото было сжато или сделано скриншотом).</span>`;
                return;
            }

            let html = `<p style="color:#4ade80; font-weight:bold; margin-bottom:10px;">Найдены метаданные:</p>`;
            
            // Основные поля
            const fields = [
                ['Камера', exifData.Make + ' ' + (exifData.Model || '')],
                ['Дата съемки', exifData.DateTimeOriginal || exifData.DateTime],
                ['Вспышка', exifData.Flash ? 'Использовалась' : 'Нет'],
                ['ISO', exifData.ISOSpeedRatings],
                ['Фокусное расстояние', exifData.FocalLength ? exifData.FocalLength + ' mm' : null]
            ];

            fields.forEach(([label, value]) => {
                if (value && value !== 'undefined undefined') {
                    html += `<p style="margin:4px 0;"><span style="color:#888;">${label}:</span> <span style="color:#d1d1d1;">${value}</span></p>`;
                }
            });

            // GPS
            if (exifData.GPSLatitude && exifData.GPSLongitude) {
                const lat = exifData.GPSLatitude[0] + (exifData.GPSLatitude[1]/60) + (exifData.GPSLatitude[2]/3600);
                const lon = exifData.GPSLongitude[0] + (exifData.GPSLongitude[1]/60) + (exifData.GPSLongitude[2]/3600);
                const latRef = exifData.GPSLatitudeRef === 'S' ? -1 : 1;
                const lonRef = exifData.GPSLongitudeRef === 'W' ? -1 : 1;
                
                const finalLat = (lat * latRef).toFixed(6);
                const finalLon = (lon * lonRef).toFixed(6);
                
                html += `<p style="margin-top:10px; color:#ff5f56; font-weight:bold;">GPS Координаты найдены!</p>`;
                html += `<p style="margin:4px 0;"><span style="color:#888;">Широта:</span> <a href="https://www.google.com/maps?q=${finalLat},${finalLon}" target="_blank" style="color:#4ade80; text-decoration:underline;">${finalLat}</a></p>`;
                html += `<p style="margin:4px 0;"><span style="color:#888;">Долгота:</span> <a href="https://www.google.com/maps?q=${finalLat},${finalLon}" target="_blank" style="color:#4ade80; text-decoration:underline;">${finalLon}</a></p>`;
            } else {
                html += `<p style="margin-top:10px; color:#888;">GPS: не найдено</p>`;
            }

            exifResult.innerHTML = html;
        });
    });
}
// ==========================================
// 38. ПОИСК ПО НОМЕРУ ТЕЛЕФОНА
// ==========================================
const phoneBtn = document.getElementById('phone-btn');
if (phoneBtn) {
    phoneBtn.addEventListener('click', () => {
        const phoneInput = document.getElementById('phone-input').value.trim();
        const resultBox = document.getElementById('phone-result');
        
        if (!phoneInput) return showToast("Введи номер!", "error");

        // Очищаем номер от всего, кроме цифр и плюса
        let cleanPhone = phoneInput.replace(/[^\d+]/g, '');
        
        // Если номер начинается с 8 (Россия), меняем на +7
        if (cleanPhone.startsWith('8') && cleanPhone.length === 11) {
            cleanPhone = '+7' + cleanPhone.substring(1);
        }
        // Если номер без плюса, но начинается с 7 (Россия), добавляем плюс
        else if (cleanPhone.startsWith('7') && cleanPhone.length === 11) {
            cleanPhone = '+' + cleanPhone;
        }

        // Убираем плюс для некоторых сервисов (они его не любят в URL)
        const phoneNoPlus = cleanPhone.replace('+', '');

        // Определяем оператора (базовая логика для РФ)
        let operatorInfo = "Неизвестный оператор";
        if (cleanPhone.startsWith('+79')) operatorInfo = "Россия (МТС, Мегафон, Билайн, Tele2)";
        else if (cleanPhone.startsWith('+380')) operatorInfo = "Украина (Киевстар, Vodafone, Lifecell)";
        else if (cleanPhone.startsWith('+375')) operatorInfo = "Беларусь (МТС, А1, life:)";
        else if (cleanPhone.startsWith('+77')) operatorInfo = "Казахстан (Beeline, Kcell, Tele2)";

        // Формируем ссылки на сервисы
        const links = [
            { name: "Truecaller", url: `https://www.truecaller.com/search/ru/${cleanPhone}`, icon: "fa-address-book" },
            { name: "GetContact", url: `https://getcontact.com/profile/${phoneNoPlus}`, icon: "fa-id-card" },
            { name: "WhatsApp", url: `https://wa.me/${phoneNoPlus}`, icon: "fa-brands fa-whatsapp" },
            { name: "Telegram", url: `https://t.me/+${phoneNoPlus}`, icon: "fa-brands fa-telegram" },
            { name: "NumBuster", url: `https://numbuster.com/ru/search/?q=${cleanPhone}`, icon: "fa-magnifying-glass" }
        ];

        let html = `<p style="color:#4ade80; font-weight:bold; margin-bottom:5px;">Номер: ${cleanPhone}</p>`;
        html += `<p style="color:#888; font-size:0.85rem; margin-bottom:15px;">Регион: ${operatorInfo}</p>`;
        
        html += `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:10px;">`;
        
        links.forEach(link => {
            html += `
                <a href="${link.url}" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:8px; background:rgba(255,255,255,0.05); border:1px solid #333; padding:10px; color:#fff; text-decoration:none; font-size:0.9rem; transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent-color)'; this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.borderColor='#333'; this.style.background='rgba(255,255,255,0.05)'">
                    <i class="fa-solid ${link.icon}" style="color:var(--accent-color);"></i> ${link.name}
                </a>
            `;
        });
        
        html += `</div>`;
        resultBox.innerHTML = html;
    });
}
// ==========================================
// 39. ЗИМНИЙ СНЕГОПАД (3D СНЕЖИНКИ)
// ==========================================

const snowCanvas = document.createElement('canvas');
snowCanvas.id = 'snow-canvas';
document.body.prepend(snowCanvas);
const sCtx = snowCanvas.getContext('2d');

snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
});

const snowflakes = [];
const snowCount = 100; // Количество снежинок
const snowChars = ["❅", "❆", "✧", "❄"]; // Разные виды снежинок

for (let i = 0; i < snowCount; i++) {
    snowflakes.push({
        x: Math.random() * snowCanvas.width,
        y: Math.random() * snowCanvas.height,
        radius: Math.random() * 6 + 2, // Размер (от 2 до 8)
        speedY: Math.random() * 1.5 + 0.5, // Скорость падения
        speedX: Math.random() * 0.5 - 0.25, // Колыхание
        opacity: Math.random() * 0.6 + 0.2,
        char: snowChars[Math.floor(Math.random() * snowChars.length)]
    });
}

function drawSnow() {
    sCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    
    snowflakes.forEach(flake => {
        sCtx.globalAlpha = flake.opacity;
        sCtx.fillStyle = '#ffffff';
        sCtx.font = flake.radius * 4 + 'px Arial'; // Размер шрифта зависит от "глубины"
        sCtx.fillText(flake.char, flake.x, flake.y);
        
        // Обновляем позицию
        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.y / 50) * 0.5; // Волнообразное падение
        
        // Если снежинка упала за экран, возвращаем её наверх
        if (flake.y > snowCanvas.height) {
            flake.y = -20;
            flake.x = Math.random() * snowCanvas.width;
        }
    });
    
    sCtx.globalAlpha = 1;
    requestAnimationFrame(drawSnow);
}

drawSnow();


// ==========================================
// 41. СНЕЖИНКИ ПРИ КЛИКЕ
// ==========================================
document.addEventListener('click', (e) => {
    // Игнорируем клики по кнопкам ввода, чтобы не мешать
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;

    for (let i = 0; i < 10; i++) { // 10 снежинок за клик
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❅'; // Символ снежинки
        snowflake.style.position = 'fixed';
        snowflake.style.left = e.clientX + 'px';
        snowflake.style.top = e.clientY + 'px';
        snowflake.style.color = '#fff';
        snowflake.style.fontSize = Math.random() * 15 + 10 + 'px';
        snowflake.style.pointerEvents = 'none';
        snowflake.style.zIndex = '9999';
        snowflake.style.transition = 'all 1s ease-out';
        snowflake.style.textShadow = '0 0 5px rgba(255,255,255,0.8)';
        
        document.body.appendChild(snowflake);
        
        // Разлетаемся в случайные стороны
        const xMove = (Math.random() - 0.5) * 200;
        const yMove = (Math.random() - 0.5) * 200 + 100; // Чуть больше вниз
        
        requestAnimationFrame(() => {
            snowflake.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random() * 360}deg)`;
            snowflake.style.opacity = '0';
        });
        
        // Удаляем через секунду
        setTimeout(() => snowflake.remove(), 1000);
    }
});
// ==========================================
// 42. ПЛАВНЫЙ СКРОЛЛ (LENIS)
// ==========================================
if (window.innerWidth > 768) { // Отключаем на мобилках, чтобы не лагало
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}