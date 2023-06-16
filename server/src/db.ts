import { DataSource } from "typeorm";
import { env } from "./env";
import User from "./entity/User";
import Bonsai from "./entity/Bonsai";
import Specie from "./entity/Specie";
import PropagationMethod from "./entity/PropagationMethod ";
import PropagationSteps from "./entity/PropagationSteps";
import PruningMethode from "./entity/PruningMethod";
import PruningSteps from "./entity/PruningStep";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  entities: [
    User,
    Bonsai,
    Specie,
    PropagationMethod,
    PruningMethode,
    PropagationSteps,
    PruningSteps,
  ],
});

export default datasource;
