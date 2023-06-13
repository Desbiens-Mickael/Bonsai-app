import { Query, Resolver } from "type-graphql";

import datasource from "../db";
import PruningStep from "../entity/PruningStep";

@Resolver(PruningStep)
export class PruningStepResolver {
  @Query(() => [PruningStep])
  async pruningSteps(): Promise<PruningStep[]> {
    return await datasource
      .getRepository(PruningStep)
      .find({ relations: { pruningMethod: true } });
  }
}
