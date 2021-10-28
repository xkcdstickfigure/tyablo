import React from "react";
import { View, Text, Image } from "react-native";
import colors from "../colors";

export const Post = ({ data }) => (
  <View
    style={{
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: colors.gray[200],
      borderRadius: 10,
      padding: 10,
      paddingBottom: 15,
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
        source={{ uri: data.author.avatar }}
        style={{
          width: 35,
          height: 35,
          borderWidth: 1,
          borderColor: colors.gray[200],
          borderRadius: 10,
          marginRight: 10,
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          flexShrink: 1,
        }}
      >
        {data.author.name}
      </Text>
    </View>
    <Text
      style={{
        marginTop: 10,
      }}
    >
      {data.content}
    </Text>
  </View>
);
