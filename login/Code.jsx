import React, { useState, useEffect, createRef, useContext } from "react";
import { Keyboard, View, Text } from "react-native";
import { ButtonSet } from "../components/Button";
import { Input } from "../components/Input";
import colors from "../colors";
import { LoginContext } from "../context";
import deviceInfo from "../util/deviceInfo";

import { API } from "../config";
import axios from "axios";

export const CodeVerify = () => {
  const { setScreen, sliding, currentScreen, loginId, setLoginCode, onLogin } =
    useContext(LoginContext);
  const focused = currentScreen === "code" && !sliding;
  const input = createRef();
  const [code, setCode] = useState();
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
    if (!code) return;
    setLoginCode(code);

    axios
      .post(
        `${API}/login/code`,
        {
          id: loginId,
          code,
          device: deviceInfo,
        },
        {
          timeout: 5000,
        }
      )
      .then(({ data }) => onLogin(data))
      .catch(({ response }) => {
        const err = response?.data;
        if (err === "Missing Account") setScreen("register");
        else
          setError(
            err === "Invalid Code"
              ? "That code isn't working. Try again."
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
              fontSize: 20,
              textAlign: "center",
            }}
          >
            We sent you a login code!
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Input
            ref={input}
            value={code}
            onChange={({ nativeEvent: e }) =>
              setCode(e.text.replace(/\D/g, ""))
            }
            keyboardType="number-pad"
            maxLength={8}
            style={{
              textAlign: "center",
              letterSpacing: 8,
            }}
          />
          <Text style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>
            Check your texts - it could take a minute or so
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

      <ButtonSet
        style={{
          marginTop: 20,
          width: 200,
        }}
        positive="Continue"
        onPositive={submit}
        negative="Change Phone Number"
        onNegative={() => setScreen("phone")}
      />
    </View>
  );
};
