import React from "react";
import { Linking, Text } from "react-native";
import colors from "../colors";
import { SERVER } from "../config";

export const TextLink = ({ href, to, ...props }) => {
  return (
    <Text
      onPress={() => Linking.openURL(to ? `${SERVER}/go/${to}` : href)}
      style={{
        color: colors.emerald[500],
      }}
      {...props}
    />
  );
};
