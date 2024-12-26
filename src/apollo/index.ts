import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_URI,
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_BEAREER_TOKEN}`,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});