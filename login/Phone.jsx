import React, { useEffect, createRef } from "react";
import { KeyboardAvoidingView, Platform, View, Text } from "react-native";
import { ButtonSet } from "../components/Button";
import { PhoneInput } from "../components/PhoneInput";
import { TextLink } from "../components/TextLink";

export const PhoneLogin = ({ focused }) => {
  const phoneInput = createRef();

  useEffect(() => {
    if (focused) {
      phoneInput.current.focus();
    }
  }, [focused]);

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

        <View
          style={{
            marginTop: 50,
            alignItems: "center",
          }}
        >
          <PhoneInput ref={phoneInput} />
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Text style={{ textAlign: "center" }}>
              We'll send you a verification code over SMS.
            </Text>
            <Text style={{ textAlign: "center" }}>
              You're agreeing to our{" "}
              <TextLink to="terms">terms of use</TextLink> and{" "}
              <TextLink to="privacy">privacy policy</TextLink>.
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ marginTop: 20 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ButtonSet positive="Continue" onPositive={() => {}} />
      </KeyboardAvoidingView>
    </View>
  );
};
