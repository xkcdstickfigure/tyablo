import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ButtonSet } from "../components/Button";
import { Search } from "react-native-feather";
import { AppContext } from "../context";
import { API } from "../config";
import axios from "axios";

export const DiscoverablePrompt = () => {
  const { setSignedIn, token } = useContext(AppContext);

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Search
          width={100}
          height={100}
          style={{
            color: "black",
          }}
        />
        <Text
          style={{
            fontSize: 40,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Enable Discovery?
        </Text>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          This allows friends who have your phone number to follow you, and
          people nearby can see your posts.
        </Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          If you really don't want people you know irl to find your profile, you
          may want to leave this off.
        </Text>
      </View>
      <ButtonSet
        positive="Sure!"
        onPositive={async () => {
          axios
            .post(
              `${API}/account`,
              {
                discoverable: true,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .finally(() => {
              setSignedIn(true);
            });
        }}
        negative="No Thanks"
        onNegative={() => setSignedIn(true)}
      />
    </View>
  );
};
