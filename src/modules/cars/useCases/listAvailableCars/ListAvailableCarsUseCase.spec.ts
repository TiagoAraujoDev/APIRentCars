import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi TT",
      description: "A superCar",
      license_plate: "LSJ-2927",
      daily_rate: 300,
      fine_amount: 400,
      brand: "Audi",
      category_id: "8c90e91e-f735-4dd1-b1f0-31d3d91cbe64",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by the brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Range Rover",
      description: "High end SUV",
      license_plate: "KSD-3093",
      daily_rate: 250,
      fine_amount: 300,
      brand: "Land Rover",
      category_id: "d9dhf-9helkd0-djdbs93-nxb7x8x9v",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Land Rover",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by the name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Onix",
      description: "Popular car",
      license_plate: "KDI-0399",
      daily_rate: 150,
      fine_amount: 200,
      brand: "Chevrolet",
      category_id: "jd0d8d0-aksd0d867-dd98s9s8-d8d9d87",
    });
    const cars = await listAvailableCarsUseCase.execute({ name: "Onix" });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by the category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Popular car",
      license_plate: "LLS-9198",
      daily_rate: 50,
      fine_amount: 80,
      brand: "Volkswagen",
      category_id: "8l90e91e-f739-4dd1-bif0-39d3491cbeuo",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "8l90e91e-f739-4dd1-bif0-39d3491cbeuo",
    });

    expect(cars).toEqual([car]);
  });
});
