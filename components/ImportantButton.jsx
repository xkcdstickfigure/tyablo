import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export const ImportantButton = ({ children, ...props }) => {
  return (
    <Pressable {...props} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 20
  }
});
