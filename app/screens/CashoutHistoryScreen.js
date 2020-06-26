import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import Card from "../components/Card";
import GLOBALS from "../../globals";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import Screen from "../components/Screen";

function CashoutHistoryScreen() {
  // const [loading, setLoading] = useState(true);
  // const [transactions, setTransactions] = useState([]);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(GLOBALS.BASE_URL + "api/auth/get-user-transaction")
  //     .then((res) => {
  //       setTransactions(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading === true) {
  //   return (
  //     <Screen style={styles.loader}>
  //       <ActivityIndicator />
  //     </Screen>
  //   );
  // }

  // if (error === true) {
  //   return (
  //     <Screen style={styles.loader}>
  //       <Text>
  //         Something went wrong please check your connections and reload the app
  //       </Text>
  //     </Screen>
  //   );
  // }

  return (
    <View>
      {/* <FlatList
        data={transactions}
        renderItem={({ item }) => ( */}
      <Card
        // title={"Points: " + item.points}
        // subTitle={"Weight: " + item.weight + "pounds"}
        title="Balance Remaining"
        subTitle="Balance Total"
      />
      {/* )} */}
      {/* keyExtractor={(item) => item.id.toString()}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
});

export default CashoutHistoryScreen;
