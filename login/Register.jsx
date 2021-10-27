import React, { useState, useEffect, createRef, useContext } from "react";
import { Keyboard, View, Text } from "react-native";
import { ButtonSet } from "../components/Button";
import { Input } from "../components/Input";
import colors from "../colors";
import { LoginContext } from "../context";

import { API } from "../config";
import axios from "axios";

export const Register = () => {
  const { setScreen, sliding, currentScreen, loginId, loginCode, onLogin } =
    useContext(LoginContext);
  const focused = currentScreen === "register" && !sliding;
  const input = createRef();
  const [username, setUsername] = useState();
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
    if (!username.trim()) return;

    axios
      .post(
        `${API}/login/code`,
        {
          id: loginId,
          code: loginCode,
          name: username.trim(),
        },
        {
          timeout: 1000,
        }
      )
      .then(({ data }) => onLogin(data))
      .catch(() => setError("Something went wrong! Please try again."));
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
            Create an Account
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            What's your name?
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
            value={username}
            onChange={({ nativeEvent: e }) => setUsername(e.text)}
            maxLength={35}
            style={{
              textAlign: "center",
            }}
          />

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
          positive="Sign Up"
          onPositive={submit}
          negative="Start Again"
          onNegative={() => setScreen("phone")}
        />
      </View>
    </View>
  );
};
