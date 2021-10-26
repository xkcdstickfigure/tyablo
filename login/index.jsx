import React, { useState } from "react";
import { StyleSheet, View, Text, Linking, Dimensions } from "react-native";
import { PositiveButton, NegativeButton } from "../components/Button";

const { width } = Dimensions.get("screen");
console.log(width);

export const Login = () => {
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
      setOffset(o);
      ov += 0.5;
      o += ov;
      if (o > 100) {
        setOffset(0);
        setSliding(false);
        clearInterval(i);
      }
    }, 10);
  };

  const screens = {
    welcome: <Screen title="one" action={() => setScreen("login")} />,
    login: <Screen title="two" action={() => setScreen("welcome")} />,
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        width: width * 2,
        marginLeft: `-${offset}%`,
      }}
    >
      {Object.keys(screens).map((id) =>
        id === currentScreen || id === oldScreen ? (
          <View
            key={id}
            style={{
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
            {screens[id]}
          </View>
        ) : null
      )}
    </View>
  );
};

export const Screen = ({ title, action }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <PositiveButton onPress={action}>Get Started</PositiveButton>
        <NegativeButton
          onPress={() => Linking.openURL("https://ty.altrazio.com/go/privacy")}
        >
          See Privacy Policy
        </NegativeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 50,
  },
  logo: {
    backgroundColor: "#eeeeee",
    width: 125,
    height: 125,
    borderRadius: 30,
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    letterSpacing: 2.5,
  },
});
