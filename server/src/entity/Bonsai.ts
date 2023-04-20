import { MaxLength } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity()
@ObjectType()
class Bonsai {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  species: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bonsais, {
    onDelete: "CASCADE",
  })
  owner: User;

  @Field()
  @Column()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  repotting: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nextRepotting: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ligaturing: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deligaturing: Date;
}

@InputType()
export class BonsaiInput {
  @Field()
  @MaxLength(150)
  name: string;

  @Field()
  @MaxLength(150)
  species: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field({ nullable: true })
  photo: string;
}

@InputType()
export class UpdateBonsaiInput {
  @Field()
  @MaxLength(150)
  name: string;

  @Field()
  @MaxLength(150)
  species: string;

  @Field(() => Int, { nullable: true })
  age: number;

  @Field({ nullable: true })
  photo: string;

  @Field({ nullable: true })
  repotting: Date;

  @Field({ nullable: true })
  nextRepotting: Date;

  @Field({ nullable: true })
  ligaturing: Date;

  @Field({ nullable: true })
  deligaturing: Date;
}

export default Bonsai;
