import AuthForm from "@/components/auth/AuthForm";
import { safeReturnPath } from "@/lib/navigation.mjs";
export default async function RegisterPage({ searchParams }) {
  const query = await searchParams;
  return <AuthForm isRegister returnTo={safeReturnPath(query.next)} />;
}
