# Pokedex

API de gestion de pokémons.

## Documentation

Une fois le serveur démarré, rendez-vous sur [la route menant à la documentation de l'API](http://localhost:3000/api/docs)

## Conception

- [MCD](./docs/MCD.drawio.png)
- [MPD](./docs/MPD.drawio.png)

## Installation

```bash
# Cloner le projet
git clone REPO_SSH_URL

# Se déplacer dans le projet
cd REPO_NAME

# Ouvrir le projet dans VSCode
code .

cd api

# Installer les dépendances nécessaire au back
npm install 
```

### Mise en place de la base de données

```bash
# Se connecter à son client Postgres
sudo -i -u postgres psql

# Créer un utilisateur de base de données
CREATE USER admin_pokedex WITH LOGIN PASSWORD 'pokedex';

# Créer une base de données 
CREATE DATABASE pokedex WITH OWNER admin_pokedex;

# Quitter psql
exit
```

### Mise en place de l'environnement de développement

Se mettre dans le dossier `api` et créer un fichier d'environnement à partir du fichier d'exemple.

```bash
# Créer un fichier d'environnement backend
cp .env.example .env

# Ajuster les valeurs du fichier .env
code .env
```

### Lancement du serveur

Se mettre dans le dossier `api` et créer un fichier d'environnement à partir du fichier d'exemple.

```bash
# Lancer la création des tables et le seeding
npm run db:reset

# Lancer le serveur en mode developpement
npm run dev
```

## Infos et aides pour le projet

Document mis à disposition pour réaliser le projet :

- [roadmap.md](./docs/roadmap.md) qui contient les attendus du projet sous forme de user-stories.
