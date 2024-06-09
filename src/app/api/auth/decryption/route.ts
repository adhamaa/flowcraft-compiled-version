import { decryptPassword } from "@/lib/crypt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const encryptedPassword = searchParams.get('password');

  // Decrypt the data using your decryption function
  const password = decryptPassword(encryptedPassword as string);
  console.log('password:', password)
  if (!password) {
    return Response.json({ error: 'Invalid password' }, { status: 400 });
  }

  return Response.json({ password: password }, { status: 200 });
}
