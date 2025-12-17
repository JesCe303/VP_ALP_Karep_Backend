import bcrypt from "bcrypt";
import { ResponseError } from "../error/response-error";
import { prismaClient } from "../util/database-util";
import { Validation } from "../validation/validation";
import { CompanyValidation } from "../validation/company-validation";
import { RegisterCompanyRequest, AuthResponse, toAuthResponse } from "../model/company-model";

export class CompanyServices {
  static async register(request: RegisterCompanyRequest): Promise<AuthResponse> {
    const validatedData = Validation.validate(CompanyValidation.REGISTER, request) as RegisterCompanyRequest;

    const existingUser = await prismaClient.user.findFirst({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new ResponseError(400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const userName = validatedData.user_name && validatedData.user_name.trim().length > 0
      ? validatedData.user_name
      : validatedData.name;

    const user = await prismaClient.user.create({
      data: {
        name: userName,
        email: validatedData.email,
        password: hashedPassword,
        address: validatedData.address,
        phone_number: validatedData.phone_number,
      },
    });

    const foundingDate = validatedData.founding_date
      ? new Date(validatedData.founding_date)
      : undefined;

    await prismaClient.company.create({
      data: {
        user_id: user.id,
        email: validatedData.email,
        name: validatedData.name,
        address: validatedData.address,
        phone_number: validatedData.phone_number,
        website: validatedData.website,
        vision_mission: validatedData.vision_mission,
        description: validatedData.description,
        founding_date: foundingDate,
        logo_path: validatedData.logo_path,
        image_path: validatedData.image_path,
      },
    });

    return toAuthResponse(user.id, user.name, user.email, "company");
  }
}
