import React, { useContext } from "react";
import { View, Text, Linking } from "react-native";
import { ButtonSet } from "../components/Button";
import { LoginContext } from "../context";
import { MapPin } from "react-native-feather";
import { SERVER } from "../config";
import * as Location from "expo-location";

export const LocationPrompt = () => {
  const { setScreen } = useContext(LoginContext);

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <MapPin
          width={100}
          height={100}
          style={{
            color: "black",
          }}
        />
        <Text
          style={{
            fontSize: 40,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Nearly done!
        </Text>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          We need to know where you are to show you what's nearby. Your location
          is never displayed publicly on your profile.
        </Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Press "Allow" when your phone asks.
        </Text>
      </View>
      <ButtonSet
        positive="Enable Location"
        onPositive={async () => {
          await Location.requestForegroundPermissionsAsync();
          setScreen("welcome");
        }}
        negative="See Privacy Policy"
        onNegative={() => Linking.openURL(`${SERVER}/go/privacy`)}
      />
    </View>
  );
};
