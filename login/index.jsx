import React, { useState } from "react";
import { View, Dimensions, KeyboardAvoidingView } from "react-native";
import { Welcome } from "./Welcome";
import { PhoneLogin } from "./Phone";
import { CodeVerify } from "./Code";
import { LoginContext } from "./context";

const { width } = Dimensions.get("window");

const screens = {
  welcome: Welcome,
  phone: PhoneLogin,
  code: CodeVerify,
};

export const Login = () => {
  const [oldScreen, setOldScreen] = useState();
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [sliding, setSliding] = useState(false);
  const [offset, setOffset] = useState(0);

  const setScreen = (name) => {
    console.log(name);
    setOldScreen(currentScreen);
    setCurrentScreen(name);
    setSliding(true);

    let o = 0;
    let ov = 0;

    const i = setInterval(() => {
      ov += 1;
      o += ov;
      if (o >= 100) {
        setOffset(0);
        setSliding(false);
        setOldScreen(null);
        clearInterval(i);
      } else setOffset(o);
    }, 20);
  };

  const [loginId, setLoginId] = useState();

  return (
    <LoginContext.Provider
      value={{
        setScreen,
        sliding,
        currentScreen,
        setLoginId,
        loginId,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            height: "100%",
            flexDirection: "row",
            width: width * 2,
            marginLeft: `-${offset}%`,
          }}
        >
          {Object.keys(screens).map((id) => {
            const Screen = screens[id];
            return id === currentScreen || id === oldScreen ? (
              <View
                key={id}
                style={{
                  width,
                  height: "100%",
                  paddingHorizontal: 10,
                  paddingTop: 50,
                  paddingBottom: 20,
                  position: "absolute",
                  top: 0,
                  left:
                    id === currentScreen
                      ? sliding
                        ? width
                        : 0
                      : sliding
                      ? 0
                      : width,
                }}
              >
                <Screen />
              </View>
            ) : null;
          })}
        </View>
      </KeyboardAvoidingView>
    </LoginContext.Provider>
  );
};
