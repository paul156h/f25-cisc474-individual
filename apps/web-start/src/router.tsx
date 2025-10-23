// src/router.tsx
import { createRouter } from "@tanstack/react-router";
import * as TanstackQuery from "./integrations/root-provider";
import { routeTree } from "./routeTree.gen"; // ✅ this imports the full route tree
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { Auth0Provider } from "@auth0/auth0-react";

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree, // ✅ use the generated tree, not __root
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }}
        useRefreshTokens={true}
        cacheLocation="memory"
      >
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      </Auth0Provider>
    ),
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
