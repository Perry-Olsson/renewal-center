import { EmailError, RequestBodyError } from "../../../src/utils";
import validator from "email-validator";
import bcrypt from "bcryptjs";
import { Prisma } from ".prisma/client";

//write password hash logic for USER type customers
class _Customer {
  public async initialize(reqBody: any): Promise<Prisma.CustomerCreateInput> {
    if (typeof reqBody !== "object") throw new RequestBodyError(reqBody);

    if (!this._validateEmail(reqBody.email))
      throw new EmailError(reqBody.email);

    if (reqBody.type === "GUEST") delete reqBody.password;
    else {
      reqBody.password = await bcrypt.hash(reqBody.password, 8);
    }

    return reqBody as Prisma.CustomerCreateInput;
  }

  private _validateEmail(email: any): boolean {
    return validator.validate(email);
  }
}

export const Customer = new _Customer();