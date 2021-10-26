import React, { useState } from "react";
import { StyleSheet, View, Text, Linking, Dimensions } from "react-native";
import { PositiveButton, NegativeButton } from "../components/Button";

const { width } = Dimensions.get("screen");

export const Login = () => {
  const [oldScreen, setOldScreen] = useState();
  const [currentScreen, setCurrentScreen] = useState("one");
  const [sliding, setSliding] = useState(false);
  const [offset, setOffset] = useState(0);

  const setScreen = (name) => {
    setOldScreen(currentScreen);
    setCurrentScreen(name);
    setSliding(true);

    let o = 0;
    let ov = 0;

    const i = setInterval(() => {
      ov += 0.5;
      o += ov;
      if (o >= 100) {
        setOffset(0);
        setSliding(false);
        clearInterval(i);
      } else setOffset(o);
    }, 10);
  };

  const screens = {
    one: <Screen title="ein" action={() => setScreen("two")} />,
    two: <Screen title="zwei" action={() => setScreen("three")} />,
    three: <Screen title="drei" action={() => setScreen("one")} />,
  };

  return (
    <View
      style={{
        height: "100%",
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
              height: "100%",
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
    height: "100%",
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
    textAlign: "center",
  },
});
