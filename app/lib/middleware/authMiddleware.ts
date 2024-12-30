import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface UserPayload {
  userId: string;
}

const authMiddleware = (req: NextRequest): UserPayload | null => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  // If no token is found, return null or throw an error
  if (!token) {
    console.log("No token")
    throw new Error("No token provided");
  }

  try {
    // Verify token with secret (make sure JWT_SECRET is set)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;

    return decoded; // Return the decoded user payload
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }

    throw new Error("Authentication error");
  }
};

export default authMiddleware;
