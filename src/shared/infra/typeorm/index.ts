import { DataSource } from "typeorm";

/* docker-compose exec app node --require ts-node/register ./node_modules/typeorm/cli.js migration:run -d src/shared/infra/typeorm
yarn typeorm migration:create src/shared/infra/typeorm/migrations/NOME_DA_MIGRATION */

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "rentcars123",
  database: "rentcarsdb",
  entities: ["./dist/modules/**/entities/*.js"],
  migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
});

export async function createConnection(): Promise<DataSource> {
  const dataSource = await appDataSource
    .setOptions({
      database:
        process.env.NODE_ENV === "test" ? "rentcars_test" : "rentcarsdb",
    })
    .initialize();
  console.log("Database initialize");
  return dataSource;
}
