import React from "react";
import { Text, Pressable } from "react-native";

export const PositiveButton = ({ children, ...props }) => {
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

export const NegativeButton = ({ children, ...props }) => {
  return (
    <Pressable
      {...props}
      style={{
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#888888",
          fontSize: 12,
          fontWeight: "600",
          paddingTop: 10,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
};
