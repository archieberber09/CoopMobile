import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";

import Text from "./Text";
import colors from "../config/colors";

function PointsIndicator({ title, subTitle, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.primary,
    marginBottom: 20,
    paddingTop: 0,
    overflow: "hidden",
    width: "100%",
  },
  detailsContainer: {
    padding: 20,
  },

  subTitle: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 20,
  },
  title: {
    marginBottom: 5,
    color: colors.white,
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default PointsIndicator;
