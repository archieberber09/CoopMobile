import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

const options = [
  {
    title: "Cashout",
    icon: {
      name: "cash",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CASHOUT,
  },
  {
    title: "Cashout History",
    icon: {
      name: "av-timer",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CASHOUT_HISTORY,
  },
  {
    title: "Points History",
    icon: {
      name: "history",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.POINTS_HISTORY,
  },
  {
    title: "Update Profile",
    icon: {
      name: "account-details",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.UPDATE_PROFILE,
  },
];

function AccountScreen({ navigation }) {
  const [name, setName] = useState("  ");

  useEffect(() => {
    AsyncStorage.getItem("name").then((value) => {
      setName(value);
    });
  });

  return (
    <Screen style={styles.screen}>
      <View style={styles.userContainer}>
        <ListItem
          title="User"
          subTitle={name}
          // image={require("../assets/wil.jpg")}
        />
      </View>
      <View style={styles.optionsContainer}>
        <FlatList
          data={options}
          keyExtractor={(option) => option.title}
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
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#b23b3b" />}
        onPress={() => {
          navigation.push("Auth"), AsyncStorage.clear();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  optionsContainer: {
    marginBottom: 50,
  },
  userContainer: {
    marginBottom: 50,
  },
});

export default AccountScreen;
