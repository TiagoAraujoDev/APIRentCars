import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailable(
    name: string,
    brand: string,
    category_id: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (name && car.name === name) ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }
      return null;
    });
    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }
}

export { CarsRepositoryInMemory };