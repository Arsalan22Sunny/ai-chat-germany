import { createContext } from "react";

const initial = {
  requests: null,
};

const FetchContext = createContext(null);

// The FetchProvider is wrapped inside the AuthProvider

export default FetchContext;
