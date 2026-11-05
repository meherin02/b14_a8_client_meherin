import AuthForm from "@/components/auth/AuthForm";
import { safeReturnPath } from "@/lib/navigation.mjs";
export default async function LoginPage({ searchParams }) {
  const query = await searchParams;
  return <AuthForm returnTo={safeReturnPath(query.next)} />;
}
