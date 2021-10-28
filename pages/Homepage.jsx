import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import colors from "../colors";
import { AppContext } from "../context";
import { Plus } from "react-native-feather";
import { ButtonSet } from "../components/Button";
import { Input } from "../components/Input";
import { Post } from "../components/Post";

import { API } from "../config";
import axios from "axios";

export const Homepage = () => {
  const { context, token } = useContext(AppContext);
  const [postEditor, setPostEditor] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [feed, setFeed] = useState([]);
  const feedIds = feed.map((post) => post.id);

  // Load New Posts
  useEffect(() => {
    const updateFeed = () => {
      axios
        .get(`${API}/feed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          const newPosts = data.posts.filter(
            (post) => feedIds.indexOf(post.id) === -1
          );
          setFeed(newPosts.concat(feed));
        })
        .catch(() => {});
    };

    updateFeed();
    const i = setInterval(updateFeed, 10000);
    return () => clearInterval(i);
  }, [feedIds.length]);

  // Load Old Posts
  const loadOlderPosts = () => {
    if (!feed.length) return;
    const before = new Date(feed[feed.length - 1].createdAt).getTime();
    axios
      .get(`${API}/feed?before=${before}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => setFeed(feed.concat(data.posts)))
      .catch(() => {});
  };

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
          padding: 10,
          paddingTop: 35,
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
              marginLeft: 12,
            }}
          >
            <IconButton icon={Plus} onPress={() => setPostEditor(true)} />
          </View>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
        data={feed}
        keyExtractor={(post) => post.id}
        renderItem={({ item: post }) => (
          <View
            key={post.id}
            style={{
              marginBottom: 10,
            }}
          >
            <Post data={post} />
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={loadOlderPosts}
      />

      {postEditor && <PostEditor close={() => setPostEditor(false)} />}
    </View>
  );
};

const IconButton = ({ icon: Icon, ...props }) => (
  <Pressable
    style={{
      padding: 5,
    }}
    {...props}
  >
    <Icon
      style={{
        width: 20,
        height: 20,
        color: colors.gray[600],
      }}
    />
  </Pressable>
);

const PostEditor = ({ close }) => {
  const { token } = useContext(AppContext);
  const [content, setContent] = useState();

  let loading = false;
  const submit = () => {
    if (loading || !content) return;
    loading = true;

    axios
      .post(
        `${API}/post`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(close)
      .catch(() => {
        loading = false;
      });
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "#ffffff",
        width: "100%",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.gray[200],
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}
    >
      <Input
        autoFocus
        multiline
        style={{
          width: "100%",
          height: 80,
          marginBottom: 20,
        }}
        onChangeText={(value) => setContent(value.trim())}
      />

      <ButtonSet
        positive="Post"
        onPositive={submit}
        negative="Cancel"
        onNegative={close}
      />
    </View>
  );
};
