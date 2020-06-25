import React from "react";
import { StyleSheet, View } from "react-native";

import Card from "../components/Card";

export default function TransactionHistoryScreen() {
  return (
    <View>
      <Card title="Transaction" subTitle="Amount" />
    </View>
  );
}

const styles = StyleSheet.create({});
