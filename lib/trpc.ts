import { createTRPCReact } from "@trpc/react-query";
import { httpLink, type TRPCLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import { observable } from "@trpc/server/observable";

export const trpc = createTRPCReact<AppRouter>();

const baseUrl = process.env.EXPO_PUBLIC_RORK_API_BASE_URL;

// Fallback TRPC link for mock mode: if any TRPC call is made, make it explicit.
const mockLink: TRPCLink<AppRouter> = () => () => {
  return observable((observer) => {
    observer.error(
      new Error(
        "Mock mode: API client disabled. Set EXPO_PUBLIC_RORK_API_BASE_URL to enable network calls."
      )
    );
  });
};

export const trpcClient = trpc.createClient({
  links: baseUrl
    ? [
        httpLink({
          url: `${baseUrl}/api/trpc`,
          transformer: superjson,
        }),
      ]
    : [mockLink],
});