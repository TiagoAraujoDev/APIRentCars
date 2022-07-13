import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute(): Promise<Category[]> {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };
