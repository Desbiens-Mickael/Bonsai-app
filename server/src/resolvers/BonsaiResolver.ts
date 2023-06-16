import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { ContextType } from "..";
import datasource from "../db";
import Bonsai, { BonsaiInput, UpdateBonsaiInput } from "../entity/Bonsai";

@Resolver(Bonsai)
export class BonsaiResolver {
  // @Authorized()
  @Query(() => [Bonsai])
  async bonsais(): Promise<Bonsai[]> {
    return await datasource
      .getRepository(Bonsai)
      .find({ relations: { owner: true } });
  }

  // @Authorized()
  @Query(() => Bonsai)
  async getBonsaiById(@Arg("id", () => Int) id: number): Promise<Bonsai> {
    const bonsai = await datasource
      .getRepository(Bonsai)
      .findOne({ where: { id } });
    if (bonsai === null) throw new ApolloError("Bonsai not found", "NOT_FOUND");
    return bonsai;
  }

  @Query(() => [Bonsai])
  async getBonsaisByUser(
    @Arg("userId", () => Int) userId: number
  ): Promise<Bonsai[]> {
    return await datasource
      .getRepository(Bonsai)
      .find({ where: { owner: { id: userId } } });
  }

  @Authorized()
  @Mutation(() => Bonsai)
  async createBonsai(
    @Arg("data") { name, species, age, photo }: BonsaiInput,
    @Ctx() { currentUser }: ContextType
  ): Promise<Bonsai> {
    const bonsai = await datasource.getRepository(Bonsai).save({
      name,
      species,
      age,
      photo,
      createdAt: new Date(),
      owner: currentUser,
    });
    return bonsai;
  }

  // @Authorized()
  @Mutation(() => Bonsai)
  async updateBonsai(
    @Arg("id", () => Int) id: number,
    @Arg("data")
    {
      name,
      species,
      age,
      photo,
      repotting,
      nextRepotting,
      ligaturing,
      deligaturing,
    }: UpdateBonsaiInput
  ): Promise<Bonsai> {
    const bonsai = await datasource
      .getRepository(Bonsai)
      .findOne({ where: { id } });
    if (bonsai === null) throw new ApolloError("Bonsai not found", "NOT_FOUND");
    bonsai.name = name;
    bonsai.species = species;
    bonsai.age = age;
    bonsai.photo = photo;
    bonsai.repotting = repotting;
    bonsai.nextRepotting = nextRepotting;
    bonsai.ligaturing = ligaturing;
    bonsai.deligaturing = deligaturing;
    bonsai.updatedAt = new Date();
    return await datasource.getRepository(Bonsai).save(bonsai);
  }
}
