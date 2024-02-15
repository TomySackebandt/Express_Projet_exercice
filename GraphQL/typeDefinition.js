// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    artistes: [Artiste!]!,
    styles(id: ID!): Style!,
    concerts: [Concert!]!,
    villes: [Ville!]!,
  },
  type Artiste {
      IdArtiste: ID!,
      pseudo: String,
      idStyle: Style!,
      styles: [Style!]!,
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