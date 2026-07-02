# Thelma.pt — Site vitrine & boutique

Site statique (HTML/CSS/JS, sans build) inspiré de l'identité visuelle du compte Instagram [@thelma.pt](https://www.instagram.com/thelma.pt/) : marque portugaise de vêtements et accessoires, style bohème-chic, palette crème / beige / camel / brun, logo médaillon "THELMA" en serif.

⚠️ **Important — contenu placeholder** : je n'ai pas de droits sur les vraies photos publiées sur Instagram, donc le site utilise des blocs de couleur en guise d'images produits/hero, et des textes/produits/prix d'exemple (voir `data/products.js`). L'identité (couleurs, typographie, mise en page façon "cartes catégories" vues sur l'Instagram) reprend fidèlement le style de la marque — à toi de remplacer le contenu par les vrais éléments.

## Structure

```
thelma-pt/
├── index.html          page d'accueil
├── loja.html            boutique (grille produits + filtres par catégorie)
├── sobre.html            page "à propos"
├── contacto.html          page contact (formulaire prêt pour Netlify Forms)
├── css/style.css         design system (couleurs, typographie, composants)
├── js/main.js             menu mobile, rendu des produits, filtres, carrousel Instagram
├── data/products.js        catalogue produits (à remplacer par les vrais articles)
├── assets/img/            photos réelles à ajouter ici
├── assets/icons/favicon.svg
└── netlify.toml           config de déploiement Netlify
```

## 1. Développer en local

Aucune installation n'est nécessaire, ce sont des fichiers statiques. Le plus simple :

- Ouvrir `index.html` directement dans le navigateur, ou
- Lancer un petit serveur local (recommandé pour que les chemins relatifs et `fetch` fonctionnent bien) :

```bash
cd thelma-pt
npx serve .
# ou : python -m http.server 5500
```

## 2. Tester en ligne avec GitHub Pages

1. Créer un nouveau dépôt GitHub (ex: `thelma-pt`).
2. Depuis ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/thelma-pt.git
   git push -u origin main
   ```
3. Dans GitHub : **Settings → Pages → Source : Deploy from a branch → branch `main` / dossier `/ (root)`**.
4. Le site sera visible sur `https://<ton-compte>.github.io/thelma-pt/` après 1-2 minutes.
5. À chaque `git push`, GitHub Pages republie automatiquement — pratique pour tester les modifications avant la mise en production définitive.

## 3. Passer en production avec une vraie boutique en ligne

GitHub Pages est parfait pour tester, mais ne gère pas le formulaire de contact ni le paiement. Pour la mise en ligne finale, connecter le dépôt GitHub à une plateforme d'hébergement :

### Netlify (recommandé)

1. Créer un compte sur [netlify.com](https://www.netlify.com) (connexion directe avec GitHub).
2. **Add new site → Import an existing project → GitHub** (installation du "Netlify GitHub App", en un clic, autorise l'accès au dépôt).
3. Sélectionner le dépôt `thelma-pt`. Netlify détecte automatiquement `netlify.toml` (aucune commande de build nécessaire, dossier de publication = racine).
4. Déployer : chaque `git push` sur `main` republie automatiquement le site (comme GitHub Pages, mais avec en plus formulaires et e-commerce ci-dessous).
5. Ajouter un nom de domaine personnalisé dans **Domain settings** si besoin.

### Activer le vrai formulaire de contact (Netlify Forms)

Le formulaire dans `contacto.html` a déjà les attributs nécessaires (`name="contact"` et `data-netlify="true"`). Une fois déployé sur Netlify, il fonctionne automatiquement — les messages arrivent dans **Netlify → Site → Forms**. Aucune configuration supplémentaire. (Ne fonctionne pas sur GitHub Pages, qui n'a pas de backend.)

### Activer le vrai panier / paiement (Snipcart)

Le site est déjà câblé avec [Snipcart](https://snipcart.com) (boutons `.snipcart-add-item` dans `js/main.js`, script chargé dans chaque page) — solution simple pour ajouter un panier + paiement (Stripe/PayPal) à un site statique, sans backend à coder.

1. Créer un compte gratuit sur [app.snipcart.com](https://app.snipcart.com/register) (facturation seulement en % sur les ventes réalisées, gratuit sans vente).
2. Récupérer la **clé API publique** (Dashboard → Store Configuration → API Keys → clé de **test** d'abord).
3. Remplacer `YOUR_SNIPCART_PUBLIC_API_KEY` par cette clé dans `index.html` et `loja.html` :
   ```html
   <div hidden id="snipcart" data-api-key="TA_CLE_ICI" ...></div>
   ```
4. Connecter Stripe ou PayPal dans le dashboard Snipcart pour encaisser réellement les paiements.
5. Passer la clé de test en clé **live** une fois les tests validés.

### Alternative : vraies commandes via Instagram/WhatsApp

Beaucoup de petites marques (comme Thelma actuellement) gèrent les commandes directement en DM Instagram ou WhatsApp plutôt qu'un vrai panier en ligne. Si c'est le mode de fonctionnement souhaité, on peut remplacer le bouton "Adicionar ao carrinho" par un lien direct `https://wa.me/<numero>?text=...` — dis-le-moi et j'adapte `js/main.js`.

## 4. Remplacer le contenu par le vrai contenu Thelma

- **Photos** : ajouter les vraies photos dans `assets/img/` puis renseigner le champ `image` de chaque produit dans `data/products.js`, et remplacer les fonds dégradés (`.hero`, `.split-media`, `.insta-item`) par de vraies images dans `css/style.css` / le HTML.
- **Produits, prix, descriptions** : à éditer dans `data/products.js`.
- **Textes de marque** (accueil, à propos) : à éditer directement dans `index.html` / `sobre.html`.
- **Contact** : remplacer `ola@thelma.pt` par la vraie adresse, ajouter un numéro WhatsApp si besoin.
- **Réseaux sociaux** : les liens pointent déjà vers `instagram.com/thelma.pt`.
