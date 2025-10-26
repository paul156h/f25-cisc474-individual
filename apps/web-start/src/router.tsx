import { createRouter } from "@tanstack/react-router";
import * as TanstackQuery from "./integrations/root-provider";
import { routeTree } from "./routeTree.gen";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { Auth0Provider } from "@auth0/auth0-react";

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const redirectUri =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3001"; // fallback for SSR

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",

    Wrap: (props: { children: React.ReactNode }) => (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
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
