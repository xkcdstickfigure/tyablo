import React from "react";
import { View, Text } from "react-native";
import { ButtonSet } from "../components/Button";

export const Welcome = () => {
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 100,
        paddingBottom: 50,
      }}
    >
      <View>
        <View
          style={{
            backgroundColor: "#eeeeee",
            width: 125,
            height: 125,
            borderRadius: 30,
          }}
        />
        <Text
          style={{
            fontSize: 40,
            paddingTop: 10,
            letterSpacing: 2.5,
            textAlign: "center",
          }}
        >
          tyablo
        </Text>
      </View>
      <ButtonSet positive="Let's Go!" onPositive={() => {}} />
    </View>
  );
};
