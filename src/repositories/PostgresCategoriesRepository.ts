// Reporitory build to apply the Liskov substitution principle from SOLID
// PostgresCategoriesRepository is a subtype of ICategoryRepositories
import { Category } from "../model/Category";
import { ICategoryRepositories } from "./IcategoryReporitories";

class PostgresCategoriesRepository implements ICategoryRepositories {
  create({ name, description }: Category): void {
    console.log(name, description);
  }
  list(): Category[] {
    return null;
  }
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
}

export { PostgresCategoriesRepository };
