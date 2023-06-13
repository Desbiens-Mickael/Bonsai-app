import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Specie from "./Specie";
import PruningStep from "./PruningStep";

@Entity()
@ObjectType()
class PruningMethod {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("text")
  description: string;

  @Field(() => [PruningStep], { nullable: true })
  @OneToMany(() => PruningStep, (pruningStep) => pruningStep.pruningMethod, {
    cascade: true,
  })
  steps: PruningStep[];

  @Field(() => [Specie])
  @ManyToMany(() => Specie, (specie) => specie.pruningMethods)
  species: Specie[];
}

@InputType()
export class PruningMethodeInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Int])
  stepsIds: number[];
}

export default PruningMethod;
