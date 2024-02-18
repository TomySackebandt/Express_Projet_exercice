import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
  Artiste: {
    styles: (parent) => {
      return prisma.style.findMany({
        where: {
          idStyle: parent.idStyle
        }
      });
    },
    concert: (parent) => {
      return prisma.concert.findMany({
        where: {
          Joue: {
            some: {
              idArtiste: parent.idArtiste
            }
          }
        }
      });
    }
  },
  Concert: {
    visiteurs: (parent) => {
      return prisma.visiteur.findMany({
        where: {
          Participe: {
            some: {
              idConcert: parent.idConcert
            }
          }
        }
      });
    },
    nbVisiteurs: (parent) => {
      return prisma.visiteur.count({
        where: {
          Participe: {
            some: {
              idConcert: parent.idConcert
            }
          }
        }
      });
    },
    styles: (parent) => {
      return prisma.style.findMany({
        where: {
          Joue: {
            some: {
              idConcert: parent.idConcert
            }
          }
        }
      });
    },
    ville: (parent) => {
      return prisma.ville.findMany({
        where: {
          idVille: parent.idVille
        }
      });
    }
  },
  Ville : {
    concerts: (parent) => {
      return prisma.concert.findMany({
        where: {
          idVille: parent.idVille
        }
      });
    }
  }
};

export default resolvers;