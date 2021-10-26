import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LoginContext } from "./context";

export const CodeVerify = () => {
  const { loginId } = useContext(LoginContext);

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>{loginId}</Text>
    </View>
  );
};
