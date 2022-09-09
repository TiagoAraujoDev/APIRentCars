import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implamentations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      name: "Jonh Doe",
      password: "1234",
      email: "jonhdoe@test.com",
      driver_license: "1234567",
    });

    await sendForgotPasswordMailUseCase.execute("jonhdoe@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send a email if user does not exist", async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute("maryBrinn@test.com");
    }).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("Should be able to generate an user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      name: "Paul Doe",
      password: "asdf",
      email: "paulDoe@test.com",
      driver_license: "948720398",
    });

    await sendForgotPasswordMailUseCase.execute("paulDoe@test.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
