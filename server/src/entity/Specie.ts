import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Bonsai from "./Bonsai";
import PropagationMethod from "./PropagationMethod ";
import PruningMethod from "./PruningMethod";

@Entity()
@ObjectType()
class Specie {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  culture: string;

  @Field(() => [PropagationMethod])
  @ManyToMany(
    () => PropagationMethod,
    (propagationMethod) => propagationMethod.species
  )
  @JoinTable({ name: "specie_propagation_method" })
  propagationMethods: PropagationMethod[];

  @Field(() => [PruningMethod])
  @ManyToMany(() => PruningMethod, (pruningMethod) => pruningMethod.species)
  @JoinTable({ name: "specie_pruning_method" })
  pruningMethods: PruningMethod[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Field(() => [Bonsai])
  @OneToMany(() => Bonsai, (bonsai) => bonsai.specie)
  bonsais: Bonsai[];
}

@InputType()
export class SpecieInput {
  @Field()
  @MaxLength(30)
  @MinLength(3)
  name: string;

  @Field()
  @MinLength(3)
  description: string;

  @Field({ nullable: true })
  @MinLength(3)
  culture: string;

  @Field(() => [Int], { nullable: true })
  propagationMethodId: [number];

  @Field(() => [Int], { nullable: true })
  pruningMethodId: [number];

  @Field({ nullable: true })
  @MaxLength(255)
  photo: string;
}

export default Specie;
