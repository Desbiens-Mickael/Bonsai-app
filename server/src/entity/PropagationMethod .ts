import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Specie from "./Specie";
import PropagationSteps from "./PropagationSteps";

@Entity()
@ObjectType()
class PropagationMethod {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description: string;

  @Field(() => [PropagationSteps], { nullable: true })
  @OneToMany(
    () => PropagationSteps,
    (propagationSteps) => propagationSteps.propagationMethod
  )
  steps: PropagationSteps[] | null;

  @Field(() => [Specie])
  @ManyToMany(() => Specie, (specie) => specie.propagationMethods, {})
  species: Specie[];
}

@InputType()
export class PropagationMethodeInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Int], { nullable: true })
  stepsIds: number[];

  @Field(() => [Int])
  speciesIds: number[];
}

export default PropagationMethod;
