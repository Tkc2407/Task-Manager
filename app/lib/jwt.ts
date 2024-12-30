import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret"; // Ensure fallback in case the environment variable is not set

// Define a TypeScript interface for the decoded token payload
interface TokenPayload {
  userId: string;
}

// Function to generate a JWT token
export const generateToken = (userId: string) => {
  const payload = { userId }; // The payload of the token (usually contains user info)
  const options = { expiresIn: "1h" }; // Token expiration time (1 hour in this case)

  // Sign and return the token
  return jwt.sign(payload, JWT_SECRET, options);
};

// Function to verify a JWT token
export const verifyToken = (token: string): TokenPayload => {
  try {
    // Verify the token and cast the result to TokenPayload type
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    // Optionally, check that the decoded token contains the expected userId field
    if (!decoded || !decoded.userId) {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (error) {
    // If the token is invalid or expired, throw an error
    throw new Error("Invalid or expired token");
  }
};
