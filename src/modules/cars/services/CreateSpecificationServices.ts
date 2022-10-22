import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: ISpecificationsRepository) { }
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

export { CreateSpecificationService };
