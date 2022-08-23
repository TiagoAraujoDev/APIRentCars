import { inject, injectable } from "tsyringe";
import { deleteFile } from "utils/file";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private CarsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.CarsImagesRepository.create(car_id, image);

      if (image) {
        await deleteFile(`./tmp/cars/${image}`);
      }
    });
  }
}

export { UploadCarImagesUseCase };
