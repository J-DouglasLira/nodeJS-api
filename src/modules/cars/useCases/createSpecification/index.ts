import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateCategoryController } from "../createCategory/CreateCategoryController";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";

const specificationsRepository = new SpecificationsRepository();
const createSpecifications = new CreateCategoryUseCase(
  specificationsRepository
);
const createSpecificationController = new CreateCategoryController(
  createSpecifications
);

export { createSpecificationController };
