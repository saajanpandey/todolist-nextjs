import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("http://localhost:3000");
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Login - NextAuth.js</title>
      </Head>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Sign in
      </button>
    </>
  );
}
