import { ICategoryRepositories } from "../repositories/IcategoryReporitories";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepositories: ICategoryRepositories) {}
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

export { CreateCategoryService };
