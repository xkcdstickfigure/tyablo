import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export const PositiveButton = ({ children, ...props }) => {
  return (
    <Pressable {...props} style={PositiveButtonStyles.button}>
      <Text style={PositiveButtonStyles.text}>{children}</Text>
    </Pressable>
  );
};

const PositiveButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: "#10b981",
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
  },
});

export const NegativeButton = ({ children, ...props }) => {
  return (
    <Pressable {...props} style={NegativeButtonStyles.button}>
      <Text style={NegativeButtonStyles.text}>{children}</Text>
    </Pressable>
  );
};

const NegativeButtonStyles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "600",
    paddingTop: 10,
  },
});
