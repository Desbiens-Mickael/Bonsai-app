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
import jwt from "jsonwebtoken";
import datasource from "../db";
import User, {
  hashPassword,
  UserInput,
  userLoginInput,
  verifyPassword,
} from "../entity/User";
import { env } from "../env";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource
      .getRepository(User)
      .find({ relations: { bonsais: true } });
  }

  @Query(() => User)
  async getUserById(@Arg("id", () => Int) id: number): Promise<User> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id } });
    if (user === null) throw new ApolloError("User not found", "NOT_FOUND");
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") { firstname, email, password, role }: UserInput,
    @Ctx() { res }: ContextType
  ): Promise<User> {
    const userCheck = await datasource.getRepository(User).findOne({
      where: { email },
    });

    if (userCheck !== null)
      throw new ApolloError("User already exists", "ALREADY_EXISTS");

    const user = await datasource.getRepository(User).save({
      firstname,
      email,
      password: await hashPassword(password),
      role,
      createdAt: new Date(),
    });

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("data") { firstname, email, password, role }: UserInput
  ): Promise<User> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id } });

    if (user === null) throw new ApolloError("User not found", "NOT_FOUND");

    const userCheck = await datasource.getTreeRepository(User).findOne({
      where: { email },
    });

    if (userCheck !== null && userCheck.id !== id)
      throw new ApolloError("User already exists", "ALREADY_EXISTS");

    user.firstname = firstname;
    user.email = email;
    user.password = await hashPassword(password);
    user.role = role;
    user.updatedAt = new Date();

    const updateUser = await datasource.getRepository(User).save(user);

    return updateUser;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(User).delete(id);
    if (affected === 0) throw new ApolloError("User not found", "NOT_FOUND");
    return true;
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: userLoginInput,
    @Ctx() { res }: ContextType
  ): Promise<string> {
    const user = await datasource.getRepository(User).findOne({
      where: { email },
    });

    if (user === null || !(await verifyPassword(password, user.password)))
      throw new ApolloError("Invalid credentials", "INVALID_CREDENTIALS");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: ContextType): Promise<boolean> {
    res.clearCookie("token");
    return true;
  }

  @Authorized()
  @Query(() => User)
  async getCurrentUser(@Ctx() { currentUser }: ContextType): Promise<User> {
    return currentUser as User;
  }
}
