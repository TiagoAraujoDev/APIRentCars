import dayjs from "dayjs";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implamentations/DayjsDateProvider";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let rentalsRepositoryInMemory: IRentalsRepository;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let dateProvider: IDateProvider;
let carsRepository: ICarsRepository;

describe("Create a devolution", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepository
    );
  });

  it("Should be able to create a devolution with all information", async () => {
    const car = await carsRepository.create({
      name: "FordCar",
      description: "Popular car",
      daily_rate: 100,
      fine_amount: 20,
      brand: "Ford",
      license_plate: "KDJ-9374",
      category_id: "1234",
    });

    const rental = await rentalsRepositoryInMemory.create({
      user_id: "001",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    const rentalEnded = await devolutionRentalUseCase.execute(rental);

    expect(rentalEnded).toHaveProperty("id");
    expect(rentalEnded).toHaveProperty("end_date");
    expect(rentalEnded.car_id).toEqual(car.id);
    expect(rentalEnded.total).toEqual(100);
  });
});
