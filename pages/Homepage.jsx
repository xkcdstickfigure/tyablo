import React, { useContext, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import colors from "../colors";
import { AppContext } from "../context";
import { Plus } from "react-native-feather";
import { ButtonSet } from "../components/Button";
import { Input } from "../components/Input";

import { API } from "../config";
import axios from "axios";

export const Homepage = () => {
  const { context } = useContext(AppContext);
  const [postEditor, setPostEditor] = useState(false);

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
              marginLeft: 12,
            }}
          >
            <IconButton icon={Plus} onPress={() => setPostEditor(true)} />
          </View>
        </View>
      </View>

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
