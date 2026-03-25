import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.person.createMany({
    data: [
      {
        firstName: "Maria",
        lastName: "Santos",
        email: "maria@example.com",
        age: 24,
        city: "Manila",
      },
      {
        firstName: "John",
        lastName: "Reyes",
        email: "john@example.com",
        age: 29,
        city: "Cebu",
      },
      {
        firstName: "Angela",
        lastName: "Cruz",
        email: "angela@example.com",
        age: 31,
        city: "Davao",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });