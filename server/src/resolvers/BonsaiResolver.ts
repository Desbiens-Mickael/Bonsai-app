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
import Specie from "../entity/Specie";

@Resolver(Bonsai)
export class BonsaiResolver {
  // Recuperation de tous les bonsais et retourne un tableau de bonsais (Read)
  @Authorized()
  @Query(() => [Bonsai])
  async bonsais(): Promise<Bonsai[]> {
    return await datasource
      .getRepository(Bonsai)
      .find({ relations: { owner: true, specie: true } });
  }

  // Recuperation d'un bonsai en fonction de son id (Read)
  @Authorized()
  @Query(() => Bonsai)
  async getBonsaiById(@Arg("id", () => Int) id: number): Promise<Bonsai> {
    const bonsai = await datasource
      .getRepository(Bonsai)
      .findOne({ where: { id }, relations: { owner: true, specie: true } });

    if (bonsai === null) throw new ApolloError("Bonsai not found", "NOT_FOUND");

    return bonsai;
  }

  // Recuperation de tous les bonsais d'un utilisateur et retourne un tableau de bonsais (Read)
  @Authorized()
  @Query(() => [Bonsai])
  async getBonsaisByUser(
    // @Arg("userId", () => Int) userId: number
    @Ctx() { currentUser }: ContextType
  ): Promise<Bonsai[]> {
    return await datasource.getRepository(Bonsai).find({
      where: { owner: { id: currentUser?.id } },
      relations: { owner: true, specie: true },
    });
  }

  // Creation d'un bonsai et retourne le bonsai créé (Create)
  @Authorized()
  @Mutation(() => Bonsai)
  async createBonsai(
    @Arg("data") { name, specieId, age, photo }: BonsaiInput,
    @Ctx() { currentUser }: ContextType
  ): Promise<Bonsai> {
    const specieExist = await datasource
      .getRepository(Specie)
      .findOne({ where: { id: specieId } });

    if (specieExist === null)
      throw new ApolloError("Specie not found", "NOT_FOUND");

    return await datasource.getRepository(Bonsai).save({
      name,
      specie: specieExist,
      age,
      photo,
      createdAt: new Date(),
      owner: currentUser,
    });
  }

  // Modification d'un bonsai et retourne le bonsai modifié (Update)
  @Authorized()
  @Mutation(() => Bonsai)
  async updateBonsai(
    @Arg("id", () => Int) id: number,
    @Arg("data")
    {
      name,
      specieId,
      age,
      photo,
      repotting,
      nextRepotting,
      ligaturing,
      deligaturing,
    }: UpdateBonsaiInput
  ): Promise<Bonsai> {
    const specieExist = await datasource.getRepository(Specie).findOne({
      where: { id: specieId },
    });
    if (specieExist === null)
      throw new ApolloError("Specie not found", "NOT_FOUND");

    const bonsai = await datasource
      .getRepository(Bonsai)
      .findOne({ where: { id } });
    if (bonsai === null) throw new ApolloError("Bonsai not found", "NOT_FOUND");

    bonsai.name = name;
    bonsai.specie = specieExist;
    bonsai.age = age;
    bonsai.photo = photo;
    bonsai.repotting = repotting;
    bonsai.nextRepotting = nextRepotting;
    bonsai.ligaturing = ligaturing;
    bonsai.deligaturing = deligaturing;
    bonsai.updatedAt = new Date();

    return await datasource.getRepository(Bonsai).save(bonsai);
  }

  // Suppression d'un bonsai par son id (DELETE)
  @Authorized()
  @Mutation(() => Boolean)
  async deleteBonsai(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(Bonsai).delete({ id });

    if (affected === 0) throw new ApolloError("Bonsai not found", "NOT_FOUND");

    return true;
  }
}
