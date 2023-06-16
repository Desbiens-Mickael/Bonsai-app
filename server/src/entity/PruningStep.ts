import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PruningMethod from "./PruningMethod";

@Entity()
@ObjectType()
class PruningStep {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  stepNumber: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  explanation: string;

  // à modifier quend l'entité Photo sera créée
  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Field(() => PruningMethod)
  @ManyToOne(() => PruningMethod, (pruningMethod) => pruningMethod.steps, {
    onDelete: "CASCADE",
  })
  pruningMethod: PruningMethod;
}

@InputType()
export class PruningStepInput {
  @Field(() => Int)
  stepNumber: number;

  @Field()
  title: string;

  @Field()
  explanation: string;

  @Field({ nullable: true })
  photo: string;
}

export default PruningStep;
