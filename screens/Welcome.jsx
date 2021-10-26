import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ImportantButton } from "../components/ImportantButton";

export const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logo} />
        <Text style={styles.title}>tyablo</Text>
      </View>
      <ImportantButton onPress={() => alert("test")}>Get Started</ImportantButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 50
  },
  logo: {
    backgroundColor: "#eeeeee",
    width: 125,
    height: 125,
    borderRadius: 30
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    letterSpacing: 2.5
  },
});
