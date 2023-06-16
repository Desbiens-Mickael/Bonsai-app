import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import PruningMethod, {
  PruningMethodeInput,
  UpdatePruningMethodeInput,
} from "../entity/PruningMethod";
import { ApolloError } from "apollo-server-errors";
import Specie from "../entity/Specie";
import PruningStep from "../entity/PruningStep";

@Resolver(PruningMethod)
export class PruningMethodResolver {
  @Query(() => [PruningMethod])
  async pruningMethods(): Promise<PruningMethod[]> {
    return await datasource
      .getRepository(PruningMethod)
      .find({ relations: { steps: true, species: { bonsais: true } } });
  }

  @Query(() => PruningMethod)
  async pruningMethodByID(@Arg("id") id: number): Promise<PruningMethod> {
    const pruningExist = await datasource.getRepository(PruningMethod).findOne({
      where: { id },
      relations: { steps: true, species: { bonsais: true } },
    });

    if (pruningExist === null)
      throw new ApolloError(
        "Cette méthode de taille n'existe pas",
        "NOT_FOUND"
      );

    return pruningExist;
  }

  @Mutation(() => PruningMethod)
  async createPruningMethod(
    @Arg("data") { name, description, speciesIds }: PruningMethodeInput
  ): Promise<PruningMethod> {
    const species = (
      await Promise.all(
        speciesIds.map(
          async (id) =>
            await datasource.getRepository(Specie).findOne({ where: { id } })
        )
      )
    ).filter((specie) => specie !== undefined) as Specie[];

    return await datasource.getRepository(PruningMethod).save({
      name,
      description,
      species,
    });
  }

  @Mutation(() => PruningMethod)
  async updatePruningMethod(
    @Arg("data")
    { name, description, speciesIds, stepsIds }: UpdatePruningMethodeInput,
    @Arg("PruningMethodeId") pruningMethodId: number
  ): Promise<PruningMethod> {
    const pruningMethod = await datasource
      .getRepository(PruningMethod)
      .findOne({ where: { id: pruningMethodId } });
    if (pruningMethod === null)
      throw new ApolloError(
        "Cette méthode de taille n'existe pas",
        "NOT_FOUND"
      );

    const species = (
      await Promise.all(
        speciesIds.map(
          async (id) =>
            await datasource.getRepository(Specie).findOne({ where: { id } })
        )
      )
    ).filter((specie) => specie !== undefined) as Specie[];

    if (stepsIds != null && stepsIds.length === 0) {
      const steps = (
        await Promise.all(
          stepsIds.map(
            async (id) =>
              await datasource
                .getRepository(PruningStep)
                .findOne({ where: { id } })
          )
        )
      ).filter((step) => step !== undefined) as PruningStep[];
      pruningMethod.steps = steps;
    }

    pruningMethod.name = name;
    pruningMethod.description = description;
    pruningMethod.species = species;

    return await datasource.getRepository(PruningMethod).save(pruningMethod);
  }

  @Mutation(() => Boolean)
  async deletePruningMethod(@Arg("id") id: number): Promise<boolean> {
    const pruningMethod = await datasource
      .getRepository(PruningMethod)
      .findOne({ where: { id } });

    if (pruningMethod === null)
      throw new ApolloError(
        "Cette méthode de taille n'existe pas",
        "NOT_FOUND"
      );

    await datasource.getRepository(PruningMethod).remove(pruningMethod);
    return true;
  }
}
