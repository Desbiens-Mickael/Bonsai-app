import { ApolloError } from "apollo-server-errors";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import datasource from "../db";
import PropagationMethod, {
  PropagationMethodeInput,
} from "../entity/PropagationMethod ";
import Specie from "../entity/Specie";
import PropagationSteps from "../entity/PropagationSteps";

@Resolver(PropagationMethod)
export class PropagationMethodResolver {
  // Récupère tous les modes de propagation et retourne un tableau de PropagationMethod (Read)
  @Query(() => [PropagationMethod])
  async propagationMethods(): Promise<PropagationMethod[]> {
    return await datasource
      .getRepository(PropagationMethod)
      .find({ relations: { steps: true, species: { bonsais: true } } });
  }

  // Récupère un mode de propagation par son id et retourne une PropagationMethod (Read)
  @Query(() => PropagationMethod)
  async propagationMethodById(
    @Arg("id") id: number
  ): Promise<PropagationMethod> {
    const propagationExist = await datasource
      .getRepository(PropagationMethod)
      .findOne({
        where: { id },
        relations: { steps: true, species: { bonsais: true } },
      });

    if (propagationExist === null)
      throw new ApolloError("Propagation method not found", "NOT_FOUND");

    return propagationExist;
  }

  // Création d'un mode de propagation et retourne le mode de propagation créé (Create)
  // @Authorized()
  @Mutation(() => PropagationMethod)
  async createPropagationMethod(
    @Arg("data")
    { name, description, stepsIds, speciesIds }: PropagationMethodeInput
  ): Promise<PropagationMethod> {
    const propagationExist = await datasource
      .getRepository(PropagationMethod)
      .findOne({ where: { name } });

    if (propagationExist !== null)
      throw new ApolloError(
        "Propagation method already exist",
        "ALREADY_EXIST"
      );

    let steps: PropagationSteps[] = [];
    let species: Specie[] = [];

    if (stepsIds !== null) {
      steps = (
        await Promise.all(
          stepsIds.map(async (stepId) => {
            return await datasource.getRepository(PropagationSteps).findOne({
              where: { id: stepId },
            });
          })
        )
      ).filter((step): step is PropagationSteps => step !== null);
    }

    if (speciesIds !== null) {
      species = (
        await Promise.all(
          speciesIds.map(async (specieId) => {
            return await datasource.getRepository(Specie).findOne({
              where: { id: specieId },
            });
          })
        )
      ).filter((specie): specie is Specie => specie !== null);
    }

    const propagationMethod = datasource
      .getRepository(PropagationMethod)
      .create({
        name,
        description,
        steps,
        species,
      });

    return await datasource
      .getRepository(PropagationMethod)
      .save(propagationMethod);
  }

  // Modification d'un mode de propagation et retourne le mode de propagation modifié (Update)
  // @Authorized()
  @Mutation(() => PropagationMethod)
  async updatePropagationMethod(
    @Arg("id") id: number,
    @Arg("data")
    { name, description, stepsIds, speciesIds }: PropagationMethodeInput
  ): Promise<PropagationMethod> {
    const propagationExist = await datasource
      .getRepository(PropagationMethod)
      .findOne({ where: { id } });

    if (propagationExist === null)
      throw new ApolloError("Propagation method not found", "NOT_FOUND");

    let steps: PropagationSteps[] = [];
    let species: Specie[] = [];

    if (stepsIds !== null) {
      steps = (
        await Promise.all(
          stepsIds.map(async (stepId) => {
            const step = await datasource
              .getRepository(PropagationSteps)
              .findOne({
                where: { id: stepId },
              });
            if (step === null)
              throw new ApolloError("Propagation step not found", "NOT_FOUND");
            return step;
          })
        )
      ).filter((step): step is PropagationSteps => step !== null);
    }

    if (speciesIds !== null) {
      species = (
        await Promise.all(
          speciesIds.map(async (specieId) => {
            const specie = await datasource.getRepository(Specie).findOne({
              where: { id: specieId },
            });
            if (specie === null)
              throw new ApolloError("Specie not found", "NOT_FOUND");
            return specie;
          })
        )
      ).filter((specie): specie is Specie => specie !== null);
    }

    return await datasource
      .getRepository(PropagationMethod)
      .save({ name, description, steps, species });
  }

  // Suppression d'un mode de propagation et retourne un boolean (Delete)
  // @Authorized()
  @Mutation(() => Boolean)
  async deletePropagationMethod(@Arg("id") id: number): Promise<boolean> {
    const propagationExist = await datasource
      .getRepository(PropagationMethod)
      .findOne({ where: { id }, relations: { species: true, steps: true } });

    if (propagationExist === null)
      throw new ApolloError("Propagation method not found", "NOT_FOUND");

    // Suppression des modes de propagation dans les espèces
    propagationExist.species.map(async (specie) => {
      specie.propagationMethods = specie.propagationMethods.filter(
        (propagationMethod) => propagationMethod.id !== id
      );
      await datasource.getRepository(Specie).save(specie);
    });

    // Requête SQL avec un QueryBuilder pour supprimer les modes de propagation dans la table de jointure
    await datasource
      .createQueryBuilder()
      .delete()
      .from("specie_propagation_method")
      .where("propagationMethodId = :id", { id })
      .execute();

    // Suppression du mode de propagation et des étapes de propagation associées grâce au cascade
    await datasource.getRepository(PropagationMethod).delete(id);

    return true;
  }
}
