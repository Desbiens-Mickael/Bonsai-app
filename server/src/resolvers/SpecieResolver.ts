import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import Specie, { SpecieInput } from "../entity/Specie";
import datasource from "../db";
import { ApolloError } from "apollo-server-errors";
import PropagationMethod from "../entity/PropagationMethod ";
import PruningMethod from "../entity/PruningMethod";

@Resolver(Specie)
export class SpecieResolver {
  // Recuperation de toutes les species et retourne un tableau de species (Read)
  @Query(() => [Specie])
  async species(): Promise<Specie[]> {
    return await datasource.getRepository(Specie).find({
      relations: {
        bonsais: true,
        pruningMethods: { steps: true },
        propagationMethods: { steps: true },
      },
    });
  }

  // Recuperation d'une specie en fonction de son id (Read)
  @Query(() => Specie)
  async specie(id: number): Promise<Specie> {
    const specie = await datasource.getRepository(Specie).findOne({
      where: { id },
      relations: {
        bonsais: true,
        pruningMethods: { steps: true },
        propagationMethods: { steps: true },
      },
    });

    if (specie === null) throw new ApolloError("Specie not found", "NOT_FOUND");

    return specie;
  }

  // Creation d'une specie et retourne la specie créée (Create)
  // @Authorized()
  @Mutation(() => Specie)
  async createSpecie(
    @Arg("data")
    {
      name,
      description,
      culture,
      propagationMethodId,
      pruningMethodId,
      photo,
    }: SpecieInput
  ): Promise<Specie> {
    let propagationMethod: PropagationMethod[] = [];
    let pruningMethod: PruningMethod[] = [];

    if (propagationMethodId !== null) {
      propagationMethod = (
        await Promise.all(
          propagationMethodId.map(async (id) => {
            const propagation = await datasource
              .getRepository(PropagationMethod)
              .findOne({
                where: { id },
              });
            if (propagation === null)
              throw new ApolloError(
                "Propagation method not found",
                "NOT_FOUND"
              );
            return propagation;
          })
        )
      ).filter((method): method is PropagationMethod => method !== null);
    }

    if (pruningMethodId !== null) {
      pruningMethod = (
        await Promise.all(
          pruningMethodId.map(async (id) => {
            const pruning = await datasource
              .getRepository(PruningMethod)
              .findOne({
                where: { id },
              });
            if (pruning === null)
              throw new ApolloError("Pruning method not found", "NOT_FOUND");
            return pruning;
          })
        )
      ).filter((method): method is PruningMethod => method !== null);
    }

    const specie = await datasource.getRepository(Specie).save({
      name,
      description,
      culture,
      propagationMethod,
      pruningMethod,
      photo,
    });
    return specie;
  }

  // Modification d'une specie et retourne la specie modifiée (Update)
  // @Authorized()
  @Mutation(() => Specie)
  async updateSpecie(
    @Arg("specieId", () => Int) specieId: number,
    @Arg("data")
    {
      name,
      description,
      culture,
      propagationMethodId,
      pruningMethodId,
      photo,
    }: SpecieInput
  ): Promise<Specie> {
    const specieExist = await datasource.getRepository(Specie).findOne({
      where: { id: specieId },
    });

    let propagationMethod: PropagationMethod[] = [];
    let pruningMethod: PruningMethod[] = [];

    if (propagationMethodId !== null) {
      propagationMethod = (
        await Promise.all(
          propagationMethodId.map(async (id) => {
            return await datasource.getRepository(PropagationMethod).findOne({
              where: { id },
            });
          })
        )
      ).filter((method): method is PropagationMethod => method !== null);
    }

    if (pruningMethodId !== null) {
      pruningMethod = (
        await Promise.all(
          pruningMethodId.map(async (id) => {
            return await datasource.getRepository(PruningMethod).findOne({
              where: { id },
            });
          })
        )
      ).filter((method): method is PruningMethod => method !== null);
    }

    if (specieExist === null)
      throw new ApolloError("Specie not found", "NOT_FOUND");

    specieExist.name = name;
    specieExist.description = description;
    specieExist.culture = culture;
    specieExist.pruningMethods = pruningMethod;
    specieExist.propagationMethods = propagationMethod;
    specieExist.photo = photo;

    const specie = await datasource.getRepository(Specie).save(specieExist);

    return specie;
  }

  // Suppression d'une specie et retourne un boolean (Delete)
  // @Authorized()
  @Mutation(() => Boolean)
  async deleteSpecie(
    @Arg("specieId", () => Int) specieId: number
  ): Promise<boolean> {
    const { affected } = await datasource
      .getRepository(Specie)
      .delete(specieId);

    if (affected === 0) throw new ApolloError("Specie not found", "NOT_FOUND");

    return true;
  }
}
