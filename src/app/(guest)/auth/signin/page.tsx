import AuthSignIn from "@/components/auth/auth.signin";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description: "Social media website",
}
 

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
      redirect("/");
  }

  return (
    <>
      <AuthSignIn />
    </>
  );
};

export default SignInPage;
