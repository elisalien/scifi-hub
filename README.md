# Sci-Fi HUD - Interface CRT/Matrix/Cyberpunk

Application web interactive avec style HUD vaisseau spatial pour performances vidéo live.

## 🚀 Features

- **Style CRT authentique** : scanlines, vignetting, glitch effects
- **Système de presets** : sauvegarde et chargement de configurations
- **100% customisable** : tous les textes, métriques et alertes modifiables en temps réel
- **Animations looping** : effects visuels continus
- **Vocabulaire SF** : placeholders et données dans l'univers spatial/cyberpunk

## 📦 Installation locale

```bash
npm install
npm run dev
```

L'app sera accessible sur `http://localhost:5173`

## 🌐 Déploiement sur Netlify

### Option 1 : Via GitHub (Recommandé)

1. **Push ton code sur GitHub :**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TON_USERNAME/hud-scifi.git
   git push -u origin main
   ```

2. **Sur Netlify :**
   - Va sur [netlify.com](https://netlify.com) et connecte-toi
   - Clique sur "Add new site" → "Import an existing project"
   - Choisis GitHub et sélectionne ton repo
   - Build settings :
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Clique sur "Deploy site"

3. **URL custom (optionnel) :**
   - Site settings → Domain management → Add custom domain

### Option 2 : Drag & Drop direct

1. **Build localement :**
   ```bash
   npm run build
   ```

2. **Sur Netlify :**
   - Va sur [netlify.com](https://netlify.com)
   - Glisse-dépose le dossier `dist` directement sur la page

## 🎮 Utilisation avec OBS → Resolume

### Setup OBS

1. **Ajouter une source Browser :**
   - Sources → + → Browser
   - Pour version locale : `http://localhost:5173`
   - Pour version déployée : `https://ton-site.netlify.app`
   - Résolution : 1920x1080
   - FPS : 60
   - ✅ Cocher "Shutdown source when not visible" (perfs)
   - ✅ Cocher "Refresh browser when scene becomes active"

2. **Optimisation :**
   - Cache le panneau de contrôle avant la capture (bouton ⚙️)
   - Mode Play (▶) pour animations continues

3. **Vers Resolume :**
   - OBS → Virtual Camera
   - Resolume → Input → Syphon/NDI/Virtual Cam

## 🎨 Contrôles

### Toolbar (top-right)
- **▶/⏸** : Play/Pause animations glitch
- **💾** : Sauvegarder preset actuel
- **⚙️** : Ouvrir panneau de contrôle

### Panel de contrôle
- **Main Title** : Titre principal
- **Subtitle** : Sous-titre
- **Coordinates** : X, Y, Z
- **Metrics** : 4 métriques avec label, valeur, status (couleur)
- **Alerts** : 3 lignes d'alertes
- **Presets** : Liste des configs sauvegardées (clic pour charger, X pour supprimer)

### Shortcuts
- Toutes les modifications sont en temps réel
- Les presets se sauvegardent en localStorage
- Compatible tous navigateurs modernes

## 🎭 Vocabulaire SF intégré

Le champ lexical spatial/cyberpunk est déjà dans les placeholders :
- STELLAR NEXUS, QUANTUM ARRAY
- CORE TEMP, RADIATION, PLASMA FLOW
- SECTOR 7, NAVIGATION, SHIELDS
- Coordonnées spatiales X/Y/Z
- Timestamps futuristes

## 🛠 Tech Stack

- React 18
- Vite
- Lucide Icons
- CSS natif (animations, CRT effects)
- localStorage (persistence presets)

## 📱 Responsive

Interface optimisée 1920x1080 mais adaptable :
- Desktop fullscreen
- Tablet/mobile (grid adaptatif)

## 🔧 Troubleshooting

**"npm install" échoue :**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Fonts ne chargent pas :**
Vérifie ta connexion internet (Google Fonts)

**Presets ne se sauvegardent pas :**
Vérifie que localStorage est activé dans ton browser

**Performance lente dans OBS :**
- Réduis le FPS à 30
- Désactive les animations glitch (Pause)
- Cache les panels non utilisés

## 💡 Tips performance théâtre

- Prépare tes presets avant la perf
- Nomme-les par scène/moment
- Test complet avant le show
- Backup du site en local + online

## 📝 Licence

Code libre d'utilisation pour performances live, installations, projets personnels.

---

Créé pour Ellie @ Neon Collective 💙✨
"# scifi-hub" 
