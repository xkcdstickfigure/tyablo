import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../context";

export const Homepage = () => {
  const { token } = useContext(AppContext);

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Text>{token}</Text>
    </View>
  );
};
