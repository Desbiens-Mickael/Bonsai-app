import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { argon2id, Options, hash, verify } from "argon2";
import Bonsai from "./Bonsai";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: "user" })
  role: string;

  @Field()
  @Column()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedAt: Date;

  @Field(() => [Bonsai], { nullable: true })
  @OneToMany(() => Bonsai, (bonsai) => bonsai.owner, {
    nullable: true,
    // cascade: true,
  })
  bonsais: Bonsai[];
}

@InputType()
export class UserInput {
  @Field()
  @MaxLength(150)
  firstname: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field({ nullable: true })
  role: string;
}

@InputType()
export class userLoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

const hashOptions: Options & { raw?: false } = {
  type: argon2id,
  memoryCost: 2 ** 16,
};

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, hashOptions);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await verify(hash, password);
};

export default User;
