import React, { useState } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { PositiveButton, NegativeButton } from "../components/Button";

export const Login = () => {
    const [offset, setOffset] = useState(0);
    const slide = () => {
        let o = 0;
        let ov = 0;
        const i = setInterval(() => {
            setOffset(o);
            ov += 0.5;
            o += ov;
            console.log(o);
            if (o > 100) {
                setOffset(100);
                clearInterval(i);
            }
        }, 10);
    };
    

  return (
    <View style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        width: "200%",
        marginLeft: `-${offset}%`
    }}>
        <Screen action={() => slide()} />
        <Screen action={() => slide()} />
    </View>
  );
};

export const Screen = ({ action }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logo} />
        <Text style={styles.title}>tyablo</Text>
      </View>
      <View>
        <PositiveButton onPress={action}>Get Started</PositiveButton>
        <NegativeButton onPress={() => Linking.openURL("https://ty.altrazio.com/go/privacy")}>See Privacy Policy</NegativeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      width: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 50
  },
  logo: {
    backgroundColor: "#eeeeee",
    width: 125,
    height: 125,
    borderRadius: 30
  },
  title: {
    fontSize: 40,
    paddingTop: 10,
    letterSpacing: 2.5
  },
});
