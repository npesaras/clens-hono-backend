import { UnauthorizedError } from "@/utils/error";
import { Context, Next } from "hono";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error("ACCESS_TOKEN environment variable is not set");
}

export async function authenticationMiddleware(c: Context, next: Next) {
  const accessToken = c.req.header("Authorization")?.split("Bearer ")[1];

  if (!accessToken) {
    throw new UnauthorizedError("Access token is required");
  }

  // Validate against environment variable token
  if (accessToken !== ACCESS_TOKEN) {
    throw new UnauthorizedError("Invalid access token");
  }

  await next();
}