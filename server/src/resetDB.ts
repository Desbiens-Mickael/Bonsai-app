import datasource from "./db";
import { hashPassword } from "./entity/User";

async function resetDB(): Promise<void> {
  await datasource.initialize();

  await datasource.getRepository("User").delete({});
  await datasource.getRepository("Bonsai").delete({});
  const user = await datasource.getRepository("User").save({
    firstname: "user",
    email: "user@test.com",
    password: await hashPassword("test1234"),
    createdAt: new Date(),
  });

  const admin = await datasource.getRepository("User").save({
    firstname: "admin",
    email: "admin@test.com",
    password: await hashPassword("test1234"),
    createdAt: new Date(),
    role: "admin",
  });

  await datasource.getRepository("Bonsai").save([
    {
      name: "Erable",
      species: "Erable",
      age: 2,
      createdAt: new Date(),
      owner: user,
    },
    {
      name: "Bambou",
      species: "Bambou",
      age: 3,
      createdAt: new Date(),
      owner: user,
    },
    {
      name: "Olivier",
      species: "Olivier",
      age: 4,
      createdAt: new Date(),
      owner: admin,
    },
  ]);

  await datasource.destroy();
  console.log("Database reset 👍");
}

resetDB().catch(console.error);
