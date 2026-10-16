# Sci-Fi HUD

> Interface HUD de vaisseau spatial au style CRT / Matrix / cyberpunk, pensée comme source vidéo pour les performances live.

![Platform](https://img.shields.io/badge/platform-Web-informational) ![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-blue)

## À propos

Sci-Fi HUD est une application web React qui affiche en plein écran un tableau de bord de science-fiction entièrement animé (radar, coordonnées, métriques, spectres, alertes). Elle est conçue pour être capturée dans OBS puis envoyée vers Resolume pendant un spectacle ou une performance vidéo live. L'interface est optimisée pour du 1920x1080.

## Fonctionnalités

- **Style CRT** : scanlines, vignetage, effets de glitch et éléments décoratifs flottants
- **Données animées en boucle** : coordonnées LAT / LONG / ALT, fréquence, radar, forme d'onde, charge système, métriques (core temp, radiation, plasma, output), analyse de fréquence, force du signal, spectre
- **Overlay « Human Scan »** : fiche de scan d'un sujet avec constantes animées (rythme cardiaque, tension, O2, température, respiration, activité neuronale, ondes cérébrales)
- **Overlay « Danger Alert »** : alerte rouge clignotante qui fait aussi passer la barre du haut et le statut en mode alerte
- **Données du sujet personnalisables** en temps réel depuis le panneau Settings (nom, espèce, âge, taille, poids, groupe sanguin, statut)
- **Vocabulaire SF** intégré (CORE ONLINE, SYNC ACTIVE, PLASMA, RADIATION…)

## Installation

Prérequis : Node.js et npm.

```bash
npm install
npm run dev
```

L'app est accessible sur `http://localhost:5173`.

Build de production (dossier `dist/`) :

```bash
npm run build
npm run preview   # prévisualiser le build
```

### Déploiement sur Netlify

Le fichier `netlify.toml` configure déjà le build (`npm run build`, publication de `dist`, redirection SPA).

- **Via GitHub** : sur [netlify.com](https://netlify.com), « Add new site » → « Import an existing project », choisir ce repo. Build command `npm run build`, publish directory `dist`. Un domaine personnalisé peut être ajouté dans Site settings → Domain management.
- **Drag & drop** : lancer `npm run build` en local puis glisser-déposer le dossier `dist` sur Netlify.

## Utilisation

### Contrôles (barre d'outils en haut à droite)

| Bouton | Action |
| --- | --- |
| Icône utilisateur | Afficher / masquer l'overlay Human Scan |
| Icône triangle | Activer / désactiver l'overlay Danger Alert |
| Icône engrenage | Ouvrir le panneau Settings (toggles des overlays + données du scan) |

Toutes les modifications s'appliquent en temps réel.

### OBS → Resolume

1. Dans OBS : Sources → + → **Browser**
   - Version locale : `http://localhost:5173`
   - Version déployée : l'URL Netlify du site
   - Résolution 1920x1080, 60 FPS
   - Cocher « Shutdown source when not visible » (performances) et « Refresh browser when scene becomes active »
2. Fermer le panneau Settings avant la capture.
3. OBS → Virtual Camera, puis dans Resolume : Input → Syphon / NDI / Virtual Cam.

### Dépannage

- **`npm install` échoue** : `rm -rf node_modules package-lock.json && npm install`
- **Les polices ne chargent pas** : vérifier la connexion internet (Google Fonts Orbitron / Share Tech Mono)
- **Performance lente dans OBS** : réduire le FPS de la source à 30, masquer les overlays non utilisés
- **Avant un show** : tester l'ensemble de la chaîne et garder une version locale en plus de la version en ligne

## Structure du projet

```
├── index.html        # point d'entrée Vite
├── src/
│   ├── main.jsx      # montage React
│   ├── App.jsx       # tout le HUD (styles, animations, overlays, panneau Settings)
│   └── index.css     # styles globaux
├── vite.config.js
└── netlify.toml      # config de build et de redirection Netlify
```

## Stack technique

React 18, Vite, Lucide Icons (`lucide-react`), CSS natif (animations, effets CRT), Google Fonts.

## Crédits & licence

Créé pour Ellie @ Neon Collective.

Aucune licence n'est spécifiée — tous droits réservés. (L'ancien README indiquait : « Code libre d'utilisation pour performances live, installations, projets personnels. » ; un fichier LICENSE permettrait de formaliser cette intention.)

---

<p align="center">
  Fait par <a href="https://github.com/elisalien">Élisalien</a> ·
  <a href="https://gitlab.com/elisalien/catalog">Catalogue des shaders, sources & logiciels</a>
</p>
