import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/accounts/User";
import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

/* docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/database
yarn typeorm migration:create src/database/migrations/CreateCategories */
export const appDataSource = new DataSource({
  type: "postgres",
  host: "database_rentcars",
  port: 5432,
  username: "docker",
  password: "rentcars123",
  database: "rentcarsdb",
  entities: [Category, Specification, User],
  migrations: ["./src/database/migrations/*.ts"],
});

appDataSource
  .initialize()
  .then(async () => {
    console.log("database initialize!");
  })
  .catch((err) => console.log(err));
