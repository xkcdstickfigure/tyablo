import React, { useContext, useState } from "react";
import { View, Dimensions } from "react-native";
import { Welcome } from "./Welcome";
import { PhoneLogin } from "./Phone";
import { CodeVerify } from "./Code";
import { Register } from "./Register";
import { LocationPrompt } from "./Location";
import { DiscoverablePrompt } from "./Discoverable";
import { AppContext, LoginContext } from "../context";
import * as Location from "expo-location";
import { fetchContext } from "../util/fetchContext";

const { width } = Dimensions.get("window");

const screens = {
  welcome: Welcome,
  phone: PhoneLogin,
  code: CodeVerify,
  register: Register,
  location: LocationPrompt,
  discoverable: DiscoverablePrompt,
};

export const Login = () => {
  const { setToken, setNewUser, setContext, setSignedIn } =
    useContext(AppContext);

  const [oldScreen, setOldScreen] = useState();
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [sliding, setSliding] = useState(false);
  const [offset, setOffset] = useState(0);

  const setScreen = (name) => {
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
  const [loginCode, setLoginCode] = useState();

  const onLogin = async (data) => {
    setToken(data.token);
    setNewUser(data.new);

    // Request User Context
    const context = await fetchContext(data.token);
    if (context) {
      setContext(context);

      // Location Prompt
      const locationPermission = await Location.getForegroundPermissionsAsync();
      if (
        locationPermission.status === "undetermined" ||
        (locationPermission.status === "denied" &&
          locationPermission.canAskAgain)
      )
        setScreen("location");
      else if (!context.user.discoverable) setScreen("discoverable");
      else setSignedIn(true);
    } else setScreen("welcome");
  };

  return (
    <LoginContext.Provider
      value={{
        setScreen,
        sliding,
        currentScreen,
        setLoginId,
        loginId,
        setLoginCode,
        loginCode,
        onLogin,
      }}
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
    </LoginContext.Provider>
  );
};
