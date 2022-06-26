import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
class CreateSpecificationUseCase {
  constructor(private specificationRepositories: ISpecificationsRepository) {}
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExist =
      this.specificationRepositories.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error(`The Specification Already exist!`);
    }

    this.specificationRepositories.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
