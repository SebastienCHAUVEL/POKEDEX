# Pokedex

API de gestion de pokémons réalisée entierrement  de la conception jusqu'à la mise en production à partir d'une [roadmap](./docs/roadmap.md)

## 📝 Documentation

Pour avoir une description des routes de l'API, rendez-vous sur [la documentation de l'API](https://pokedex-production-399e.up.railway.app/api/docs/) (mise en place par mes soins avec swagger)

## ✍️ Conception

- [MCD](./docs/MCD.drawio.png)
- [MPD](./docs/MPD.drawio.png)

## 🛠️ Technos utilisés

- Mise en place de l'API en **node.js** avec le framework **Express**
- Base de donnée **PostgreSql**
- Validation des données des requêtes avec **Joi**
- Hashage des mots de passes avec **argon2**
- Mise en place de token JWT avec **jsonwebtoken** pour la connexion à l'api
- Utilisation de l'ORM **sequelize** pour communiquer avec la base donnée
- Mise en place d'une documentation de l'API avec **swagger**
- Déploiement de l'application avec **Railway**

## 🚀 Installation locale avec Docker

```bash
# Cloner le projet
git clone REPO_SSH_URL

# Se déplacer dans le projet
cd REPO_NAME

# Ouvrir le projet dans VSCode
code .

# Build les services (api et bdd)
docker compose build

# Lancement des conteneurs
docker compose up
```

## 🔍 Infos et aides pour le projet

Document mis à disposition pour réaliser le projet :

- [roadmap.md](./docs/roadmap.md) qui contient les attendus du projet sous forme de user-stories.
