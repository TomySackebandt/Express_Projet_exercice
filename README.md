# Les page diponible

- [Home](http://localhost:8080/)
- [Login](http://localhost:8080/login)

La page dynamique ce trouve dans `/chapter/nombre_du_chapitre`

Pour lancé le projet:
```
    npm install
    npm start
```
Le projet a été initialiser avec express-generator
L'ORM utiliser est Prisma

les routes Api REST permette de faire un CRUD sur les artistes et un simple GET sur les styles.
Le graphql permet de voir:
    - l'ensemble des styles
    - l'ensemble des artistes
    - l'ensemble des villes
    - l'ensemble des concerts
    - l'ensemble des concerts d'une ville
    - L'ensemble des visiteurs d'un concert
    - Le nombre de visiteurs d'un concert
    - l'ensemble des style d'un concert
    - L'ensemble des style d'un artiste
    - L'ensemble des concert d'un artiste

Les fichier lier a graphql et graphql-tool ce trouve dans le fichier GraphQL.
Dans ce dossier il y a:
    - les resolveur
    - les definition de type
    - les fonction qui recupérer des données en brut (root.js) 