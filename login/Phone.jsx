import React, { useState, useEffect, createRef } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View,
  Text,
} from "react-native";
import { ButtonSet } from "../components/Button";
import { PhoneInput } from "../components/PhoneInput";
import { TextLink } from "../components/TextLink";
import colors from "../colors";

import { API } from "../config";
import axios from "axios";

export const PhoneLogin = ({ focused, setLoginId }) => {
  const phoneInput = createRef();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();

  // Autofocus
  useEffect(() => {
    if (focused) {
      phoneInput.current.focus();
    }
  }, [focused]);

  // Submit
  const submit = () => {
    Keyboard.dismiss();
    if (!phoneNumber) return;
    console.log(phoneNumber);

    axios
      .post(
        `${API}/login/phone`,
        {
          number: phoneNumber,
        },
        {
          timeout: 1000,
        }
      )
      .then(({ data }) => {
        setLoginId(data.id);
      })
      .catch(({ response }) => {
        const err = response?.data;
        setError(
          err === "Invalid Phone Number"
            ? "You can't use this phone number. Check that you typed it in right, or use a different one."
            : "Something went wrong! Please try again."
        );
      });
  };

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
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <PhoneInput ref={phoneInput} onChange={(n) => setPhoneNumber(n)} />
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Text style={{ textAlign: "center" }}>
              We'll send you a verification code over SMS.
            </Text>
            <Text style={{ textAlign: "center" }}>
              By continuing, you're agreeing to our{" "}
              <TextLink to="terms">terms of use</TextLink> and{" "}
              <TextLink to="privacy">privacy policy</TextLink>.
            </Text>
          </View>

          {error && (
            <Text
              style={{
                color: colors.red[500],
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {error}
            </Text>
          )}
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ marginTop: 20 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ButtonSet positive="Continue" onPositive={submit} />
      </KeyboardAvoidingView>
    </View>
  );
};
