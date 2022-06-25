import { Router } from "express";

import { CategoriesRepositories } from "../modules/repositories/CategoriesRepository";
// import { PostgresCategoriesRepository } from "../repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../modules/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepositories = new CategoriesRepositories();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(
    categoriesRepositories
  );
  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepositories.list();

  return response.json(categories);
});

export { categoriesRoutes };
