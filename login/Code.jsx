import React, { useState, useEffect, createRef, useContext } from "react";
import { Keyboard, View, Text } from "react-native";
import { ButtonSet } from "../components/Button";
import { Input } from "../components/Input";
import colors from "../colors";
import { LoginContext } from "./context";

import { API } from "../config";
import axios from "axios";

export const CodeVerify = () => {
  const { setScreen, sliding, currentScreen, loginId, setLoginCode } =
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
        },
        {
          timeout: 1000,
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
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
            onChange={({ nativeEvent: e }) => {
              let v = e.text.replace(/\D/g, "");
              setCode(v);
            }}
            keyboardType="number-pad"
            maxLength={8}
            style={{
              textAlign: "center",
              letterSpacing: 8,
            }}
          />
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              Check your texts - it could take a minute or so
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

      <View style={{ marginTop: 20 }}>
        <ButtonSet
          positive="Continue"
          onPositive={submit}
          negative="Change Phone Number"
          onNegative={() => setScreen("phone")}
        />
      </View>
    </View>
  );
};
