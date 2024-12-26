import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";

function App() {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_REACT_APP_GRAPHQL_URI,
    headers: {
      authorization: `Bearer ${import.meta.env.VITE_BEAREER_TOKEN}`,
    },
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task" element={<Dashboard />} />
          <Route path="/task/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
