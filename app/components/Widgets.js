import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";
import colors from "../config/colors";
import routes from "../navigation/routes";

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "map-marker",
    label: "Locations",
    value: 1,
    targetScreen: routes.LOCATIONS,
  },
  {
    backgroundColor: "#fd9644",
    icon: "information-outline",
    label: "About Us",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "format-align-left",
    label: "Instructions",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "message-text",
    label: "Contact Us",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "blogger",
    label: "Blogs",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "settings-outline",
    label: "Settings",
    value: 6,
  },
];

function Widgets() {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.value.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.icon}>
            <Icon
              backgroundColor={item.backgroundColor}
              name={item.icon}
              size={60}
            />
            <Text style={styles.title}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 13,
  },
});

export default Widgets;
