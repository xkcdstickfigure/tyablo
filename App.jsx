import React, { useState, useEffect } from "react";
import { AppContext } from "./context";
import * as SecureStore from "expo-secure-store";
import { fetchContext } from "./util/fetchContext";

import { Login } from "./login";
import { Text } from "react-native";

const pages = {
  home: () => <Text>this is the homepage</Text>,
};

export const App = () => {
  const [token, setToken] = useState();
  const [newUser, setNewUser] = useState();
  const [context, setContext] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");
  const [pageParam, setPageParam] = useState();

  // Page Navigation
  const setPage2 = (id, param) => {
    setPage(id);
    setPageParam(param);
  };

  // Load Token
  useEffect(async () => {
    const storedToken = await SecureStore.getItemAsync("token");
    if (storedToken) {
      setToken(storedToken);
      setSignedIn(true);
    }
    setLoading(false);
  }, []);

  // Set Token
  useEffect(() => {
    SecureStore.setItemAsync("token", token).catch(() => {});
  }, [token]);

  // Update Context
  useEffect(async () => {
    if (token && signedIn) {
      const ctx = await fetchContext(token);
      if (ctx) setContext(ctx);
      else setSignedIn(false);
    }
  }, [token, page, signedIn]);

  const Page = pages[page];

  return (
    <AppContext.Provider
      value={{
        setToken,
        token,
        setNewUser,
        newUser,
        setContext,
        context,
        setSignedIn,
        signedIn,
        setPage: setPage2,
        page,
        pageParam,
      }}
    >
      {!loading && (signedIn ? context && <Page /> : <Login />)}
    </AppContext.Provider>
  );
};

export default App;
