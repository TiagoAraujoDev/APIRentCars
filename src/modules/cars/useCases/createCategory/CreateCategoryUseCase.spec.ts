import { AppError } from "@shared/errors/AppError";

import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "SUV",
      description: "Big car for the family.",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a category that already exist", async () => {
    const category = {
      name: "SUV",
      description: "Big car for the family.",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("The category already exist!"));
  });
});
