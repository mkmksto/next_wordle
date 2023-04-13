# Tech stack

-   tailwind
-   download some react keyboard or something
-   react icons
-   zustand

Later

-   authentication for storing of score data
-   Firebase and auth
-   2-player mode(first to guess correct answer).

## Dev Notes

### Errors

For the JWT Secret Error, refer to this:  
https://next-auth.js.org/configuration/options#secret
and do something like this:

```ts
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
```

# Auth Resources

## Guides used

-   https://youtu.be/A5ZN--P9vXM
-   https://next-auth.js.org/getting-started/example
-   https://next-auth.js.org/providers/google

## Deeper dive into the hooks, e.g. `useSession`

-   https://next-auth.js.org/getting-started/client

## Middleware (run logic before accessing ANY page)

-   https://next-auth.js.org/configuration/nextjs#middleware

## Supabase adapter for NextAuth

-   https://next-auth.js.org/adapters
-   https://authjs.dev/reference/adapter/supabase

## Supabase - developing locally

-   https://supabase.com/docs/guides/cli/local-development#initialize-your-project?medium=referral&campaign=authjs
