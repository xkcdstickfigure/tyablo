import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import colors from "../colors";
import { AppContext } from "../context";
import { Plus } from "react-native-feather";

export const Homepage = () => {
  const { context } = useContext(AppContext);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.gray[100],
      }}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          paddingTop: 35,
          paddingHorizontal: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderColor: colors.gray[200],
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              flexShrink: 1,
            }}
          >
            <Image
              source={{ uri: context.user.avatar }}
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: colors.gray[200],
                borderRadius: 15,
                marginRight: 10,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                flexShrink: 1,
              }}
            >
              {context.user.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 12,
            }}
          >
            <Plus
              style={{
                width: 20,
                height: 20,
                color: colors.gray[600],
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
