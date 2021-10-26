import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { Welcome } from "./Welcome";
import { PhoneLogin } from "./Phone";
import { CodeVerify } from "./Code";

const { width } = Dimensions.get("screen");

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

  const screens = {
    welcome: Welcome,
    phone: (props) => <PhoneLogin {...props} setLoginId={setLoginId} />,
    code: (props) => <CodeVerify {...props} loginId={loginId} />,
  };

  return (
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
            <Screen
              setScreen={setScreen}
              focused={id === currentScreen && !sliding}
            />
          </View>
        ) : null;
      })}
    </View>
  );
};
