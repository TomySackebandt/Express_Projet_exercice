import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const root = {
  artistes: () => {
    return prisma.artiste.findMany()
  },
  styles: (id) => {
    return prisma.style.findUnique(
      {
        where: {
          idStyle: id
        }
      }
    )
  },
  concert: () => {
    return prisma.concert.findMany()
  },
  ville: () => {
    return prisma.ville.findMany()
  }
}

export default root;