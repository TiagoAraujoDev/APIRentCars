import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createCategory";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handler(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  const specifications = specificationsRepository.list();

  return response.json(specifications);
});

export { specificationsRoutes };
