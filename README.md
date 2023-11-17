# Wordle Clone

A full-stack clone of the popular game `wordle` using NextJS/React and Typescript.  
Unlike most clones which simply work by fetching a random word from a text file without taking into account the rarity of a word, this project actively tries to repeatedly fetch a random word from the backend, comparing the frequency of each word against an external API to check that it matches the difficulty set in the settings, and stops when a word matching the difficulty settings appears.

# NOTE:

-   The supabase DB/Auth server associated with this project is currently disabled, auth/DB/win-loss tracking won't work but the app itself will still work

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
