# Déploiement sur GitHub Pages - Business Plan Digital Twins Platform

Ce document contient les instructions pour déployer le site web du business plan de la plateforme de jumeaux numériques sur GitHub Pages.

## Contenu du dossier

Ce dossier contient tous les fichiers nécessaires pour déployer le site web sur GitHub Pages :

- Le dossier `static` contient les ressources statiques (CSS, JavaScript, images)
- Le fichier `.nojekyll` est nécessaire pour que GitHub Pages traite correctement les fichiers qui commencent par un underscore
- Le fichier `index.html` est la page principale du site

## Instructions de déploiement

1. Créez un nouveau dépôt GitHub (par exemple, `digital-twins-platform`)
2. Clonez ce dépôt sur votre machine locale
3. Copiez tous les fichiers de ce dossier dans le dépôt cloné
4. Effectuez un commit et poussez les modifications vers GitHub
5. Allez dans les paramètres du dépôt GitHub
6. Dans la section "GitHub Pages", sélectionnez la branche principale (main ou master) comme source
7. Cliquez sur "Save"

GitHub Pages va automatiquement déployer votre site. L'URL sera généralement sous la forme :
`https://[votre-nom-utilisateur].github.io/digital-twins-platform/`

## Personnalisation du déploiement

Si vous souhaitez utiliser un domaine personnalisé :

1. Dans les paramètres GitHub Pages, entrez votre domaine personnalisé
2. Configurez les enregistrements DNS de votre domaine pour pointer vers les serveurs GitHub Pages
3. Cochez l'option "Enforce HTTPS" pour sécuriser votre site

## Mise à jour du site

Pour mettre à jour le site après des modifications :

1. Modifiez les fichiers nécessaires
2. Effectuez un commit et poussez les modifications vers GitHub
3. GitHub Pages redéploiera automatiquement votre site

## Support

Si vous rencontrez des problèmes lors du déploiement, consultez la documentation officielle de GitHub Pages :
https://docs.github.com/en/pages
