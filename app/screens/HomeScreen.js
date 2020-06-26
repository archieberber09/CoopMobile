import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import PointsIndicator from "../components/PointsIndicator";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";
import Widgets from "../components/Widgets";
import axios from "axios";
import GLOBALS from "../../globals";
import AsyncStorage from "@react-native-community/async-storage";

const notifications = [
  {
    title: "Points claimed",
    icon: {
      name: "message",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Claiming failed",
    icon: {
      name: "message",
      backgroundColor: colors.primary,
    },
  },
];

function HomeScreen() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  // useEffect(() => {
  //   try {
  //     const checkingUser = async () => {
  //       await AsyncStorage.getItem("id").then((value) => {
  //         axios
  //           .get(GLOBALS.BASE_URL + "api/auth/users/" + value)
  //           .then(function (res) {
  //             setUser(res.data.data);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //             setUser("Error");
  //           });
  //       });
  //     };
  //     checkingUser();
  //   } catch {
  //     setUser("Error");
  //   }
  // }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <PointsIndicator />
        {/* {user===null ?<ActivityIndicator /> : user==='Error' ? <Text>Something went Wrong</Text> : <PointsIndicator title={user[0].points} subTitle="Points Available" />} */}
        <Widgets />
        <TextInput style={styles.notificationContainer}>
          Notifications
        </TextInput>
        <FlatList
          style={styles.notification}
          data={notifications}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  logo: {
    width: 50,
    height: 45,
    alignSelf: "flex-start",
    marginTop: 0,
    marginBottom: 20,
  },
  notificationContainer: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
    height: 20,
  },
  notification: {
    backgroundColor: colors.light,
    width: "100%",
  },
});

export default HomeScreen;
