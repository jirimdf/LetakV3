// Hlavní třída pro vytvoření a správu interaktivního letáku
class FlipBook {
  constructor(bookId, path) {
    this.book = document.getElementById(bookId);
    this.path = path;
    
    // --- INICIALIZACE ZVUKŮ ---
    this.flipSounds = [
      new Audio('Sounds/1.mp3'),
      new Audio('Sounds/2.mp3'),
      new Audio('Sounds/3.mp3')
    ];
    this.flipSounds.forEach(snd => snd.volume = 0.5);
    
    this.soundEnabled = true;

    // --- LOGIKA MENU A TLAČÍTEK ---
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const toggleShadowBtn = document.getElementById('toggleShadowBtn');
    const toggleSoundBtn = document.getElementById('toggleSoundBtn');
    const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
    const toggleProgressBtn = document.getElementById('toggleProgressBtn'); // Nové tlačítko pro Progres

    // Tlačítko: TMAVÝ REŽIM (Dark Mode)
    if (toggleDarkModeBtn) {
      toggleDarkModeBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        
        if (isDark) {
          toggleDarkModeBtn.innerText = 'ZAPNUTO';
          toggleDarkModeBtn.classList.replace('off', 'on');
        } else {
          toggleDarkModeBtn.innerText = 'VYPNUTO';
          toggleDarkModeBtn.classList.replace('on', 'off');
        }
      });
    }

    // Otevírání a zavírání plovoucího menu nastavení
    if (settingsBtn && settingsMenu) {
      settingsBtn.addEventListener('click', () => {
        settingsMenu.classList.toggle('hidden');
      });

      // Zavření menu při kliknutí kamkoliv jinam na stránku
      document.addEventListener('click', (e) => {
        if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
          settingsMenu.classList.add('hidden');
        }
      });
    }

    // Tlačítko: PŘEPÍNAČ VNĚJŠÍHO STÍNU
    if (toggleShadowBtn) {
      toggleShadowBtn.addEventListener('click', () => {
        const hasShadow = this.book.classList.toggle('with-shadow');
        toggleShadowBtn.innerText = hasShadow ? 'ZAPNUTO' : 'VYPNUTO';
        toggleShadowBtn.classList.replace(hasShadow ? 'off' : 'on', hasShadow ? 'on' : 'off');
      });
    }

    // Tlačítko: PŘEPÍNAČ ZVUKŮ
    if (toggleSoundBtn) {
      toggleSoundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        toggleSoundBtn.innerText = this.soundEnabled ? 'ZAPNUTO' : 'VYPNUTO';
        toggleSoundBtn.classList.replace(this.soundEnabled ? 'off' : 'on', this.soundEnabled ? 'on' : 'off');
      });
    }

    // --- NOVÉ: TLAČÍTKO PRO PROGRESS BAR ---
    const progressContainer = document.getElementById('progressBarContainer');
    if (toggleProgressBtn && progressContainer) {
      toggleProgressBtn.addEventListener('click', () => {
        const isHidden = progressContainer.classList.toggle('hidden');
        toggleProgressBtn.innerText = isHidden ? 'VYPNUTO' : 'ZAPNUTO';
        toggleProgressBtn.classList.replace(isHidden ? 'on' : 'off', isHidden ? 'off' : 'on');
      });
    }

    // --- LOGIKA POSUVNÍKŮ A BAREV ---
    const root = document.documentElement;
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomValue = document.getElementById('zoomValue');
    const shadowSizeSlider = document.getElementById('shadowSizeSlider');
    const shadowStrengthSlider = document.getElementById('shadowStrengthSlider'); 
    const shadowColorPicker = document.getElementById('shadowColorPicker');
    const zoomWrapper = document.getElementById('zoomWrapper');

    // Posuvník: PŘIBLÍŽENÍ (Zoom)
    if (zoomSlider) {
      zoomSlider.addEventListener('input', (e) => {
        root.style.setProperty('--zoom', e.target.value);
        if (zoomValue) zoomValue.innerText = e.target.value + 'x';
      });
    }

    // Zkratka: RYCHLÝ ZOOM DVOJKLIKEM NA LETÁK
    if (zoomWrapper) {
      zoomWrapper.addEventListener('dblclick', () => {
        let currentZoom = parseFloat(getComputedStyle(root).getPropertyValue('--zoom')) || 1;
        let newZoom = currentZoom > 1.2 ? 1 : 2; 
        root.style.setProperty('--zoom', newZoom);
        if (zoomSlider) zoomSlider.value = newZoom;
        if (zoomValue) zoomValue.innerText = newZoom + 'x';
      });
    }

    // Posuvník: VELIKOST STÍNU
    if (shadowSizeSlider) {
      shadowSizeSlider.addEventListener('input', (e) => {
        root.style.setProperty('--shadow-size', e.target.value + 'px');
        root.style.setProperty('--shadow-offset', '0px'); 
      });
    }

    // Funkce: SPOJENÍ BARVY A PRŮHLEDNOSTI (Síla stínu)
    const updateShadowColorAndStrength = () => {
      const hexColor = shadowColorPicker ? shadowColorPicker.value : '#000000';
      const strength = shadowStrengthSlider ? parseFloat(shadowStrengthSlider.value) : 0.5;
      const alphaHex = Math.round(strength * 255).toString(16).padStart(2, '0');
      root.style.setProperty('--shadow-color', hexColor + alphaHex);
    };

    // Posuvník: SÍLA STÍNU (Opacity)
    if (shadowStrengthSlider) {
      shadowStrengthSlider.addEventListener('input', updateShadowColorAndStrength);
    }

    // Kapátko: BARVA STÍNU
    if (shadowColorPicker) {
      shadowColorPicker.addEventListener('input', updateShadowColorAndStrength);
    }

    this.initialize();
  }

  // --- AUDIO SYSTÉM ---
  // Přehraje náhodný zvuk listování, pokud nejsou zvuky vypnuté
  playFlipSound() {
    if (!this.soundEnabled) return; 

    const randomIndex = Math.floor(Math.random() * this.flipSounds.length);
    const sound = this.flipSounds[randomIndex];
    
    sound.currentTime = 0; 
    sound.play().catch(e => console.warn("Zvuk čeká na interakci uživatele"));
  }

  async initialize() {
    await this.buildPages();
  }

  // --- JÁDRO APLIKACE ---
  async buildPages() {
    
    const response = await fetch(this.path);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    // 2. Extrakce všech odkazů na soubory
    let allLinks = Array.from(doc.querySelectorAll("a"))
      .map(a => a.getAttribute("href"))
      .filter(href => href && !href.startsWith("?") && !href.endsWith("/"));

    const getFileName = (url) => {
      return decodeURIComponent(url.split('/').pop().split('?')[0]);
    };

    // 3. Chytrá filtrace: Ponechá jen obrázky pojmenované čistě čísly (1.jpg, 2.png atd.)
    let regularFiles = allLinks.filter(f => {
      const fileName = getFileName(f);
      return /^\d+\.(jpg|jpeg|png|webp)$/i.test(fileName);
    });

    // 4. Sestavení plných cest k obrázkům
    let imageUrls = regularFiles.map(file => {
      if (!file.includes('/')) return this.path + file;
      return file;
    });

    // 5. Bezpečné numerické řazení (aby 10 nebylo před 2)
    imageUrls.sort((a, b) => {
      const nameA = getFileName(a);
      const nameB = getFileName(b);
      const numA = parseInt(nameA.match(/^\d+/) || 0);
      const numB = parseInt(nameB.match(/^\d+/) || 0);
      return numA - numB;
    });

    let finalPages = [...imageUrls];

    // --- PREVENCE ROZBITÍ LAYOUTU (Auto-korekce) ---
    // Vygeneruje varovnou stránku přes HTML5 Canvas, pokud je počet stránek lichý
    const getErrorPage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffeded'; 
      ctx.fillRect(0, 0, 400, 600);
      ctx.fillStyle = '#d90000';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CHYBÍ STRÁNKA', 200, 280);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText('Počet stránek nemůže být lichý', 200, 320);
      return canvas.toDataURL('image/jpeg', 0.95);
    };

    if (finalPages.length % 2 !== 0) {
      finalPages.push(getErrorPage());
    }

    this.book.innerHTML = '';

    // 6. Vložení obrázků a stínů
    finalPages.forEach((src, index) => {
      const div = document.createElement('div');
      div.className = 'page';

      const shadowClass = (index % 2 === 0) ? 'shadow-right' : 'shadow-left';

      div.innerHTML = `
        <div class="${shadowClass}"></div>
        <img src="${src}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
      `;
      this.book.appendChild(div);
    });

    // 7. Vyčkání na úplné stažení a vykreslení všech obrázků
    const images = Array.from(this.book.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      return new Promise(resolve => {
        if (img.complete) resolve();
        else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    }));

    this.initPageFlip();
  }

  // --- INICIALIZACE KNIHOVNY PAGEFLIP ---
  initPageFlip() {
    this.book.style.transform = 'translateX(-25%)'; // Výchozí vycentrování obálky

    this.pageFlip = new St.PageFlip(this.book, {
      width: 400,
      height: 600,
      size: "stretch", // NATIVNÍ ZMENŠOVÁNÍ - srovná mapování dotyku na displej 1:1
      minWidth: 50,    // Bezpečný limit i pro ty nejmenší mobilní displeje
      maxWidth: 400,
      minHeight: 75,
      maxHeight: 600,
      showCover: true,
      usePortrait: false,
      maxShadowOpacity: 0.7, 
      drawShadow: true,
      flippingTime: 1000,
      autoCenter: false
    });

    this.pageFlip.loadFromHTML(this.book.querySelectorAll('.page'));

    // Plynulé zobrazení letáku a skrytí načítacího kolečka po inicializaci
    setTimeout(() => {
      this.book.style.opacity = '1';
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500); 
      }
    }, 50);

    let currentState = 'read'; 

    // Detekce pohybu stránek pro spouštění zvukových efektů
    this.pageFlip.on('changeState', (e) => {
      if ((currentState === 'read' || currentState === 'fold_corner') && 
          (e.data === 'flipping' || e.data === 'user_fold')) {
        this.playFlipSound();
      }
      currentState = e.data; 
    });

    // --- MANUÁLNÍ A DOKONALÉ CENTROVÁNÍ OBÁLEK A PROGRESS BAR ---
    this.pageFlip.on('flip', (e) => {
      const pageCount = this.pageFlip.getPageCount();
      
      if (e.data === 0) {
        this.book.style.transform = 'translateX(-25%)'; 
      } else if (e.data === pageCount - 1) {
        this.book.style.transform = 'translateX(25%)'; 
      } else {
        this.book.style.transform = 'translateX(0)'; 
      }

      // --- AKTUALIZACE PROGRESS BARU ---
      // Vypočítáme procenta podle aktuální stránky a počtu stran
      const progressBar = document.getElementById('progressBar');
      if (progressBar && pageCount > 1) {
        const progressPercentage = (e.data / (pageCount - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
      }
    });

    // --- KLÁVESOVÉ OVLÁDÁNÍ ---
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.pageFlip.flipNext(); 
      } else if (e.key === 'ArrowLeft') {
        this.pageFlip.flipPrev(); 
      }
    });

    // --- OVLÁDÁNÍ ŠIPKAMI NA OBRAZOVCE ---
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.pageFlip.flipPrev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.pageFlip.flipNext();
      });
    }
  }
}