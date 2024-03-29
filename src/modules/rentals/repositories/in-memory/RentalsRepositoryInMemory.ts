import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      start_date: new Date(),
      end_date: null,
      expected_return_date,
      total: null,
      create_at: new Date(),
      updated_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async findRentalsByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
