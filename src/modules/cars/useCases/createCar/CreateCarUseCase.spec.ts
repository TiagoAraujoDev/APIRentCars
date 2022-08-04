import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create a car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Uno fordcar",
      description: "A regular car for the city",
      daily_rate: 60,
      license_plate: "KDJ-2989",
      fine_amount: 30,
      brand: "Ford",
      category_id: "1927-su97-shgvf-j3hb39",
    });
  });
});
