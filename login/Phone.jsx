import React from "react";
import { View, Text } from "react-native";
import { ButtonSet } from "../components/Button";

export const PhoneLogin = () => {
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 50,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          First things first
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
          }}
        >
          What's your phone number?
        </Text>
      </View>
      <ButtonSet positive="Let's Go!" onPositive={() => {}} />
    </View>
  );
};
