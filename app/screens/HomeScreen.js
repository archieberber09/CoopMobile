import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import PointsIndicator from "../components/PointsIndicator";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";
import Widgets from "../components/Widgets";

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
  return (
    <Screen>
      <View style={styles.container}>
        <PointsIndicator title="10" subTitle="Points Available" />
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
  notificationContainer: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
  },
  notification: {
    backgroundColor: colors.light,
    width: "100%",
  },
});

export default HomeScreen;
