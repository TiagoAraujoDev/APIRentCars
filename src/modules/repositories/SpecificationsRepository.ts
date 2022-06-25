import { Specification } from "../model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepositories,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepositories {
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
  list(): Specification[] {
    return this.specifications;
  }
  findByName(name: string): Specification {
    const specificationAlreadyExist = this.specifications.find(
      (specification) => specification.name === name
    );

    return specificationAlreadyExist;
  }
}

export { SpecificationsRepository };
