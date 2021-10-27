import React, { useState } from "react";
import { Text } from "react-native";
import { AppContext } from "./context";
import { Login } from "./login";

export const App = () => {
  const [token, setToken] = useState();
  const [newUser, setNewUser] = useState();
  const [context, setContext] = useState();
  const [signedIn, setSignedIn] = useState(false);

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
      {signedIn ? <Text>The user is signed in</Text> : <Login />}
    </AppContext.Provider>
  );
};

export default App;
