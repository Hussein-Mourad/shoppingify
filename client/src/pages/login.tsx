import AuthCard from "components/AuthCard";
import { ReactElement } from "react";
import { useRouter } from "next/router";

export default function login(): ReactElement {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <AuthCard authType="Login" url="/api/auth/login" />
    </main>
  );
}
