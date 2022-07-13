import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const importCoategoryUseCase = new ImportCategoryUseCase(
    categoriesRepository
  );
  const importCategoryController = new ImportCategoryController(
    importCoategoryUseCase
  );
  return importCategoryController;
};
