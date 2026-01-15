import jwt from "jsonwebtoken";

// Token secret kutoka kwenye env
const JWT_SECRET = process.env.JWT_SECRET!;

// Updated payload type
export type JwtPayload = {
  id: string;
  email: string;
  role: "ADMIN" | "YOUTH";
  fullName: string; // Add fullName
};

// Sign JWT na payload kamili
export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// Verify JWT na return payload kamili au null
export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
