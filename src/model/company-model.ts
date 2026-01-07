import { generateToken } from "../util/jwt-util";

export type AccountType = "user" | "company";

export interface RegisterCompanyRequest {
  email: string;
  password: string;

  name: string;
  address?: string;
  phone_number?: string;
  website?: string;
  vision_mission?: string;
  description?: string;
  founding_date?: string; // ISO date string (YYYY-MM-DD)
  logo_path?: string;
  image_path?: string;

  // optional: kalau mau bedain nama user vs company
  user_name?: string;
}

export interface AuthResponse {
  token: string;
  account_type: AccountType;
}

export function toAuthResponse(
  id: number,
  username: string,
  email: string,
  accountType: AccountType
): AuthResponse {
  return {
    token: generateToken(
      {
        id,
        username,
        email,
      },
      "1h"
    ),
    account_type: accountType,
  };
}
