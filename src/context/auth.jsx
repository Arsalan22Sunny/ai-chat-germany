/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import FetchContext from "./fetch";
import API_URL from "../utils/api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    setLoading(false);
    if (accessToken) {
      setUser({ accessToken });
    } else {
      setUser(null);
    }
  }, [user]);

  /**
   * Sends a request to the API.
   *
   * @param {string} endpoint The endpoint to send the request to.
   * @param {object} [options] The options for the request. If not provided, the
   * request will be sent without any headers.
   * @returns {Promise} A promise that resolves to the response of the request.
   *
   * ⭐Do not add / before endpoint. (/)It will be added automatically.⭐
   */
  async function requests(endpoint, options = {}) {
    /**
     * The access token to add to the request headers. If the user is not logged
     * in, the request will be sent without any headers.
     */
    const accessToken = user?.accessToken;
    if (!endpoint) throw new Error("No endpoint provided.");

    const path = `${API_URL}/${endpoint}`;

    if (!options.headers) options.headers = {};

    // if not access token fetch request will be sent without token
    if (accessToken) {
      options.headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(path, options).catch((error) => {
      console.error("Error:", error);
      throw error;
    });
  }

  function assignUser(user = null) {
    if (user) {
      localStorage.setItem("accessToken", user.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        assignUser,
      }}
    >
      {/* Fetch context wraped by AuthProvider here to share user state */}
      <FetchContext.Provider
        value={{
          requests,
          testToken() {
            return user;
          },
        }}
      >
        {children}
      </FetchContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
