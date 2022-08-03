import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });
  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Jonh Doe",
      email: "jonhdoe@gmail.com",
      password: "1234",
      driver_license: "BRA-2022",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non-existent user", async () => {
    expect(async () => {
      const authenticationData = {
        email: "jonhdoe@gmail.com",
        password: "1234",
      };

      await authenticateUserUseCase.execute(authenticationData);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate a user with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Jonh Doe",
        email: "jonhdoe@gmail.com",
        password: "1234",
        driver_license: "BRA-2022",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "asdf",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
