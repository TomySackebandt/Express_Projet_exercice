# Les pages disponibles

- [Accueil](http://localhost:8080/)
- [Connexion](http://localhost:8080/login)

La page dynamique se trouve dans `/chapter/nombre_du_chapitre`

Pour lancer le projet :

Pour lancé le projet:
```
    npm install
    npm start
```

Le projet a été initialisé avec express-generator. 
L'ORM utilisé est Prisma.

La documentation est faite avec swagger-ui et est générée avec swagger-jsdoc. 
Swagger-jsdoc permet de mettre un simple commentaire (au-dessus des routes de l'API REST) pour générer la doc utilisée par swagger-ui. La documentation se trouve sur `/api-docs`.

Les routes API REST permettent de faire un CRUD sur les artistes et un simple GET sur les styles. Le GraphQL permet de voir :
    - l'ensemble des styles
    - l'ensemble des artistes
    - l'ensemble des villes
    - l'ensemble des concerts
    - l'ensemble des concerts d'une ville
    - l'ensemble des visiteurs d'un concert
    - Le nombre de visiteurs d'un concert
    - l'ensemble des styles d'un concert
    - L'ensemble des styles d'un artiste
    - L'ensemble des concerts d'un artiste

Les fichiers liés à GraphQL et graphql-tool se trouvent dans le dossier GraphQL. Dans ce dossier, il y a :
    - les resolveurs
    - les définitions de type
    - les fonctions qui récupèrent des données en brut (root.js)
