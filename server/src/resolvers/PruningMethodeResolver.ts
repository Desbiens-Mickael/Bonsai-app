import { Query, Resolver } from "type-graphql";
import datasource from "../db";
import PruningMethod from "../entity/PruningMethod";

@Resolver(PruningMethod)
export class PruningMethodResolver {
  @Query(() => [PruningMethod])
  async pruningMethods(): Promise<PruningMethod[]> {
    return await datasource
      .getRepository(PruningMethod)
      .find({ relations: { steps: true, species: { bonsais: true } } });
  }
}
