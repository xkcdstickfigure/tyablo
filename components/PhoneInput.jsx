import React, { forwardRef } from "react";
import { View, Text, TextInput } from "react-native";

export const PhoneInput = forwardRef(({ ...props }, ref) => {
  return (
    <View
      style={{
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: "#9ca3af",
        borderRadius: 10,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <View
          style={{
            borderRightWidth: 1,
            borderColor: "#9ca3af",
            paddingHorizontal: 5,
            width: 70,
            height: 25,
            justifyContent: "center",
          }}
        >
          <Text>🇬🇧 +44</Text>
        </View>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1 }}>
        <TextInput
          ref={ref}
          dataDetectorTypes="phoneNumber"
          autoComplete="tel"
          keyboardType="number-pad"
          maxLength={16}
          style={{
            width: "100%",
            flexGrow: 1,
            paddingHorizontal: 10,
            fontSize: 20,
          }}
          {...props}
        />
      </View>
    </View>
  );
});
