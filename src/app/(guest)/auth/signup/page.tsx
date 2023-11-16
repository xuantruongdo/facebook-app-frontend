import AuthSignUp from "@/components/auth/auth.signup";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up',
  description: "Social media website",
}

const SignUpPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <AuthSignUp />
    </>
  );
};

export default SignUpPage;
