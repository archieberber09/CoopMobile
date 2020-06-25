import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";
import CategoryPickerItem from "./CategoryPickerItem";

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
];

function Widgets({ item, numColumns = 3 }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.value.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Icon
              backgroundColor={item.backgroundColor}
              name={item.icon}
              size={80}
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
    // width: "33%",
  },
  title: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default Widgets;
