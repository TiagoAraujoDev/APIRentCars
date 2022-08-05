import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create a car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Uno fordcar",
      description: "A regular car for the city",
      daily_rate: 60,
      license_plate: "KDJ-2989",
      fine_amount: 30,
      brand: "Ford",
      category_id: "1927-su97-shgvf-j3hb39",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with the same license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Citroen C3",
        description: "A regular car for the city",
        daily_rate: 90,
        license_plate: "KDJ-2989",
        fine_amount: 70,
        brand: "Citroen",
        category_id: "1927-su97-shgvf-j3hb39",
      });

      await createCarUseCase.execute({
        name: "Citroen C3",
        description: "A regular car for the city",
        daily_rate: 90,
        license_plate: "KDJ-2989",
        fine_amount: 70,
        brand: "Citroen",
        category_id: "1927-su97-shgvf-j3hb39",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with availability by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Hilux",
      description: "A car for the farm",
      daily_rate: 150,
      license_plate: "OSI-9238",
      fine_amount: 200,
      brand: "Toyota",
      category_id: "1927-su97-shgvf-j3hb39",
    });

    expect(car).toHaveProperty("available", true);
  });
});
