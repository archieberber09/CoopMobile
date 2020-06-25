import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

const menuItems = [
  {
    title: "Cashout",
    icon: {
      name: "cash",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CASHOUT,
  },
  {
    title: "Transaction History",
    icon: {
      name: "history",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.TRANSACTION_HISTORY,
  },
  {
    title: "Update Profile",
    icon: {
      name: "account-details",
      backgroundColor: colors.medium,
    },
    targetScreen: routes.UPDATE_PROFILE,
  },
];

function AccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="User"
          subTitle="user@email.com"
          // image={require("../assets/wil.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
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
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
