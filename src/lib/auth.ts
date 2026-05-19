import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

export async function getUserIdFromToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as DecodedToken;
    return decoded.userId;
  } catch {
    return null;
  }
}
