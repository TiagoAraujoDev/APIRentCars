import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create(): Promise<void> {
    const rental = new Rental();

    Object.assign(rental, {
      // TODO
    });

    this.rentals.push(rental);
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
}

export { RentalsRepositoryInMemory };
