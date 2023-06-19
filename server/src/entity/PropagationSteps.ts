import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PropagationMethod from "./PropagationMethod ";

@Entity()
@ObjectType()
class PropagationSteps {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  stepNumber: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("text")
  explanation: string;

  // à modifier quend l'entité Photo sera créée
  @Field({ nullable: true })
  @Column({ nullable: true })
  photo?: string;

  @Field(() => PropagationMethod)
  @ManyToOne(
    () => PropagationMethod,
    (propagationMethod) => propagationMethod.steps,
    { onDelete: "CASCADE" }
  )
  propagationMethod: PropagationMethod;
}

@InputType()
export class PropagationStepInput {
  @Field(() => Int)
  stepNumber: number;

  @Field()
  title: string;

  @Field()
  explanation: string;

  @Field({ nullable: true })
  photo: string;
}

export default PropagationSteps;
