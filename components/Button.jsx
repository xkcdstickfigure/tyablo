import React from "react";
import { View, Text, Pressable } from "react-native";

export const PositiveButton = ({ children, style, ...props }) => {
  return (
    <Pressable
      {...props}
      style={{
        backgroundColor: "#10b981",
        width: 200,
        height: 50,
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
      style={{
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Text
        style={{
          color: "#888888",
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export const ButtonSet = ({ positive, onPositive, negative, onNegative }) => (
  <View>
    <PositiveButton
      onPress={onPositive}
      style={{
        marginBottom: negative ? 10 : 25,
      }}
    >
      {positive}
    </PositiveButton>

    {negative && (
      <NegativeButton onPress={onNegative} style={{ height: 15 }}>
        {negative}
      </NegativeButton>
    )}
  </View>
);
