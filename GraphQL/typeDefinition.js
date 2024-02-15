// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    artistes: [Artiste!]!,
    styles(id: ID!): Style!
  },
  type Artiste {
      IdArtiste: ID!,
      pseudo: String,
      idStyle: [Style!]!,
  },
  type Style {
    idStyle: ID!,
    libelle: String,
    description: String
  },
  type Concert {
    idConcert: ID!,
    dateConcert: String,
    nbrPlaceDisponible: Int
    idVille: [Ville!]!
  },
  type Ville {
    idVille: ID!,
    nom: String,
    coordonees: String
  }
`;

export default typeDefs;