# Thelma.pt — Site vitrine & boutique

Site statique (HTML/CSS/JS, sans build) inspiré de l'identité visuelle du compte Instagram [@thelma.pt](https://www.instagram.com/thelma.pt/) : marque portugaise de vêtements et accessoires, style bohème-chic, palette crème / beige / camel / brun, logo médaillon "THELMA" en serif.

⚠️ **Important — contenu placeholder** : je n'ai pas de droits sur les vraies photos publiées sur Instagram, donc le site utilise des blocs de couleur en guise d'images produits/hero, et des textes/produits/prix d'exemple (voir `data/products.json`). L'identité (couleurs, typographie, mise en page façon "cartes catégories" vues sur l'Instagram) reprend fidèlement le style de la marque — à toi de remplacer le contenu par les vrais éléments.

## Structure

```
thelma-pt/
├── index.html          page d'accueil
├── loja.html            boutique (grille produits + filtres par catégorie)
├── sobre.html            page "à propos"
├── contacto.html          page contact (formulaire prêt pour Netlify Forms)
├── css/style.css         design system (couleurs, typographie, composants)
├── js/main.js             menu mobile, chargement des produits, filtres, panier
├── data/products.json      catalogue produits — géré via /admin (CMS) ou à la main
├── admin/index.html         interface d'administration (Decap CMS)
├── admin/config.yml         configuration du CMS (champs du formulaire produit)
├── assets/img/produtos/     photos des produits ajoutées via le CMS
├── assets/icons/favicon.svg
└── netlify.toml           config de déploiement Netlify
```

## 1. Développer en local

Aucune installation n'est nécessaire, ce sont des fichiers statiques. Comme le site charge les produits via `fetch()`, il faut un vrai serveur local (pas juste ouvrir le fichier) :

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

⚠️ GitHub Pages sert uniquement à valider la mise en page. La gestion de produits (CMS) et le formulaire de contact ont besoin de Netlify (étapes suivantes) — sur GitHub Pages, les photos ajoutées via le CMS ne s'afficheront pas correctement (chemins absolus prévus pour un domaine racine).

## 3. Passer en production avec une vraie boutique en ligne

### Netlify (recommandé)

1. Créer un compte sur [netlify.com](https://www.netlify.com) (connexion directe avec GitHub).
2. **Add new site → Import an existing project → GitHub** (installation du "Netlify GitHub App", en un clic, autorise l'accès au dépôt).
3. Sélectionner le dépôt `thelma-pt`. Netlify détecte automatiquement `netlify.toml` (aucune commande de build nécessaire, dossier de publication = racine).
4. Déployer : chaque `git push` sur `main` republie automatiquement le site.
5. Ajouter un nom de domaine personnalisé dans **Domain settings** si besoin.

### Activer le vrai formulaire de contact (Netlify Forms)

Le formulaire dans `contacto.html` a déjà les attributs nécessaires (`name="contact"` et `data-netlify="true"`). Une fois déployé sur Netlify, il fonctionne automatiquement — les messages arrivent dans **Netlify → Site → Forms**. Aucune configuration supplémentaire.

### Activer le vrai panier / paiement (Snipcart)

Le site est déjà câblé avec [Snipcart](https://snipcart.com) (boutons `.snipcart-add-item`, script chargé dans chaque page) — panier + paiement (Stripe/PayPal) sans backend à coder.

1. Créer un compte gratuit sur [app.snipcart.com](https://app.snipcart.com/register) (facturation seulement en % sur les ventes réalisées).
2. Récupérer la **clé API publique** (Dashboard → Store Configuration → API Keys → clé de **test** d'abord).
3. Remplacer `YOUR_SNIPCART_PUBLIC_API_KEY` par cette clé dans `index.html` et `loja.html`.
4. Connecter Stripe ou PayPal dans le dashboard Snipcart pour encaisser réellement les paiements.
5. Passer la clé de test en clé **live** une fois les tests validés.
6. Gestion des commandes : tout se passe dans le dashboard Snipcart (statuts, remboursements, clients) — pas de backend à maintenir. Pour automatiser une action à chaque commande (ex : notification, mise à jour de stock), Snipcart propose des **webhooks** qui peuvent déclencher une [Netlify Function](https://docs.netlify.com/functions/overview/) (serverless, pas de serveur à gérer).

### Alternative : vraies commandes via Instagram/WhatsApp

Si Thelma préfère continuer à gérer les commandes en DM/WhatsApp plutôt qu'un panier en ligne, on peut remplacer le bouton "Adicionar ao carrinho" par un lien `https://wa.me/<numero>?text=...` — dis-le-moi et j'adapte `js/main.js`.

## 4. Gérer les produits sans toucher au code (Decap CMS)

Le catalogue (`data/products.json`) est éditable via une interface d'administration à `/admin`, sans connaissances techniques : ajouter/modifier/supprimer un produit, changer prix, catégorie, description, photo. Chaque modification crée un commit Git automatiquement et republie le site.

**Cette fonctionnalité nécessite Netlify** (elle utilise Netlify Identity + Git Gateway). Étapes à faire une seule fois, dans le dashboard Netlify, après avoir connecté le site (étape 3) :

1. **Site settings → Identity → Enable Identity.**
2. Toujours dans Identity : **Registration preferences → mettre sur "Invite only"** (⚠️ étape de sécurité importante — sans ça, n'importe qui pourrait s'inscrire et accéder à l'admin).
3. **Identity → Services → Git Gateway → Enable Git Gateway** (permet aux utilisateurs Identity d'écrire dans le dépôt GitHub sans avoir besoin de leur propre accès GitHub ni de token).
4. **Identity → Invite users** : entrer l'email de la personne qui doit gérer les produits (ex: Thelma). Elle reçoit un email, clique, définit un mot de passe.
5. Une fois connectée, elle accède à l'admin sur `https://<ton-site>.netlify.app/admin/` et voit un formulaire pour gérer les produits.

**Sécurité** : aucune base de données ni serveur à protéger — l'authentification est gérée par Netlify Identity (accès uniquement sur invitation), et chaque modification passe par Git Gateway avec l'historique complet dans GitHub (rien n'est jamais perdu, tout est réversible via `git revert`).

## 5. Remplacer le contenu par le vrai contenu Thelma

- **Produits, prix, descriptions, photos** : via `/admin` une fois Netlify configuré (recommandé), ou directement dans `data/products.json`.
- **Textes de marque** (accueil, à propos) : à éditer directement dans `index.html` / `sobre.html`.
- **Contact** : remplacer `ola@thelma.pt` par la vraie adresse, ajouter un numéro WhatsApp si besoin.
- **Réseaux sociaux** : les liens pointent déjà vers `instagram.com/thelma.pt`.
