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
    title: "Alabang",
    icon: {
      name: "crosshairs-gps",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Baseco",
    icon: {
      name: "crosshairs-gps",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Cavite",
    icon: {
      name: "crosshairs-gps",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Muntinlupa",
    icon: {
      name: "crosshairs-gps",
      backgroundColor: colors.primary,
    },
  },
];

function AccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
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
});

export default AccountScreen;
