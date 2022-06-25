import { ISpecificationsRepositories } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
class CreateSpecificationService {
  constructor(private specificationRepositories: ISpecificationsRepositories) {}
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExist =
      this.specificationRepositories.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error(`The Specification Already exist!`);
    }

    this.specificationRepositories.create({ name, description });
  }
}

export { CreateSpecificationService };
