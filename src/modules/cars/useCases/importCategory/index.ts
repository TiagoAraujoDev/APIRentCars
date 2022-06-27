import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCoategoryUseCase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryController(
  importCoategoryUseCase
);

export { importCategoryController };
