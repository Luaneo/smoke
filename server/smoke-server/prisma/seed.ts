import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let user;
prisma.user
  .create({
    data: {
      id: 1,
      smokeType: "DISPOSABLE",
      disposable: {
        create: {
          disposablePrice: 100,
          disposablesPerMonth: 3,
        },
      },
      smokedFor: 24,
      age: 39,
      sex: "MALE",
    },
  })
  .then((val) => {
    user = val;
    console.log("success");
  });
