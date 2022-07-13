import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export default (): ListSpecificationController => {
  const specificationsRepository = new SpecificationsRepository();
  const listSpecificationUseCase = new ListSpecificationUseCase(
    specificationsRepository
  );
  const listSpecificationController = new ListSpecificationController(
    listSpecificationUseCase
  );
  return listSpecificationController;
};
