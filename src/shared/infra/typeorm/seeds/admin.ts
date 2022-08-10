import bcryptjs from "bcryptjs";
import { v4 as uuid } from "uuid";

import { createConnection } from "../index";

async function create() {
  const connection = await createConnection();

  const password = await bcryptjs.hash("admin", 8);

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar)
    values('${uuid()}', 'admin', 'admin@rentcars.com.br', '${password}', true, 'now()', 'XXX-0000', 'avatar')
`);

  await connection.destroy();
}

create().then(() => console.log("User admin created"));
