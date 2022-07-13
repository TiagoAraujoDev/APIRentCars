import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepositories: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoriesRepositories.findByName(
      name
    );

    if (categoryAlreadyExist) {
      throw new Error(`The category already exist!`);
    }

    await this.categoriesRepositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
