import React from "react";
import { Linking, Text } from "react-native";
import colors from "../colors";

export const TextLink = ({ href, to, ...props }) => {
  return (
    <Text
      onPress={() =>
        Linking.openURL(to ? `https://ty.altrazio.com/go/${to}` : href)
      }
      style={{
        color: colors.emerald[500],
      }}
      {...props}
    />
  );
};
