import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/tanstack-react-start";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import appCss from "../styles.css?url";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// This is from Convex tutorial -> not working
// const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
//   // const auth = await getAuth(getRequest()); //old way
//   const authObj = await auth();
//   const token = await authObj.getToken({ template: "convex" });
//   return {
//     userId: authObj.userId,
//     token,
//   };
// });

export const Route = createRootRouteWithContext<{
  QueryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  // This is from Convex tutorial -> not working
  // beforeLoad: async (ctx) => {
  //   console.log("in beforeLoad...");
  //   const auth = await fetchClerkAuth();
  //   console.log("auth: ", auth);
  //   if (auth.token) {
  //     ctx.context.convexQueryClient.serverHttpClient?.setAuth(auth.token);
  //   }

  //   return {
  //     userId: auth.userId,
  //     token: auth.token,
  //   };
  // },
  shellComponent: ({ children }) => {
    const context = useRouteContext({ from: Route.id });
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk
          client={context.convexClient}
          useAuth={useAuth}
        >
          <RootDocument children={children} />
        </ConvexProviderWithClerk>
      </ClerkProvider>
    );
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <HeadContent />
      </head>
      <body className="p-0 sm:p-6 min-h-screen dark:bg-gradient-to-r dark:from-[#1b2641]  dark:to-[#56606e]">
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton mode="modal">
            <Button variant={"default"}>Sign in</Button>
          </SignInButton>
        </Unauthenticated>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
