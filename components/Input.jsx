import React, { forwardRef } from "react";
import { TextInput } from "react-native";
import colors from "../colors";

export const Input = forwardRef(({ style, ...props }, ref) => (
  <TextInput
    ref={ref}
    style={{
      height: 40,
      width: 250,
      borderWidth: 1,
      borderColor: colors.gray[200],
      borderRadius: 10,
      flexDirection: "row",
      paddingHorizontal: 10,
      ...style,
    }}
    {...props}
  />
));
