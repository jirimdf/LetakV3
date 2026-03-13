[![YouTube Badge](https://img.shields.io/badge/YouTube-Video%20Ukázka-red?style=for-the-badge&logo=youtube)](https://youtu.be/vcMaD32fn2k)
[![Ukázka projektu](https://github.com/jirimdf/LetakV3/blob/main/Letak/TEST%20FILE/miniatura.png?raw=true)](https://youtu.be/vcMaD32fn2k)
---

**Kontakt a sítě:**
* 📸 [Instagram](https://www.instagram.com/jiri_mdf)
* 💬 [Discord](https://discord.com/users/577519864147607568)

---

## ⚙️ Požadavky a Nastavení serveru (Localhost / IIS)

Pro správné fungování lokálního serveru na Windows (IIS) je nutné provést následující kroky:

* **Povolení procházení adresáře:** V aplikaci Správce internetové informační služby (spuštění přes klávesovou zkratku `Win + R` a zadání `inetmgr`) je nutné u daného webu povolit **Procházení adresáře** (Directory Browsing), aby skript mohl dynamicky načítat seznam fotek. 
* **Podpora moderních formátů:** V sekci **Typy MIME** je potřeba ručně přidat příponu `.webp` s typem `image/webp`.

---

## 📜 Changelog

### 🔹 v1.0 - Beta verze
* Inicializace projektu a základní struktura.
* Integrace knihovny pro otáčení stránek (St.PageFlip).
* Základní načtení statických obrázků do letáku.

### 🔸 v2.1 - Responzivita a Logika řazení
* **Responzivita:** Implementováno nové dynamické centrování letáku pomocí Flexboxu.
* **Čisté UI:** Zakázání zobrazení systémového scrollbaru.
* **Chytré čtení souborů:** Přechod z pevných názvů na dynamické načítání. Skript nyní filtruje soubory ve složce pomocí regulárních výrazů a přijímá pouze obrázky pojmenované čísly (např. `1.jpg`, `2.png`).
* **Automatické řazení:** Algoritmus nyní obrázky inteligentně seřadí podle čísel za sebou, aby nedocházelo k náhodnému přehazování stránek serverem.

### 🔹 v2.2 - Uživatelský zážitek (UX) a Vizuál
* **Preloader:** Přidáno animované načítací kolečko, které plynule zmizí až po úplném načtení všech obrázků do paměti.
* **Auto-korekce lichého počtu:** Pokud ve složce chybí do páru stránka, skript už nevyžaduje externí chybový obrázek. Místo toho automaticky vygeneruje vlastní varovnou grafiku ("CHYBÍ STRÁNKA") pomocí HTML5 Canvas přímo v kódu.
* **Vnitřní stínování:** Přidány dynamické vnitřní stíny (inset shadow) pro vytvoření 3D iluze hřbetu rozevřené knihy.

### 🔸 v3.0 - The Ultimate Edition (Interakce a Výkon)
* **Klávesové ovládání:** Přidána možnost listovat letákem pomocí šipek (Doleva/Doprava) na klávesnici.
* **Ozvučení:** Přidány 3 realistické zvuky šustění papíru, které se náhodně střídají při každém otočení stránky.
* **Rozšíření podpory:** Přidána plná podpora pro moderní `.webp` formát obrázků.
* **Pokročilý vnější stín (Glow):** Přidán plynulý, jednovrstvý drop-shadow pod leták, který ignoruje prázdné místo a dokonale obepíná pouze reálné okraje papíru.
* **Ovládací panel (GUI):** Implementováno moderní skryté vyjížděcí menu pod animovaným ozubeným kolem.
* **Apple Watch podpora:** Kompletně opravena responzivita a posunuty limity pro zmenšení, takže leták se bez chyb vycentruje a zobrazí i na nejmenších displejích (162x197 px).
* **Zoom a Dvojklik:** Přidána funkce přiblížení (až 3x). Lze ovládat přes posuvník v menu nebo intuitivně dvojklikem na stránku.
* **Customizace stínu:** V nastavení lze nyní plynule ovládat velikost, sílu (průhlednost přepočítávanou do HEX kódu) a barvu vnějšího stínu.
* **Light / Dark Mode:** Implementováno tlačítko pro přepínání světlého a tmavého režimu, které plynule ztmaví pozadí i samotné GUI.
* **Hardwarová akcelerace:** Kritický update optimalizace. Přesunutí výpočtů stínů a tažení stránek na grafickou kartu (GPU) pomocí `transform: translateZ(0)` a `will-change`, což vyřešilo zasekávání a zajistilo plynulý chod.
* **Oprava dotykového ovládání na mobilech:** Obnovena nativní podpora natahovaní letáku (`stretch`), čímž se srovnalo mapování souřadnic dotyku. Stránky lze opět na mobilech a tabletech přirozeně otáčet taháním prstu za libovolný okraj, a to s přesností 1:1 k displeji.
* **Navigační šipky:** Přidány plovoucí šipky ukotvené po stranách obrazovky pro větší pohodlí.
* **Glass-effect UX (Light/Dark Mode):** Šipky dostaly vylepšený "neviditelný" design s bílou průhledností. V Light modu mají tmavé znaky, v Dark modu světlé, takže na obou režimech fungují jako čisté sklo a neruší čtení textu pod nimi.
* **Dokonalé centrování obálek:** Vypnuto problémové interní auto-centrování knihovny a implementována vlastní přesná logika posunu (`translateX`), která přední obálku i zadní stranu plynule a bezchybně ukotví vždy na absolutní střed obrazovky.
* **Neonový ukazatel průběhu (Progress Bar):** Přidána vizuální lišta ve spodní části obrazovky, která se plynule naplňuje při listování a ukazuje aktuální postup čtení letáku. Ukazatel má červený neonový design ladící s celkovým UI a lze jej kdykoliv skrýt pomocí nového tlačítka "Progres" v ovládacím panelu.