import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implamentations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });
  it("Should be able to create a rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ford Car",
      description: "Popular car",
      daily_rate: 100,
      fine_amount: 20,
      license_plate: "KDI-2928",
      category_id: "1234",
      brand: "Ford",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "001",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a rental to a user that already has rental open", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "002",
      car_id: "00009",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "002",
        car_id: "00003",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this user!")
    );
  });

  it("Should not be able to create a rental for a car that already has an open rental", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "003",
      car_id: "00004",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "004",
        car_id: "00004",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("Should not be able to create a rental with a expected return date minor than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "005",
        car_id: "00005",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("The rent is lower than 24 hours!"));
  });
});
