import React from "react";
import { View, Text, Pressable } from "react-native";
import colors from "../colors";

export const PositiveButton = ({ children, style, ...props }) => {
  return (
    <Pressable
      {...props}
      style={{
        backgroundColor: colors.emerald[500],
        width: "100%",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 20,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export const NegativeButton = ({ children, style, ...props }) => {
  return (
    <Pressable
      {...props}
      hitSlop={10}
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          color: colors.gray[600],
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export const ButtonSet = ({
  positive,
  onPositive,
  negative,
  onNegative,
  style,
  ...props
}) => (
  <View
    style={{
      alignItems: "center",
      ...style,
    }}
    {...props}
  >
    <PositiveButton
      onPress={onPositive}
      style={{
        marginBottom: negative ? 10 : 28,
      }}
    >
      {positive}
    </PositiveButton>

    {negative && (
      <NegativeButton onPress={onNegative} style={{ height: 18 }}>
        {negative}
      </NegativeButton>
    )}
  </View>
);
