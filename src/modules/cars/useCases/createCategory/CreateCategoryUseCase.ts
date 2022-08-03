import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepositories: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepositories.findByName(
      name
    );

    if (categoryAlreadyExist) {
      throw new AppError(`The category already exist!`);
    }

    await this.categoriesRepositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
