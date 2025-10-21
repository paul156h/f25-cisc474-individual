/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import TanStackQueryDevtools from "../integrations/devtools";
import appCss from "../styles.css?url"; // ✅ This will be used below
import type { QueryClient } from "@tanstack/react-query";

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My LMS" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        <div className="page">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/grades">Grades</Link>
          </nav>

          <main className="main">
            <Outlet />
          </main>

          <footer className="footer">
            <p>© 2025 Paul's LMS — Built with TanStack + Vite</p>
          </footer>
        </div>

        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            { name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
            TanStackQueryDevtools,
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
