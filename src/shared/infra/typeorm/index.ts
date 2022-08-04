import "reflect-metadata";
import { DataSource } from "typeorm";

// import { User } from "@modules/accounts/infra/typeorm/entities/User";
// import { Category } from "@modules/cars/infra/typeorm/entities/Category";
// import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

/* docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/shared/infra/typeorm
yarn typeorm migration:create src/shared/infra/typeorm/migrations/NOME_DA_MIGRATION */
export const appDataSource = new DataSource({
  type: "postgres",
  host: "database_rentcars",
  port: 5432,
  username: "docker",
  password: "rentcars123",
  database: "rentcarsdb",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

appDataSource
  .initialize()
  .then(async () => {
    console.log("database initialize!");
  })
  .catch((err) => console.log(err));
