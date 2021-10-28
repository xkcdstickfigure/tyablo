import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import colors from "../colors";
import { Heart } from "react-native-feather";

export const Post = ({ data }) => {
  const [liked, setLiked] = useState(false);

  return (
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
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
        <View
          style={{
            marginRight: 5,
          }}
        >
          <Pressable
            hitSlop={10}
            onPress={() => {
              setLiked(!liked);
            }}
          >
            <Heart
              width={20}
              height={20}
              stroke={colors.red[500]}
              strokeWidth={1}
              fill={liked ? colors.red[500] : null}
            />
          </Pressable>
        </View>
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
};
