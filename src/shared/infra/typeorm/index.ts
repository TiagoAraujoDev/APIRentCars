import { DataSource } from "typeorm";

/* docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/shared/infra/typeorm
yarn typeorm migration:create src/shared/infra/typeorm/migrations/NOME_DA_MIGRATION */

export const appDataSource = new DataSource({
  type: "postgres",
  host: "database_rentcars",
  port: 5432,
  username: "docker",
  password: "rentcars123",
  database: "rentcarsdb",
  // synchronize: true,
  // logging: true,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export async function createConnection(
  host = "localhost"
): Promise<DataSource> {
  const dataSource = await appDataSource.setOptions({ host }).initialize();
  console.log("Database initialize");
  return dataSource;
}
