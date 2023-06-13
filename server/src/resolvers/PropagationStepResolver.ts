import { Query, Resolver } from "type-graphql";
import PropagationSteps from "../entity/PropagationSteps";
import datasource from "../db";

@Resolver(PropagationSteps)
export class PropagationStepResolver {
  @Query(() => [PropagationSteps])
  async propagationSteps(): Promise<PropagationSteps[]> {
    return await datasource
      .getRepository(PropagationSteps)
      .find({ relations: { propagationMethod: true } });
  }
}
