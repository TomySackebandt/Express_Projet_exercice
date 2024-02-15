import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    artistes: () => {
      return prisma.artiste.findMany();
    },
    styles: (parent, args) => {
      return prisma.style.findUnique({
        where: {
          idStyle: parseInt(args.id)
        }
      });
    },
    concerts: () => {
      return prisma.concert.findMany();
    },
    villes: () => {
      return prisma.ville.findMany();
    }
  },
  Artiste: {
    styles: (parent) => {
      return prisma.style.findMany({
        where: {
          idStyle: parent.idStyle
        }
      });
    }
  }
  // Ajoutez d'autres résolveurs si nécessaire
};

export default resolvers;