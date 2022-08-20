import { container } from "tsyringe";

import { IDateProvider } from "./DateProviders/IDateProvider";
import { DayjsDateProvider } from "./DateProviders/implamentations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
