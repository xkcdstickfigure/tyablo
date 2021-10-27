import React, { useState, useEffect } from "react";
import { AppContext } from "./context";
import * as SecureStore from "expo-secure-store";
import { fetchContext } from "./util/fetchContext";

import { Login } from "./login";
import { Text } from "react-native";

export const App = () => {
  const [token, setToken] = useState();
  const [newUser, setNewUser] = useState();
  const [context, setContext] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load Token
  useEffect(async () => {
    const storedToken = await SecureStore.getItemAsync("token");
    if (storedToken) {
      const ctx = await fetchContext(storedToken);
      if (ctx) {
        setToken(storedToken);
        setContext(ctx);
        setSignedIn(true);
      }
    }
    setLoading(false);
  }, []);

  // Set Token
  useEffect(() => {
    if (token !== undefined)
      SecureStore.setItemAsync("token", token).catch(() => {});
  }, [token]);

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
      }}
    >
      {!loading &&
        (signedIn ? <Text>{context.user.name} is signed in</Text> : <Login />)}
    </AppContext.Provider>
  );
};

export default App;
