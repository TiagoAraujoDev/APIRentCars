import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
