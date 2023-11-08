import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from 'next-auth';
import { sendRequest } from "../../../../utils/api";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from "dayjs";

async function refreshAccessToken(token: JWT) {

  console.log("token", token);
    const res = await sendRequest<IBackendRes<JWT>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
        method: "POST",
        body: { refresh_token: token?.refresh_token }
    })

    if (res.data) {
        console.log(">>> check old token: ", token.access_token);
        console.log(">>> check new token: ", res.data?.access_token)

        return {
            ...token,
            access_token: res.data?.access_token ?? "",
            refresh_token: res.data?.refresh_token ?? "",
            access_expire: dayjs(new Date()).add(
                +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
            ).unix(),
            error: ""
        }
    } else {
        //failed to refresh token => do nothing
        return {
            ...token,
            error: "RefreshAccessTokenError", // This is used in the front-end, and if present, we can force a re-login, or similar
        }
    }

}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
                    method: "POST",
                    body: {
                        username: credentials?.username,
                        password: credentials?.password,
                    },
                })

                if (res && res.data) {
                    return res.data as any;
                } else {
                    throw new Error(res?.message as string)
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider !== "credentials") {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: "POST",
                    body: {
                        type: account?.provider?.toLocaleUpperCase(),
                        user: user
                    },
                })
                if (res.data) {
                    token.access_token = res.data?.access_token;
                    token.refresh_token = res.data.refresh_token;
                    token.user = res.data.user;
                    token.access_expire = dayjs(new Date()).add(
                        +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)
                    ).unix();
                }
            }

            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                token.refresh_token = user.refresh_token;
                //@ts-ignore
                token.user = user.user;
                //@ts-ignore
                token.access_expire = dayjs(new Date()).add(
                    +(process.env.TOKEN_EXPIRE_NUMBER as string), (process.env.TOKEN_EXPIRE_UNIT as any)

                ).unix();

            }

            const isTimeAfter = dayjs(dayjs(new Date())).isAfter(dayjs.unix((token?.access_expire as number ?? 0)));

            if (isTimeAfter) {
                return refreshAccessToken(token)
            }

            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;
                session.access_expire = token.access_expire;
                session.error = token.error
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }