# Site Web de Unipod Guinée

Ce dépôt contient le code source du site web officiel de Unipod Guinée, le premier hub d'innovation universitaire en Guinée. Le site est construit en utilisant uniquement des technologies web standard (HTML5, CSS3, JavaScript ES6+) sans aucun framework, pour garantir des performances maximales, une maintenance simplifiée et un déploiement aisé.

## Aperçu du Projet

-   **Objectif :** Présenter Unipod Guinée, ses services, ses projets et attirer de nouveaux talents.
-   **Technologie :** 100% Vanilla (HTML, CSS, JS).
-   **Principes :** Mobile-first, performance, accessibilité (WCAG 2.1 AA), SEO.

## Structure des Fichiers

```
/
|-- index.html       # Fichier principal, structure sémantique de la page
|-- styles.css       # Feuille de style (mobile-first, variables CSS)
|-- script.js        # Logique d'interactivité (menu, animations, etc.)
|-- assets/          # (Recommandé) Dossier pour les images et icônes
|   |-- logo.png
|   |-- og-image.jpg
|   |-- ... (autres images)
|-- favicon.ico      # Icône pour les navigateurs
|-- apple-touch-icon.png # Icône pour les appareils Apple
|-- README.md        # Ce fichier
```

## Guide de Déploiement

Ce site a été conçu pour être déployé sur n'importe quel hébergeur statique. Voici les étapes pour un déploiement simple et efficace sur des plateformes comme Netlify, Vercel ou GitHub Pages.

### Étape 1 : Préparer les Ressources

1.  **Remplacer les images placeholder :**
    -   Le code utilise des images de `https://picsum.photos`. Remplacez ces URLs par vos propres images.
    -   Placez vos images dans le dossier `assets/`.
    -   **Optimisation :** Compressez vos images avant de les mettre en ligne. Utilisez des outils comme [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/) pour réduire leur poids sans perte de qualité visible.
    -   **Format WebP :** Pour des performances optimales, fournissez des images au format WebP avec un fallback en PNG ou JPG comme montré dans le code (`<picture>` element).

2.  **Personnaliser le contenu :**
    -   Modifiez les textes dans `index.html` pour qu'ils correspondent exactement à vos informations (contacts, descriptions de projets, etc.).
    -   Mettez à jour les liens des réseaux sociaux dans le footer.

### Étape 2 : Optimisations Avant Déploiement (Optionnel mais recommandé)

Pour atteindre un score Lighthouse de 90+, vous pouvez minifier vos fichiers CSS et JS.

1.  **Minification CSS :**
    -   Copiez le contenu de `styles.css`.
    -   Collez-le dans un outil en ligne comme [CSS Minifier](https://cssminifier.com/).
    -   Créez un nouveau fichier `styles.min.css` et collez-y le code minifié.
    -   Dans `index.html`, changez la référence de la feuille de style : `<link rel="stylesheet" href="styles.min.css">`.

2.  **Minification JS :**
    -   Copiez le contenu de `script.js`.
    -   Collez-le dans un outil comme [JavaScript Minifier](https://javascript-minifier.com/).
    -   Créez `script.min.js` et collez-y le code minifié.
    -   Dans `index.html`, changez la référence du script : `<script src="script.min.js"></script>`.

### Étape 3 : Déployer sur un Hébergeur Statique

#### Option A : Netlify (Recommandé)

1.  Créez un compte sur [Netlify](https://www.netlify.com/).
2.  Poussez votre code sur un dépôt GitHub, GitLab ou Bitbucket.
3.  Dans le tableau de bord Netlify, cliquez sur "New site from Git".
4.  Choisissez votre fournisseur Git et sélectionnez votre dépôt.
5.  Les réglages par défaut sont suffisants (il n'y a pas de build step).
6.  Cliquez sur "Deploy site". Netlify s'occupe du reste, y compris de la configuration d'un CDN global pour des temps de chargement rapides.

#### Option B : GitHub Pages

1.  Poussez votre code sur un dépôt GitHub.
2.  Allez dans l'onglet "Settings" de votre dépôt.
3.  Dans la section "Pages" (dans le menu de gauche), choisissez la branche à déployer (généralement `main` ou `master`).
4.  Choisissez le dossier `/ (root)`.
5.  Cliquez sur "Save". Votre site sera disponible à l'adresse `https://<votre-username>.github.io/<nom-du-depot>/`.

## Monitoring de la Performance

Une fois le site déployé, utilisez les outils suivants pour auditer et maintenir sa performance :

-   **Google Lighthouse :** Disponible dans les outils de développement de Chrome (F12 > Lighthouse). Auditez les performances, l'accessibilité, le SEO et les bonnes pratiques.
-   **PageSpeed Insights :** [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
-   **GTmetrix :** [https://gtmetrix.com/](https://gtmetrix.com/)

Ces outils vous donneront des recommandations précieuses pour améliorer encore plus la vitesse et l'expérience utilisateur.
