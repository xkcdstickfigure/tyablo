import React, { useState, useEffect, createRef, useContext } from "react";
import { Keyboard, View, Text } from "react-native";
import { ButtonSet } from "../components/Button";
import { PhoneInput } from "../components/PhoneInput";
import { TextLink } from "../components/TextLink";
import colors from "../colors";
import { LoginContext } from "./context";

import { API } from "../config";
import axios from "axios";

export const PhoneLogin = () => {
  const { setScreen, sliding, currentScreen, setLoginId } =
    useContext(LoginContext);
  const focused = currentScreen === "phone" && !sliding;
  const input = createRef();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();

  // Autofocus
  useEffect(() => {
    if (focused) {
      input.current.focus();
    }
  }, [focused]);

  // Submit
  const submit = () => {
    Keyboard.dismiss();
    if (!phoneNumber) return;

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
        setScreen("code");
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
      }}
    >
      <View>
        <View>
          <Text
            style={{
              fontSize: 30,
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
          <PhoneInput ref={input} onChange={(n) => setPhoneNumber(n)} />
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 12 }}>
            We'll send you a verification code over SMS.
          </Text>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            By continuing, you're agreeing to our{" "}
            <TextLink to="terms">terms of use</TextLink> and{" "}
            <TextLink to="privacy">privacy policy</TextLink>.
          </Text>

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

      <View style={{ marginTop: 20 }}>
        <ButtonSet positive="Continue" onPositive={submit} />
      </View>
    </View>
  );
};
