import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

import datasource from "../db";
import PruningStep, { PruningStepInput } from "../entity/PruningStep";
import { ApolloError } from "apollo-server-errors";

@Resolver(PruningStep)
export class PruningStepResolver {
  @Query(() => [PruningStep])
  async pruningSteps(): Promise<PruningStep[]> {
    return await datasource
      .getRepository(PruningStep)
      .find({ relations: { pruningMethod: true } });
  }

  @Query(() => PruningStep)
  async getPruningStepById(
    @Arg("id", () => Int) id: number
  ): Promise<PruningStep> {
    const pruningStep = await datasource
      .getRepository(PruningStep)
      .findOne({ where: { id }, relations: { pruningMethod: true } });

    if (pruningStep === null)
      throw new ApolloError(
        "Cette étapes de taille n'existe pas",
        " NOT FOUND"
      );

    return pruningStep;
  }

  @Mutation(() => PruningStep)
  async createPruningStep(
    @Arg("data") { stepNumber, title, explanation, photo }: PruningStepInput
  ): Promise<PruningStep> {
    return await datasource.getRepository(PruningStep).save({
      stepNumber,
      title,
      explanation,
      photo,
    });
  }

  @Mutation(() => PruningStep)
  async updatePruningStep(
    @Arg("id", () => Int) id: number,
    @Arg("data") { stepNumber, title, explanation, photo }: PruningStepInput
  ): Promise<PruningStep> {
    const pruningStep = await datasource
      .getRepository(PruningStep)
      .findOne({ where: { id } });

    if (pruningStep === null)
      throw new ApolloError(
        "Cette étapes de taille n'existe pas",
        " NOT FOUND"
      );

    return await datasource.getRepository(PruningStep).save({
      pruningStep,
      stepNumber,
      title,
      explanation,
    });
  }

  @Mutation(() => Boolean)
  async deletePruningStep(@Arg("id", () => Int) id: number): Promise<boolean> {
    const pruningStep = await datasource
      .getRepository(PruningStep)
      .findOne({ where: { id } });

    if (pruningStep === null)
      throw new ApolloError(
        "Cette étapes de taille n'existe pas",
        " NOT FOUND"
      );

    await datasource.getRepository(PruningStep).remove(pruningStep);
    return true;
  }
}
