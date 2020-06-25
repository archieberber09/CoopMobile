import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PointsIndicator from "../components/PointsIndicator";
import colors from "../config/colors";
import Screen from "../components/Screen";
import Widgets from "../components/Widgets";
import CategoryPickerItem from "../components/CategoryPickerItem";

function HomeScreen() {
  return (
    <Screen>
      <View style={styles.card}>
        <PointsIndicator title="10" subTitle="Points Available" />
        <Widgets />
      </View>
      
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
