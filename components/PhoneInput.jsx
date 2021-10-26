import React, { forwardRef, useState } from "react";
import { View, Text, TextInput } from "react-native";

export const PhoneInput = forwardRef(({ onChange, ...props }, ref) => {
  const [value, setValue] = useState();

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
          value={value}
          onChange={({ nativeEvent: e }) => {
            const v = e.text.replace(/\D/g, "");
            setValue(v);
            if (onChange) onChange("44" + v);
          }}
          placeholder="7725872946"
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
