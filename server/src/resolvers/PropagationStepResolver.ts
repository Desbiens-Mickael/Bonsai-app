import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import PropagationSteps, {
  PropagationStepInput,
} from "../entity/PropagationSteps";
import datasource from "../db";

@Resolver(PropagationSteps)
export class PropagationStepResolver {
  @Query(() => [PropagationSteps])
  async propagationSteps(): Promise<PropagationSteps[]> {
    return await datasource
      .getRepository(PropagationSteps)
      .find({ relations: { propagationMethod: true } });
  }

  @Query(() => PropagationSteps)
  async propagationStepById(
    @Arg("id", () => Int) id: number
  ): Promise<PropagationSteps> {
    const propagationStepExist = await datasource
      .getRepository(PropagationSteps)
      .findOne({
        where: { id },
        relations: { propagationMethod: true },
      });

    if (propagationStepExist === null)
      throw new Error("Cette étape de propagation n'existe pas");

    return propagationStepExist;
  }

  @Mutation(() => PropagationSteps)
  async createPropagationStep(
    @Arg("data") { stepNumber, title, explanation, photo }: PropagationStepInput
  ): Promise<PropagationSteps> {
    const propagationStepExist = await datasource
      .getRepository(PropagationSteps)
      .findOne({ where: { stepNumber } });

    if (propagationStepExist !== null)
      throw new Error("Cette étape de propagation existe déjà");

    const propagationStep = new PropagationSteps();
    propagationStep.stepNumber = stepNumber;
    propagationStep.title = title;
    propagationStep.explanation = explanation;
    propagationStep.photo = photo;

    return await datasource
      .getRepository(PropagationSteps)
      .save(propagationStep);
  }

  @Mutation(() => PropagationSteps)
  async updatePropagationStep(
    @Arg("data")
    { stepNumber, title, explanation, photo }: PropagationStepInput,
    @Arg("id", () => Int) id: number
  ): Promise<PropagationSteps> {
    const propagationStepExist = await datasource
      .getRepository(PropagationSteps)
      .findOne({ where: { id } });

    if (propagationStepExist === null)
      throw new Error("Cette étape de propagation n'existe pas");

    propagationStepExist.stepNumber = stepNumber;
    propagationStepExist.title = title;
    propagationStepExist.explanation = explanation;
    propagationStepExist.photo = photo;

    return await datasource
      .getRepository(PropagationSteps)
      .save(propagationStepExist);
  }

  @Mutation(() => Boolean)
  async deletePropagationStep(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    const propagationStepExist = await datasource
      .getRepository(PropagationSteps)
      .findOne({ where: { id } });

    if (propagationStepExist === null)
      throw new Error("Cette étape de propagation n'existe pas");

    await datasource
      .getRepository(PropagationSteps)
      .remove(propagationStepExist);

    return true;
  }
}
