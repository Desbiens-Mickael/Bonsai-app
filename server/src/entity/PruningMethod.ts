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
import { ArrayNotEmpty, IsNotEmpty, Length } from "class-validator";

@Entity()
@ObjectType()
class PruningMethod {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(3, 150, { message: "Le nom doit faire entre 3 et 50 caractères" })
  @IsNotEmpty({ message: "Vous avez oublier de renseigner le nom" })
  name: string;

  @Field()
  @Column("text")
  @IsNotEmpty({ message: "Vous avez oublier de renseigner la description" })
  description: string;

  @Field(() => [PruningStep], { nullable: true, defaultValue: [] })
  @OneToMany(() => PruningStep, (pruningStep) => pruningStep.pruningMethod, {
    cascade: true,
  })
  steps?: PruningStep[] | null;

  @Field(() => [Specie])
  @ManyToMany(() => Specie, (specie) => specie.pruningMethods)
  @ArrayNotEmpty({
    message: "Vous avez oublier de renseigner les espèces de vos bonsaï",
  })
  species: Specie[];
}

@InputType()
export class PruningMethodeInput {
  @Field()
  @IsNotEmpty({ message: "Vous avez oublier de renseigner le nom" })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Vous avez oublier de renseigner la description" })
  description: string;

  @Field(() => [Int])
  @ArrayNotEmpty({
    message: "Vous avez oublier de renseigner les espèces de vos bonsaï",
  })
  speciesIds: number[];
}

@InputType()
export class UpdatePruningMethodeInput {
  @Field()
  @IsNotEmpty({ message: "Vous avez oublier de renseigner le nom" })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Vous avez oublier de renseigner la description" })
  description: string;

  @Field(() => [Int])
  stepsIds?: number[];

  @Field(() => [Int])
  @ArrayNotEmpty({
    message: "Vous avez oublier de renseigner les espèces de vos bonsaï",
  })
  speciesIds: number[];
}

export default PruningMethod;
