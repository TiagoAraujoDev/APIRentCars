import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepositories: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist =
      await this.specificationRepositories.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error(`The Specification Already exist!`);
    }

    await this.specificationRepositories.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
