import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUserFromToken(req: Request) {
  try {
    // ✅ Extract the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null; // No token provided
    }

    // ✅ Get the token from the header
    const token = authHeader.split(" ")[1];

    // ✅ Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    if (!decoded || !decoded.userId) {
      return null; // Invalid token
    }

    // ✅ Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        userDetails: true, // Fetch user details (optional)
      },
    });

    return user || null; // Return user or null if not found
  } catch (error) {
    console.error("❌ Token Verification Error:", error);
    return null; // Token is invalid or expired
  }
}
