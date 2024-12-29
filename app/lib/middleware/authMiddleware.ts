import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface UserPayload {
  userId: string;
}

const authMiddleware = (req: NextRequest): UserPayload | null => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default authMiddleware;
