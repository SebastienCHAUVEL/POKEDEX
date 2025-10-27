# Feuille de route (roadmap)

Le développement de ce projet se découpe en 3 grands jalons :

Version minimale ➡️ Version attendue ➡️ Bonus : features / autorisation / Swagger

## Version minimale

Faire le CRUD complet de l'entité `team` (équipe) et pouvoir ajouter/supprimer des Pokémons à une équipe, c'est-à-dire :

| En tant que | je souhaite pouvoir                        | afin de                               |
| ----------- | ------------------------------------------ | ------------------------------------- |
| visiteur    | consulter la page des équipes              | voir la liste des équipes existantes  |
| visiteur    | consulter la page/modale d'une équipe      | consulter ses caractéristiques        |
| visiteur    | créer une équipe                          | l'administrer                         |
| visiteur    | modifier le nom d'une équipe               | l'administrer                         |
| visiteur    | ajouter un Pokémon à une équipe            | l'administrer                         |
| visiteur    | retirer un Pokémon d'une équipe            | l'administrer                         |
| visiteur    | supprimer une équipe                       | l'administrer                         |

## Version attendue

Pour considérer que tu as réussi le projet, il faut implémenter les user stories suivantes :

| En tant que | je souhaite pouvoir                        | afin de                               |
| ----------- | ------------------------------------------ | ------------------------------------- |
| visiteur    | consulter la page des Pokémons             | voir la liste des Pokémons existants  |
| visiteur    | consulter la page/modale d'un Pokémon      | consulter ses caractéristiques        |
| visiteur    | consulter la page récapitulative des types | lister les différents types existants |
| visiteur    | consulter la page récapitulative d'un type | lister les Pokémons de ce type        |
| visiteur    | accéder à une page d'inscription           | me créer un compte                    |
| visiteur    | accéder à une page de connexion            | me connecter et profiter des droits des membres |

## Bonus

Si tu réussis à faire un des bonus suivant, tu auras réussi le projet avec brio ! 🎉

Au choix (ou les trois si tu es méga chaud) :

- Ajouter des routes pour augmenter le nombre de features de l'API ; dans la continuité, mais avec des nœuds au cerveau.
- Ajouter les autorisations ; plus challengeant, mais plus intéressant.
- Ajouter Swagger ; pour la documentation de l'API.

### More features

| En tant que | je souhaite pouvoir                 | afin de                                            |
| ----------- | ----------------------------------- | -------------------------------------------------- |
| visiteur    | comparer deux Pokémons              | m'aider à faire mon choix                          |
| visiteur    | rechercher un Pokémon par son nom   | le retrouver facilement via une barre de recherche |
| visiteur    | voter pour un Pokémon               | montrer mon intérêt pour ce Pokémon                |
| visiteur    | voir le nombre de votes d'un Pokémon | voir l'intérêt général de ce Pokémon               |
| visiteur    | consulter le podium des Pokémons    | voir les 10 Pokémons les plus populaires           |

Notes :

- Dans un premier temps, n'importe quel visiteur peut voter, y compris plusieurs fois, pour le même Pokémon ;
- Dans un second temps (V4), un utilisateur ne pourra voter qu'une fois par Pokémon.

En compléments :

- Limiter les équipes à 6 Pokémons maximum.
- Afficher une modale de confirmation lors de la suppression d'une équipe complète.
- Afficher des bulles de notification ("toast") lorsqu'une opération est réalisée avec succès.

### Autorisation

Droits d'un membre :

- Administrer ses propres équipes : les équipes ne sont plus communes entre les visiteurs.
- Droit de voter pour un Pokémon et de retirer son vote.

Non droits d'un visiteur :

- Accéder à l'administration d'une/des équipes : il faut à présent se connecter.
- Assurer l'accessibilité de l'application, y compris sur mobile.
- Assurer la sécurité de l'application face aux entrées utilisateurs.

### Swagger

Swagger est un outil de documentation d'API. Il permet de générer une documentation à partir des routes de l'API. Il ne fait pas tout automatiquement et il va avoir besoin de nous pour lui dire comment documenter les routes.

On pourra donc mettre à disposition des développeurs qui souhaitent utiliser notre API une documentation sur l'endpoint `/api/docs` par exemple.

Pas d'énoncé guidé ici, tu pars en exploratoire total pour l'installer et le configurer. Pas d'inquiétude si tu n'y arrives pas, tu pourras voir dans la correction comment ça a été mis en place. 😉

Direction la doc : [Documentation Swagger](https://swagger.io/docs/).

Bonne chance ! 🍀
