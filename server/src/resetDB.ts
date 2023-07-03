import datasource from "./db";
import { hashPassword } from "./entity/User";

async function resetDB(): Promise<void> {
  await datasource.initialize();

  await datasource.getRepository("User").delete({});
  await datasource.getRepository("Specie").delete({});
  await datasource.getRepository("PropagationMethod").delete({});
  await datasource.getRepository("PropagationSteps").delete({});
  await datasource.getRepository("PruningMethod").delete({});
  await datasource.getRepository("PruningStep").delete({});
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

  const erable = await datasource.getRepository("Specie").save({
    name: "Erable du Japon",
    description:
      "L'érable du Japon est un arbre de petite taille, à feuillage caduc, originaire du Japon et de Corée.",
    culture:
      "L'érable du Japon aime les sols riches, frais et bien drainés. Il apprécie les expositions ensoleillées ou mi-ombragées.",
  });

  const bambou = await datasource.getRepository("Specie").save({
    name: "Bambou de Chine",
    description:
      "Le bambou est une plante vivace de la famille des Poaceae (graminées), sous-famille des Bambusoideae, tribu des Bambuseae.",
    culture:
      "Le bambou aime les sols riches, frais et bien drainés. Il apprécie les expositions ensoleillées ou mi-ombragées.",
  });

  const olivier = await datasource.getRepository("Specie").save({
    name: "Olivier de Provence",
    description:
      "L'olivier est un arbre fruitier de la famille des Oléacées, cultivé pour son fruit, les olives.",
    culture:
      "L'olivier aime les sols riches, frais et bien drainés. Il apprécie les expositions ensoleillées ou mi-ombragées.",
  });

  const propagationMethod = await datasource
    .getRepository("PropagationMethod")
    .save({
      name: "Bouturage",
      description:
        "Le bouturage est une méthode de multiplication végétative, qui consiste à prélever une partie d'une plante-mère pour la mettre en terre et qu'elle émette des racines et des pousses.",
    });

  const pruningMethod1 = await datasource.getRepository("PruningMethod").save({
    name: "Taille de formation",
    description:
      "La taille de formation est une méthode de taille qui consiste à former la structure de l'arbre.",
  });

  const pruningMethod2 = await datasource.getRepository("PruningMethod").save({
    name: "Taille en vert",
    description:
      "La taille en vert est une méthode de taille qui consiste à tailler les pousses de l'année en cours de croissance.",
  });

  const propagationSteps = await datasource
    .getRepository("PropagationSteps")
    .save({
      stepNumber: 1,
      title: "Préparation du substrat",
      explanation: "Préparer un substrat composé de terreau et de sable.",
    });

  const pruningStep = await datasource.getRepository("PruningStep").save({
    stepNumber: 1,
    title: "Taille de formation",
    explanation:
      "La taille de formation est une méthode de taille qui consiste à former la structure de l'arbre.",
  });

  propagationMethod.steps = [propagationSteps];
  pruningMethod1.steps = [pruningStep];

  await datasource.getRepository("PropagationMethod").save(propagationMethod);
  await datasource.getRepository("PruningMethod").save(pruningMethod1);

  erable.pruningMethods = [pruningMethod1, pruningMethod2];
  erable.propagationMethods = [propagationMethod];
  bambou.pruningMethods = [pruningMethod1];
  bambou.propagationMethods = [propagationMethod];
  olivier.pruningMethods = [pruningMethod1];
  olivier.propagationMethods = [propagationMethod];

  await datasource.getRepository("Specie").save([erable, bambou, olivier]);

  await datasource.getRepository("Bonsai").save([
    {
      name: "Erable",
      species: "Erable",
      age: 2,
      createdAt: new Date(),
      owner: user,
      specie: erable,
    },
    {
      name: "Bambou",
      species: "Bambou",
      age: 3,
      createdAt: new Date(),
      owner: user,
      specie: bambou,
    },
    {
      name: "Olivier",
      species: "Olivier",
      age: 4,
      createdAt: new Date(),
      owner: admin,
      specie: olivier,
    },
  ]);

  await datasource.getRepository("Specie").find({
    where: { name: "Erable du Japon" },
    relations: {
      pruningMethods: true,
      propagationMethods: true,
      bonsais: true,
    },
  });

  await datasource.destroy();
  console.log("Database reset 👍");
}

resetDB().catch(console.error);
