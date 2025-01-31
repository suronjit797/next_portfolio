"use client";

import { ApolloProvider as Provider } from "@apollo/client";
import client from "./apolloClient";

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>;
}
