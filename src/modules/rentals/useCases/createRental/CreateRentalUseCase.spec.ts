import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;

describe("Create a Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });
  it("Should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "390478",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a rental to a user that already has rental open", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "3983010",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "390478",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a rental for a car that already has an open rental", async () => {
    // TODO
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "390478",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "390478",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
