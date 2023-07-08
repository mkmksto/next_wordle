# NOTE:

-   The supabase DB/Auth server associated with this project is currently disabled, auth/DB/win-loss tracking won't work but the app itself will still work

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

-   https://youtu.be/A5ZN--P9vXM (NextJS Google Auth with NextAuth)
-   https://next-auth.js.org/getting-started/example
-   https://next-auth.js.org/providers/google
-   [NextAuth Supabase Adapter](https://youtu.be/EdYQ9fF-hz4)

## Deeper dive into the hooks, e.g. `useSession`

-   https://next-auth.js.org/getting-started/client

## Middleware (run logic before accessing ANY page)

-   https://next-auth.js.org/configuration/nextjs#middleware

## Supabase adapter for NextAuth

-   https://next-auth.js.org/adapters
-   https://authjs.dev/reference/adapter/supabase

## Supabase - developing locally

-   https://supabase.com/docs/guides/cli/local-development#initialize-your-project?medium=referral&campaign=authjs

## Examples

-   under the `Home` section of your supabase project, the bottom section has example code, e.g. `Next.js subscription and auth`.
-   https://github.com/vercel/nextjs-subscription-payments
-   https://github.com/vercel/nextjs-mysql-auth-starter
-   https://github.com/muxinc/video-course-starter-kit
-   [Querying the DB from inside getServerSideProps](https://github.com/muxinc/video-course-starter-kit/blob/main/pages/index.tsx#L32)
-   [Other Templates using NextAuth](https://vercel.com/templates/nextauth.js)
-   https://github.com/vercel/nextjs-planetscale-nextauth-tailwindcss-template

## Supabase guides (after watching supabase + nexauth adapter)

-   https://www.youtube.com/watch?v=7uKQBl9uZ00 (traversy)
    -   Includes section on how supabase's RLS actually works
-   Caching requests

    -   https://supabase.com/blog/fetching-and-caching-supabase-data-in-next-js-server-components

-   [Creating Databases, Tables, etc.](https://supabase.com/docs/guides/database/tables)
-   [Free supabase + stripe course](https://egghead.io/courses/build-a-saas-product-with-next-js-supabase-and-stripe-61f2bc20)
