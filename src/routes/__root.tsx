import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ QueryClient: QueryClient }>()(
  {
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

    shellComponent: RootDocument,
  }
);

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <HeadContent />
      </head>
      <body className="p-0 sm:p-6 min-h-screen dark:bg-gradient-to-r dark:from-[#1b2641]  dark:to-[#56606e]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
