import { Router } from "express";

import { SpecificationsRepository } from "../modules/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepositories = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepositories
  );
  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get("/", (request, response) => {
  const specifications = specificationRepositories.list();

  return response.json(specifications);
});

export { specificationsRoutes };
