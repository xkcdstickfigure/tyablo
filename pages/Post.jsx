import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import colors from "../colors";
import { AppContext } from "../context";
import { Heart, ArrowLeft } from "react-native-feather";
import { ButtonSet } from "../components/Button";
import { Input } from "../components/Input";
import { Post } from "../components/Post";

import { API } from "../config";
import axios from "axios";

export const PostPage = () => {
  const { token, context, pageParam, setPage } = useContext(AppContext);
  const [post, setPost] = useState();
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const likeCount =
    post && displayCount(post.likes.count, post.likes.self, liked);

  // Load Post
  useEffect(() => {
    axios
      .get(`${API}/post/${pageParam}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setPost(data);
        setLiked(data.likes.self);
        setFollowing(data.author.following);
      })
      .catch(() => {});
  }, []);

  // Like
  const like = (create) =>
    axios(`${API}/post/${post.id}/like`, {
      method: create ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => {});

  // Follow
  const follow = (create) =>
    axios(
      `${API}/${post.author.page ? "page" : "user"}/${post.author.id}/follow`,
      {
        method: create ? "POST" : "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch(() => {});

  return post ? (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingTop: 35,
        }}
      >
        <Pressable hitSlop={10} onPress={() => setPage("home")}>
          <ArrowLeft
            width={25}
            height={25}
            stroke={colors.gray[600]}
            strokeWidth={2}
            style={{
              marginRight: 10,
            }}
          />
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
            flexShrink: 1,
          }}
        >
          <Image
            source={{ uri: post.author.avatar }}
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
            {post.author.name}
          </Text>
          {(post.author.id !== context.user.id || post.author.page) && (
            <Pressable
              hitSlop={10}
              onPress={() => {
                setFollowing(!following);
                follow(!following);
              }}
              style={{
                backgroundColor: following
                  ? colors.gray[300]
                  : colors.emerald[500],
                width: 70,
                height: 22,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: following ? "#000000" : "#ffffff",
                  fontSize: 12,
                }}
              >
                {following ? "Following" : "Follow"}
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
    </View>
  ) : null;
};

const displayCount = (serverCount, serverLiked, clientLiked) =>
  serverCount + (serverLiked ? (clientLiked ? 0 : -1) : clientLiked ? 1 : 0);
