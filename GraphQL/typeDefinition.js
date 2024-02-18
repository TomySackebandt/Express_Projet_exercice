// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    artistes: [Artiste!]!,
    styles(id: ID!): Style!,
    concerts: [Concert!]!,
    villes: [Ville!]!,
    visiteurs: [Visiteur!]!
  },
  type Artiste {
    IdArtiste: ID!,
    pseudo: String,
    idStyle: ID!,
    styles: [Style!]!,
    concert: [Concert!]!
  },
  type Style {
    idStyle: ID!,
    libelle: String,
    description: String
  },
  type Concert {
    idConcert: ID!,
    dateConcert: String,
    nbrPlaceDisponible: Int,
    ville: [Ville!]!,
    visiteurs: [Visiteur!]!
    nbVisiteurs: Int
    styles: [Style!]!
  },
  type Ville {
    idVille: ID!,
    nom: String,
    coordonees: String,
    concerts: [Concert!]!
  },
  type Visiteur {
    idVisiteur: ID!,
    nom: String,
    prenom: String,
    email: String,
    age: Int,
    adresse: String,
    idParrain: Visiteur,
    idVille: Ville
  }
`;

export default typeDefs;