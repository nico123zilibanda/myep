import { cookies } from "next/headers"; // For getting cookies server-side
import { verifyJwt } from "./jwt"; // Ensure verifyJwt is imported correctly

// Current user type with role
export type CurrentUser = {
  id: string;
  email: string;
  role: string;
};

// Function to check if the user is authenticated using the JWT token
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies(); // Using cookies() from next/headers
  const token = cookieStore.get("token")?.value; // Get the token cookie

  console.log("getCurrentUser cookie token:", token); // Debugging

  if (!token) {
    return null; // No token found, user is not authenticated
  }

  // Verify the JWT token
  let payload;
  try {
    payload = verifyJwt(token); // This should decode and verify the JWT token
  } catch (err) {
    console.error("JWT verification failed:", err); // Log the error
    return null; // Token verification failed, return null
  }

  console.log("JWT payload:", payload); // Debugging

  if (!payload || !payload.id || !payload.role) {
    return null; // Invalid JWT payload or missing user details
  }

  // Return the basic user information (without fetching from database for now)
  return {
    id: payload.id.toString(),
    email: payload.email || "",
    role: payload.role,
  };
}
