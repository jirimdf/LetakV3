[![Ukázka projektu](https://i9.ytimg.com/vi/YxxB9A8hF8I/mqdefault.jpg?v=69a72eb7&sqp=CNzuoM0G&rs=AOn4CLDBFwovNvaIABmjNgpjQm8_K3-zzQ)](https://youtu.be/YxxB9A8hF8I)
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
