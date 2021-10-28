import React, { useContext, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import colors from "../colors";
import { AppContext } from "../context";
import { Heart } from "react-native-feather";

import { API } from "../config";
import axios from "axios";

export const Post = ({ data, followed, onFollow }) => {
  const { token, context } = useContext(AppContext);
  const [liked, setLiked] = useState(data.likes.self);
  const likeCount = displayCount(data.likes.count, data.likes.self, liked);

  const like = (create) =>
    axios(`${API}/post/${data.id}/like`, {
      method: create ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => {});

  const follow = () => {
    if (onFollow) onFollow();
    axios
      .post(
        `${API}/user/${data.author.id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(() => {});
  };

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
          {data.author.id !== context.user.id &&
            !data.author.page &&
            !followed && (
              <Pressable
                onPress={follow}
                style={{
                  backgroundColor: colors.emerald[500],
                  width: 50,
                  height: 20,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                  }}
                >
                  Follow
                </Text>
              </Pressable>
            )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              marginRight: 5,
              width: 25,
            }}
          >
            {!!likeCount && (
              <Text
                style={{
                  textAlign: "right",
                }}
              >
                {likeCount}
              </Text>
            )}
          </View>
          <Pressable
            hitSlop={10}
            onPress={() => {
              setLiked(!liked);
              like(!liked);
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

const displayCount = (serverCount, serverLiked, clientLiked) =>
  serverCount + (serverLiked ? (clientLiked ? 0 : -1) : clientLiked ? 1 : 0);
