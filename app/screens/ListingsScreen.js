import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet,Button,BackHandler,Alert } from "react-native";


import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-community/async-storage";
import GLOBALS from '../../globals'; 
import axios from "axios";



const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

const ListingsScreen = ({ navigation }) => {

  const [announcements,setAnnouncements] = useState([])

  useEffect(() => {
    axios.get(GLOBALS.BASE_URL + 'api/auth/announcements')
    .then(function(res){
      // console.log(res.data.data);
      setAnnouncements(res.data.data)
    });
    return (res) => {
      console.log(res);
    }
  }, [])

  console.log(announcements)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    
    }, []));


  return (
    <Screen style={styles.screen}>
      <FlatList
        data={announcements}
        keyExtractor={(announcement) => announcement.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.body}
            // image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
