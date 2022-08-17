import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to a non existent car", async () => {
    expect(async () => {
      const car_id = "2938740";
      const specifications_id = ["23897429389374"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Uno fordcar",
      description: "A regular car for the city",
      daily_rate: 60,
      license_plate: "KDJ-2989",
      fine_amount: 30,
      brand: "Ford",
      category_id: "1927-su97-shgvf-j3hb39",
    });

    const specifications_id = ["23897429389374"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
