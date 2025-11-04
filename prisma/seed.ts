import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "hashed_password",
      role: "ADMIN",
      resources: {
        create: [
          {
            title: "Welcome Resource",
            url: "https://example.com",
            description: "This is the first resource",
          },
        ],
      },
    },
  });

  console.log("Seed completed:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
