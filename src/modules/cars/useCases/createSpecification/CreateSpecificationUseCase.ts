import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) { }
  execute({ description, name }: IRequest): void {
    const specificationAlreadyExist =
      this.specificationsRepository.findByName(name);
    if (specificationAlreadyExist) {
      throw new Error("Specification already Exists!");
    }
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
