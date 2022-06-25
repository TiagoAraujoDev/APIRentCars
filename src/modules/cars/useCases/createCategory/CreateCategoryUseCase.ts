import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepositories: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExist = this.categoriesRepositories.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error(
        `The category ${categoryAlreadyExist.name} already exist!`
      );
    }

    this.categoriesRepositories.create({ name, description });
  }
}

export { CreateCategoryUseCase };
